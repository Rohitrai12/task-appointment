import { useState, useCallback, useEffect } from "react";
import { useAppointment } from "../hooks/useAppointment";
import {
  sendInvoice,
  recordPayment,
  markComplete,
  getActionErrorMessage,
} from "../api/mockData";
import AppointmentInfo from "./AppointmentInfo";
import InvoiceInfo from "./InvoiceInfo";
import LoadingState from "./LoadingState";
import ErrorState from "./ErrorState";
import ToastStack from "./Toast";
import PaymentModal from "./PaymentModal";
import StatusBadge from "./StatusBadge";
import Button from "./Button";

let toastIdCounter = 0;

const NAV_ITEMS = [
  { icon: "\uF073", label: "Schedule", active: false },
  { icon: "\uF46D", label: "Appointments", active: true },
  { icon: "\uF0C0", label: "Customers", active: false },
  { icon: "\uF571", label: "Invoices", active: false },
];

function Sidebar({
  collapsed,
  onToggleCollapse,
  mobileOpen,
  onCloseMobile,
}) {
  const [isDesktopNav, setIsDesktopNav] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(min-width: 768px)");
    const update = () => setIsDesktopNav(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  const labelClass = collapsed
    ? "inline md:hidden lg:inline"
    : "inline";
  const widthClass = collapsed
    ? "w-[280px] md:w-[72px] lg:w-[280px]"
    : "w-[280px]";

  return (
    <>
      {mobileOpen ? (
        <div
          className="fixed inset-0 bg-[rgba(15,23,42,0.4)] z-30 md:hidden"
          onClick={onCloseMobile}
          aria-hidden="true"
        />
      ) : null}

      <aside
        id="app-sidebar"
        inert={!isDesktopNav && !mobileOpen ? true : undefined}
        className={`bg-white border-r border-[#e2e8f0] flex flex-col shrink-0 self-stretch ${widthClass} z-40
          fixed inset-y-0 left-0 md:static md:inset-auto md:z-20
          transition-transform duration-200
          ${mobileOpen ? "translate-x-0" : "-translate-x-full pointer-events-none md:pointer-events-auto"}
          md:translate-x-0`}
        aria-label="Sidebar navigation"
      >
        <div className={`border-b border-[#f1f5f9] flex h-[80px] items-center shrink-0 ${collapsed ? "px-6 md:px-3 md:justify-center lg:px-6 lg:justify-start" : "px-6"}`}>
          <div
            className={`flex items-center min-w-0  gap-3 ${collapsed ? 'w-full md:justify-center lg:justify-start' : 'gap-3'
              }`}
          >
            <div className="flex size-8 shrink-0 items-center justify-center rounded-[8px] bg-[#1d4ed8]">
              <span
                className="text-white text-[18px] font-bold leading-none"
                style={{ fontFamily: '"Inter:Bold", sans-serif' }}
              >
                B
              </span>
            </div>

            <span
              className={`${labelClass} truncate text-[20px] leading-[28px] tracking-[-0.5px] text-[#0f172a]`}
              style={{
                fontFamily: '"Inter:Bold", sans-serif',
                fontWeight: 700,
              }}
            >
              BridgeTech
            </span>
          </div>
          <button
            type="button"
            onClick={onCloseMobile}
            aria-label="Close navigation menu"
            className="md:hidden ml-auto min-h-[44px] min-w-[44px] flex items-center justify-center text-[#94a3b8] hover:text-[#475569] rounded-[6px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2563eb]"
            style={{ fontFamily: '"Font Awesome 5 Free:Solid", sans-serif' }}
          >
            {"\uF00D"}
          </button>
        </div>

        <nav className={`flex flex-1 flex-col gap-1 items-start min-h-0 py-6 overflow-y-auto ${collapsed ? "px-4 md:px-2 lg:px-4" : "px-4"}`} aria-label="Management">
          <span
            className={`${labelClass} text-[#94a3b8] text-[12px] leading-[16px] uppercase tracking-[0.6px] px-3 mb-1`}
            style={{ fontFamily: '"Inter:Semi Bold", sans-serif', fontWeight: 600 }}
          >
            Management
          </span>
          {NAV_ITEMS.map(({ icon, label, active }) => (
            <button
              key={label}
              type="button"
              aria-current={active ? "page" : undefined}
              aria-label={label}
              title={label}
              className={`flex gap-3 items-center min-h-[44px] ${collapsed ? "px-3 justify-start md:justify-center md:px-0 lg:justify-start lg:px-3" : "px-3"
                } ${active
                  ? "bg-[#eff6ff] text-[#1d4ed8]"
                  : "text-[#475569] hover:bg-[#f8fafc] hover:text-[#334155]"
                } py-[10px] rounded-[8px] w-full cursor-pointer transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2563eb]`}
            >
              <span
                className="text-[16px] leading-[16px] w-5 shrink-0 text-center"
                aria-hidden="true"
                style={{
                  fontFamily: '"Font Awesome 5 Free:Solid", sans-serif',
                  color: active ? "#1d4ed8" : "#475569",
                }}
              >
                {icon}
              </span>
              <span
                className={`${labelClass} text-[16px] leading-[24px]`}
                style={{
                  fontFamily: '"Inter:Medium", sans-serif',
                  fontWeight: 500,
                  color: active ? "#1d4ed8" : "#475569",
                }}
              >
                {label}
              </span>
            </button>
          ))}
        </nav>

        <div className="border-t border-[#f1f5f9] flex flex-col items-start p-3 lg:p-4 shrink-0 gap-2">
          <button
            type="button"
            onClick={onToggleCollapse}
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            aria-expanded={!collapsed}
            className="hidden md:flex lg:hidden items-center justify-center min-h-[44px] min-w-[44px] w-full rounded-[8px] text-[#64748b] hover:bg-[#f8fafc] cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2563eb]"
            style={{ fontFamily: '"Font Awesome 5 Free:Solid", sans-serif' }}
          >
            {collapsed ? "\uF054" : "\uF053"}
          </button>
          <div className={`flex gap-3 items-center p-2 w-full ${collapsed ? "justify-start md:justify-center lg:justify-start" : ""}`}>
            <div className="relative rounded-full shrink-0 size-10 overflow-hidden">
              <img alt="" className="absolute inset-0 size-full object-cover" src="/person2.png" />
            </div>
            <div className={`${collapsed ? "flex md:hidden lg:flex" : "flex"} flex-col items-start min-w-0`}>
              <span
                className="text-[#0f172a] text-[14px] leading-[20px] truncate"
                style={{ fontFamily: '"Inter:Semi Bold", sans-serif', fontWeight: 600 }}
              >
                Marcus Sterling
              </span>
              <span
                className="text-[#64748b] text-[12px] leading-[16px] truncate"
                style={{ fontFamily: '"Inter:Regular", sans-serif' }}
              >
                Service Manager
              </span>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}

export default function AppointmentDetail({ appointmentId = "APT-2026-0001", onClose = null }) {
  const {
    appointment,
    invoice,
    loading,
    error,
    retry,
    updateAppointmentStatus,
    updateInvoiceStatus,
  } = useAppointment(appointmentId);

  const [sendingInvoice, setSendingInvoice] = useState(false);
  const [recordingPayment, setRecordingPayment] = useState(false);
  const [markingComplete, setMarkingComplete] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [toasts, setToasts] = useState([]);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [tabletExpanded, setTabletExpanded] = useState(false);

  const addToast = useCallback((toast) => {
    const id = ++toastIdCounter;
    setToasts((prev) => [...prev, { ...toast, id }]);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const closePaymentModal = useCallback(() => {
    if (recordingPayment) return;
    setShowPaymentModal(false);
  }, [recordingPayment]);

  useEffect(() => {
    if (!mobileNavOpen) return undefined;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = (event) => {
      if (event.key === "Escape") setMobileNavOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previous;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [mobileNavOpen]);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setMobileNavOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const handleSendInvoice = async () => {
    if (sendingInvoice || recordingPayment || markingComplete || !invoice) return;
    setSendingInvoice(true);
    try {
      await sendInvoice(invoice.id);
      addToast({
        type: "success",
        title: `Invoice sent to ${appointment?.customer?.email || "the customer"}`,
      });
    } catch (err) {
      addToast({
        type: "error",
        title: getActionErrorMessage(err, "Unable to send invoice. Please try again."),
      });
    } finally {
      setSendingInvoice(false);
    }
  };

  const handleRecordPayment = async (payload) => {
    if (recordingPayment) return;
    setRecordingPayment(true);
    try {
      await recordPayment(invoice?.id, payload);
      updateInvoiceStatus("Paid");
      setShowPaymentModal(false);
      addToast({
        type: "success",
        title: "Payment recorded successfully",
      });
    } catch (err) {
      addToast({
        type: "error",
        title: getActionErrorMessage(err, "Unable to record payment. Please try again."),
      });
    } finally {
      setRecordingPayment(false);
    }
  };

  const handleMarkComplete = async () => {
    if (markingComplete || sendingInvoice || recordingPayment || !appointment) return;
    setMarkingComplete(true);
    try {
      await markComplete(appointment.id);
      updateAppointmentStatus("Completed");
      addToast({
        type: "success",
        title: "Appointment marked as complete",
      });
    } catch (err) {
      addToast({
        type: "error",
        title: getActionErrorMessage(
          err,
          "Unable to mark appointment as complete. Please try again.",
        ),
      });
    } finally {
      setMarkingComplete(false);
    }
  };

  const now = new Date();
  const hour = now.getHours();
  const savedTime = `${hour % 12 || 12}:${String(now.getMinutes()).padStart(2, "0")} ${hour >= 12 ? "PM" : "AM"}`;
  const actionsLocked = loading || Boolean(error) || !appointment;
  const sidebarCollapsed = !tabletExpanded;

  return (
    <div className="bg-[#f8fafc] flex min-h-screen w-full overflow-x-hidden">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:bg-white focus:px-4 focus:py-2 focus:rounded-[8px] focus:text-[#1d4ed8]"
      >
        Skip to main content
      </a>

      <Sidebar
        collapsed={sidebarCollapsed}
        onToggleCollapse={() => setTabletExpanded((open) => !open)}
        mobileOpen={mobileNavOpen}
        onCloseMobile={() => setMobileNavOpen(false)}
      />

      <div className="flex flex-col min-w-0 flex-1">
        <header className="bg-white border-b border-[#e2e8f0] flex min-h-[80px] items-center justify-between gap-3 px-4 sm:px-6 lg:px-8 sticky top-0 z-10 py-3 lg:py-0">
          <div className="flex items-center gap-2 min-w-0 flex-1">
            <button
              type="button"
              className="md:hidden min-h-[44px] min-w-[44px] flex items-center justify-center rounded-[8px] text-[#475569] hover:bg-[#f8fafc] cursor-pointer shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2563eb]"
              aria-label="Open navigation menu"
              aria-expanded={mobileNavOpen}
              aria-controls="app-sidebar"
              onClick={() => setMobileNavOpen(true)}
              style={{ fontFamily: '"Font Awesome 5 Free:Solid", sans-serif' }}
            >
              {"\uF142"}
            </button>

            <div className="flex flex-col items-start min-w-0">
              {loading || !appointment ? (
                <div className="flex flex-col gap-1 w-full" aria-hidden="true">
                  <div className="bg-[#e2e8f0] h-6 w-40 sm:w-56 max-w-full rounded animate-pulse" />
                  <div className="bg-[#e2e8f0] h-4 w-32 sm:w-44 max-w-full rounded animate-pulse" />
                </div>
              ) : (
                <>
                  <div className="flex flex-wrap gap-2 sm:gap-3 items-center">
                    {onClose ? (
                      <button
                        type="button"
                        onClick={onClose}
                        aria-label="Close appointment details"
                        className="text-[#64748b] hover:text-[#0f172a] min-h-[44px] min-w-[44px] flex items-center justify-center"
                      >
                        Back
                      </button>
                    ) : null}
                    <h1
                      className="text-[#0f172a] text-[16px] sm:text-[20px] leading-[24px] sm:leading-[28px] tracking-[-0.156px] break-words"
                      style={{ fontFamily: '"Inter:Bold", sans-serif', fontWeight: 700 }}
                    >
                      Appointment #{appointment.id}
                    </h1>
                    <StatusBadge type="appointment" status={appointment.status} />
                  </div>
                  <p
                    className="text-[#64748b] text-[13px] sm:text-[14px] leading-[20px] break-words"
                    style={{ fontFamily: '"Inter:Regular", sans-serif' }}
                  >
                    {appointment.date}
                  </p>
                </>
              )}
            </div>
          </div>

          <div className="flex gap-2 sm:gap-4 items-center shrink-0">
            <button
              type="button"
              aria-label="Notifications"
              className="flex items-center justify-center min-h-[44px] min-w-[44px] text-[#94a3b8] text-[20px] leading-none hover:text-[#64748b] transition-colors cursor-pointer rounded-[8px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2563eb]"
              style={{ fontFamily: '"Font Awesome 5 Free:Regular", sans-serif' }}
            >
              {"\uF0F3"}
            </button>
            <div className="bg-[#e2e8f0] h-8 w-px hidden sm:block" />
            <button
              type="button"
              className="bg-white border border-[#9ca3af] flex gap-2 items-center justify-center px-3 sm:px-5 py-[10px] rounded-[8px] text-[#374151] text-[14px] leading-[21px] hover:bg-gray-50 transition-colors cursor-pointer min-h-[44px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2563eb]"
              onClick={() => window.print()}
              aria-label="Print details"
              style={{ fontFamily: '"Inter:Medium", sans-serif', fontWeight: 500 }}
            >
              <span
                className="text-[14px] text-[#374151] leading-none"
                aria-hidden="true"
                style={{ fontFamily: '"Font Awesome 5 Free:Solid", sans-serif' }}
              >
                {"\uF02F"}
              </span>
              <span className="hidden sm:inline">Print Details</span>
            </button>
          </div>
        </header>

        <main id="main-content" className="flex-1 p-4 sm:p-6 lg:p-8 w-full overflow-x-hidden">
          {loading ? (
            <LoadingState />
          ) : error ? (
            <ErrorState message={error} onRetry={retry} />
          ) : appointment && invoice ? (
            <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-start justify-center max-w-[1400px] w-full">
              <AppointmentInfo appointment={appointment} />
              <div className="w-full lg:w-[426px] shrink-0">
                <InvoiceInfo invoice={invoice} />
              </div>
            </div>
          ) : null}
        </main>

        <footer className="bg-white border-t border-[#e2e8f0] flex flex-col md:flex-row md:h-[96px] md:items-center md:justify-between gap-3 px-4 sm:px-6 lg:px-8 py-4 md:py-0 sticky bottom-0 z-10">
          <div className="hidden md:flex gap-2 items-center shrink-0">
            <span
              className="text-[#10b981] text-[14px] leading-none"
              aria-hidden="true"
              style={{ fontFamily: '"Font Awesome 5 Free:Solid", sans-serif' }}
            >
              {"\uF058"}
            </span>
            <span
              className="text-[#64748b] text-[14px] leading-[20px]"
              style={{ fontFamily: '"Inter:Regular", sans-serif' }}
            >
              Auto-saved at {savedTime}
            </span>
          </div>

          <div className="flex flex-col md:flex-row gap-3 md:gap-4 items-stretch md:items-center w-full md:w-auto">
            <Button
              variant="default"
              icon={"\uF09D"}
              onClick={() => setShowPaymentModal(true)}
              disabled={
                actionsLocked ||
                recordingPayment ||
                sendingInvoice ||
                markingComplete ||
                invoice?.status === "Paid"
              }
              ariaLabel="Record payment"
              className="w-full md:w-auto order-2 md:order-1"
            >
              Record Payment
            </Button>

            <Button
              variant="primary"
              icon={"\uF1D8"}
              onClick={handleSendInvoice}
              loading={sendingInvoice}
              disabled={
                actionsLocked || recordingPayment || markingComplete || sendingInvoice
              }
              ariaLabel="Send invoice to customer"
              className="w-full md:w-auto order-1 md:order-2"
            >
              Send Invoice
            </Button>

            <div className="hidden md:block bg-[#e2e8f0] h-8 w-px order-3" aria-hidden="true" />

            <Button
              variant="dark"
              icon={"\uF560"}
              onClick={handleMarkComplete}
              loading={markingComplete}
              disabled={
                actionsLocked ||
                sendingInvoice ||
                recordingPayment ||
                markingComplete ||
                appointment?.status === "Completed"
              }
              ariaLabel="Mark appointment as complete"
              className="w-full md:w-auto order-3 md:order-4"
            >
              Mark Complete
            </Button>
          </div>
        </footer>
      </div>

      {showPaymentModal ? (
        <PaymentModal
          invoice={invoice}
          onClose={closePaymentModal}
          onSubmit={handleRecordPayment}
          loading={recordingPayment}
        />
      ) : null}

      <ToastStack toasts={toasts} onRemove={removeToast} />
    </div>
  );
}
