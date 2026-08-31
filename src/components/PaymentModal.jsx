import { useEffect, useId, useRef, useState } from 'react';
import Button from './Button';
import { formatCurrency } from '../utils/formatters';
import {
  FaCreditCard,
  FaInfoCircle,
} from 'react-icons/fa';
import { IoClose } from "react-icons/io5";

function BrandMark({ label, children }) {
  return (
    <span
      className="inline-flex h-8 min-w-12 items-center justify-center rounded border border-border bg-white px-1.5"
      title={label}
    >
      {children}
    </span>
  );
}

function formatCardNumber(value) {
  return value
    .replace(/\D/g, '')
    .slice(0, 16)
    .replace(/(.{4})/g, '$1 ')
    .trim();
}

function formatExpiry(value) {
  const digits = value.replace(/\D/g, '').slice(0, 4);
  if (digits.length <= 2) return digits;
  return `${digits.slice(0, 2)}/${digits.slice(2)}`;
}

function isValidExpiry(value) {
  const match = value.match(/^(\d{2})\/(\d{2})$/);
  if (!match) return false;
  const month = Number(match[1]);
  const year = Number(match[2]);
  if (month < 1 || month > 12) return false;
  const now = new Date();
  const currentYear = now.getFullYear() % 100;
  const currentMonth = now.getMonth() + 1;
  if (year < currentYear) return false;
  if (year === currentYear && month < currentMonth) return false;
  return true;
}

export default function PaymentModal({
  invoice,
  onClose,
  onRecordPayment,
  onSubmit,
  isLoading = false,
  loading = false,
}) {
  const submitting = isLoading || loading;
  const recordPayment = onRecordPayment || onSubmit;
  const titleId = useId();
  const nameId = useId();
  const numberId = useId();
  const numberErrorId = useId();
  const expiryId = useId();
  const cvvId = useId();
  const cvvHintId = useId();
  const dialogRef = useRef(null);
  const nameRef = useRef(null);

  const [cardholderName, setCardholderName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [saveCard, setSaveCard] = useState(true);
  const [focused, setFocused] = useState('');
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  useEffect(() => {
    nameRef.current?.focus();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKeyDown = (event) => {
      if (event.key === 'Escape' && !submitting) onClose?.();
      if (event.key !== 'Tab' || !dialogRef.current) return;

      const focusable = dialogRef.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
      );
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [onClose, submitting]);

  const validate = (nextTouched = touched) => {
    const nextErrors = {};
    const digits = cardNumber.replace(/\s/g, '');

    if (nextTouched.cardholderName && !cardholderName.trim()) {
      nextErrors.cardholderName = 'Cardholder name is required';
    }
    if (nextTouched.cardNumber && (digits.length < 16 || digits.length > 19)) {
      nextErrors.cardNumber = 'Card number is invalid';
    }
    if (nextTouched.expiry && !isValidExpiry(expiry)) {
      nextErrors.expiry = 'Enter a valid expiry date';
    }
    if (nextTouched.cvv && (cvv.length < 3 || cvv.length > 4)) {
      nextErrors.cvv = 'CVV is invalid';
    }

    setErrors(nextErrors);
    return nextErrors;
  };

  const handleBlur = (field) => {
    const nextTouched = { ...touched, [field]: true };
    setTouched(nextTouched);
    validate(nextTouched);
    setFocused('');
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (submitting) return;
    const allTouched = {
      cardholderName: true,
      cardNumber: true,
      expiry: true,
      cvv: true,
    };
    setTouched(allTouched);
    const nextErrors = validate(allTouched);
    if (Object.keys(nextErrors).length) return;
    recordPayment?.({
      method: "card",
      amount: invoice?.totalDue ?? (Number(invoice?.total) || 0) / 100,
      cardholderName: cardholderName.trim(),
      saveCard,
    });
  };

  const fieldClass = (field) => {
    if (errors[field]) {
      return 'border-danger bg-[#FEF2F2] text-navy';
    }
    if (focused === field) {
      return 'border-primary ring-1 ring-primary';
    }
    return 'border-border bg-white';
  };

  const labelClass = (field) => {
    if (errors[field]) return 'text-danger';
    if (focused === field) return 'text-primary';
    return 'text-gray-700';
  };

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-navy/50"
        onClick={() => {
          if (!submitting) onClose?.();
        }}
        aria-hidden="true"
      />
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="relative w-full max-w-[480px] overflow-hidden rounded-lg bg-white shadow-[0_20px_50px_rgba(15,23,42,0.2)]"
      >
        <header className="flex items-center justify-between border-b border-border px-6 py-5">
          <h2 id={titleId} className="text-2xl font-bold text-navy">
            Record Payment
          </h2>
          <button
            type="button"
            onClick={onClose}
            disabled={submitting}
            className="rounded-md p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600 disabled:opacity-50"
            aria-label="Close payment modal"
          >
            <IoClose className="size-5" aria-hidden="true" />
          </button>
        </header>

        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-4 px-6 py-5">
            <fieldset>
              <legend className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                Payment method
              </legend>
              <div className="mt-2 flex flex-wrap items-center gap-2" aria-hidden="true">
                <BrandMark label="Visa">
                  <span className="text-[11px] font-extrabold italic tracking-tight text-[#1A1F71]">
                    VISA
                  </span>
                </BrandMark>
                <BrandMark label="Mastercard">
                  <span className="relative inline-flex size-5 items-center">
                    <span className="absolute left-0 size-3.5 rounded-full bg-[#EB001B]" />
                    <span className="absolute right-0 size-3.5 rounded-full bg-[#F79E1B]/90" />
                  </span>
                </BrandMark>
                <BrandMark label="American Express">
                  <span className="rounded bg-[#2E77BC] px-1 text-[9px] font-bold tracking-wide text-white">
                    AMEX
                  </span>
                </BrandMark>
                <BrandMark label="PayPal">
                  <span className="text-[11px] font-bold text-[#003087]">
                    Pay<span className="text-[#009CDE]">Pal</span>
                  </span>
                </BrandMark>
              </div>
            </fieldset>

            <div className="flex flex-col gap-1.5">
              <label htmlFor={nameId} className={`text-sm font-semibold ${labelClass('cardholderName')}`}>
                Cardholder Name
              </label>
              <input
                ref={nameRef}
                id={nameId}
                name="cardholderName"
                autoComplete="cc-name"
                placeholder="Name on card"
                value={cardholderName}
                aria-required="true"
                aria-invalid={Boolean(errors.cardholderName)}
                onFocus={() => setFocused('cardholderName')}
                onBlur={() => handleBlur('cardholderName')}
                onChange={(event) => setCardholderName(event.target.value)}
                className={`h-11 w-full rounded-lg border px-3 text-sm placeholder:text-gray-400 ${fieldClass('cardholderName')}`}
              />
              {errors.cardholderName && (
                <p className="text-xs text-danger">{errors.cardholderName}</p>
              )}
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor={numberId} className={`text-sm font-semibold ${labelClass('cardNumber')}`}>
                Card Number
              </label>
              <div className="relative">
                <input
                  id={numberId}
                  name="cardNumber"
                  inputMode="numeric"
                  autoComplete="cc-number"
                  placeholder="ACCT-000015"
                  value={cardNumber}
                  aria-required="true"
                  aria-invalid={Boolean(errors.cardNumber)}
                  aria-describedby={errors.cardNumber ? numberErrorId : undefined}
                  onFocus={() => setFocused('cardNumber')}
                  onBlur={() => handleBlur('cardNumber')}
                  onChange={(event) => setCardNumber(formatCardNumber(event.target.value))}
                  className={`h-11 w-full rounded-lg border px-3 pr-10 text-sm placeholder:text-gray-400 ${fieldClass('cardNumber')}`}
                />
                <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-400">
                  <FaCreditCard className="size-4" aria-hidden="true" />
                </span>
              </div>
              {errors.cardNumber && (
                <p id={numberErrorId} className="text-xs text-danger">
                  {errors.cardNumber}
                </p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label htmlFor={expiryId} className={`text-sm font-semibold ${labelClass('expiry')}`}>
                  Expiry Date
                </label>
                <input
                  id={expiryId}
                  name="expiry"
                  inputMode="numeric"
                  autoComplete="cc-exp"
                  placeholder="MM/YY"
                  value={expiry}
                  aria-required="true"
                  aria-invalid={Boolean(errors.expiry)}
                  onFocus={() => setFocused('expiry')}
                  onBlur={() => handleBlur('expiry')}
                  onChange={(event) => setExpiry(formatExpiry(event.target.value))}
                  className={`h-11 w-full rounded-lg border px-3 text-sm placeholder:text-gray-400 ${fieldClass('expiry')}`}
                />
                {errors.expiry && <p className="text-xs text-danger">{errors.expiry}</p>}
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor={cvvId} className={`inline-flex items-center gap-1 text-sm font-semibold ${labelClass('cvv')}`}>
                  CVV
                  <span className="text-gray-400" title="3 or 4 digit security code">
                    <FaInfoCircle className="size-3.5" aria-hidden="true" />
                  </span>
                </label>
                <input
                  id={cvvId}
                  name="cvv"
                  inputMode="numeric"
                  autoComplete="cc-csc"
                  placeholder="123"
                  value={cvv}
                  maxLength={4}
                  aria-required="true"
                  aria-invalid={Boolean(errors.cvv)}
                  aria-describedby={cvvHintId}
                  onFocus={() => setFocused('cvv')}
                  onBlur={() => handleBlur('cvv')}
                  onChange={(event) => setCvv(event.target.value.replace(/\D/g, '').slice(0, 4))}
                  className={`h-11 w-full rounded-lg border px-3 text-sm placeholder:text-gray-400 ${fieldClass('cvv')}`}
                />
                <p id={cvvHintId} className="sr-only">
                  3 or 4 digit security code on the back of the card
                </p>
                {errors.cvv && <p className="text-xs text-danger">{errors.cvv}</p>}
              </div>
            </div>

            <label className="flex items-center gap-2 text-sm text-navy">
              <input
                type="checkbox"
                checked={saveCard}
                onChange={(event) => setSaveCard(event.target.checked)}
                className="size-4 rounded border-border text-primary accent-primary"
              />
              Save card for future payments
            </label>

            <div className="flex items-center justify-between rounded-lg bg-background px-4 py-3">
              <span className="text-sm text-gray-600">Total Due</span>
              <span className="text-lg font-bold text-navy">
                {formatCurrency(
                  invoice?.total ?? Math.round((invoice?.totalDue || 0) * 100),
                )}
              </span>
            </div>

            <div className="flex items-start gap-3 rounded-lg bg-[#EFF6FF] px-4 py-3">
              <FaInfoCircle className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
              <p className="text-sm text-[#1E40AF]">
                Recording this payment will mark the associated invoice as{' '}
                <strong>Paid</strong> and notify the customer.
              </p>
            </div>
          </div>

          <footer className="flex items-center justify-end gap-3 border-t border-border px-6 py-4">
            <Button variant="default" onClick={onClose} disabled={submitting}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" loading={submitting}>
              Confirm Payment
            </Button>
          </footer>
        </form>
      </div>
    </div>
  );
}
