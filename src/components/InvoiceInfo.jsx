import StatusBadge from "./StatusBadge";

function formatCurrency(value) {
  return `£${Number(value).toFixed(2)}`;
}

export default function InvoiceInfo({ invoice }) {
  return (
    <section className="flex flex-col gap-6 items-start w-full" aria-labelledby="invoice-summary-heading">
      <div
        className="bg-white border border-[#e2e8f0] border-solid flex flex-col items-start rounded-[12px] drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] w-full"
        data-name="InvoiceCard"
      >
        <div className="border-b border-[#f1f5f9] flex items-center justify-between gap-3 p-4 sm:p-6 w-full">
          <h2
            id="invoice-summary-heading"
            className="text-[#0f172a] text-[16px] leading-[24px]"
            style={{ fontFamily: '"Inter:Semi Bold", sans-serif', fontWeight: 600 }}
          >
            Invoice Summary
          </h2>
          <StatusBadge type="invoice" status={invoice.status} />
        </div>

        <div className="flex flex-col gap-6 items-start p-4 sm:p-6 w-full">
          <div className="flex items-start justify-between gap-4 w-full">
            <div className="flex flex-col items-start min-w-0">
              <h3
                className="text-[#94a3b8] text-[12px] leading-[16px] uppercase tracking-[0.035px]"
                style={{ fontFamily: '"Inter:Bold", sans-serif', fontWeight: 700 }}
              >
                Invoice ID
              </h3>
              <p
                className="text-[#0f172a] text-[16px] leading-[24px] break-all"
                style={{ fontFamily: '"Inter:Medium", sans-serif', fontWeight: 500 }}
              >
                {invoice.id}
              </p>
            </div>
            <div className="flex flex-col items-end shrink-0">
              <h3
                className="text-[#94a3b8] text-[12px] leading-[16px] uppercase tracking-[0.117px] text-right"
                style={{ fontFamily: '"Inter:Bold", sans-serif', fontWeight: 700 }}
              >
                Due Date
              </h3>
              <p
                className="text-[#0f172a] text-[16px] leading-[24px] text-right"
                style={{ fontFamily: '"Inter:Medium", sans-serif', fontWeight: 500 }}
              >
                {invoice.dueDate}
              </p>
            </div>
          </div>

          <div className="bg-[#0f172a] flex items-center overflow-hidden p-5 sm:p-6 relative rounded-[12px] w-full">
            <div className="absolute right-[-14.65px] top-[-3.24px] h-[60px] w-[37.5px]" aria-hidden="true">
              <span
                className="absolute text-[60px] leading-[60px] text-[rgba(255,255,255,0.1)] left-[-0.01px] top-1/2 -translate-y-1/2"
                style={{ fontFamily: '"Font Awesome 5 Free:Solid", sans-serif' }}
              >
                {"\uF154"}
              </span>
            </div>
            <div className="flex flex-col gap-1 items-start">
              <p
                className="text-[#94a3b8] text-[14px] leading-[20px]"
                style={{ fontFamily: '"Inter:Medium", sans-serif', fontWeight: 500 }}
              >
                Total Amount Due
              </p>
              <p
                className="text-white text-[30px] leading-[36px]"
                style={{
                  fontFamily: '"Inter:Bold", sans-serif',
                  fontWeight: 700,
                  letterSpacing: "-0.352px",
                }}
              >
                {formatCurrency(invoice.totalDue)}
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-4 items-start w-full">
            <h3
              className="text-[#94a3b8] text-[12px] leading-[16px] uppercase tracking-[0.6px]"
              style={{ fontFamily: '"Inter:Bold", sans-serif', fontWeight: 700 }}
            >
              Breakdown
            </h3>

            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[#f1f5f9]">
                  <th
                    className="text-[#64748b] text-[14px] leading-[20px] font-medium pb-2"
                    style={{ fontFamily: '"Inter:Medium", sans-serif' }}
                  >
                    Description
                  </th>
                  <th
                    className="text-[#64748b] text-[14px] leading-[20px] font-medium pb-2 text-right"
                    style={{ fontFamily: '"Inter:Medium", sans-serif' }}
                  >
                    Amount
                  </th>
                </tr>
              </thead>
              <tbody>
                {invoice.lineItems.map((item, index) => (
                  <tr
                    key={`${item.description}-${index}`}
                    className={index > 0 ? "border-t border-[#f8fafc]" : ""}
                  >
                    <td
                      className="text-[#475569] text-[14px] leading-[20px] py-3 pr-3 break-words"
                      style={{ fontFamily: '"Inter:Regular", sans-serif' }}
                    >
                      {item.description}
                    </td>
                    <td
                      className="text-[#0f172a] text-[14px] leading-[20px] py-3 text-right whitespace-nowrap"
                      style={{ fontFamily: '"Inter:Medium", sans-serif', fontWeight: 500 }}
                    >
                      {formatCurrency(item.amount)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="border-t border-[#e2e8f0] flex flex-col gap-2 items-start pt-4 w-full">
              <div className="flex items-start justify-between w-full gap-3">
                <span
                  className="text-[#64748b] text-[14px] leading-[20px]"
                  style={{ fontFamily: '"Inter:Regular", sans-serif' }}
                >
                  Subtotal
                </span>
                <span
                  className="text-[#0f172a] text-[14px] leading-[20px]"
                  style={{ fontFamily: '"Inter:Regular", sans-serif' }}
                >
                  {formatCurrency(invoice.subtotal)}
                </span>
              </div>
              <div className="flex items-start justify-between w-full gap-3">
                <span
                  className="text-[#64748b] text-[14px] leading-[20px]"
                  style={{ fontFamily: '"Inter:Regular", sans-serif' }}
                >
                  VAT ({invoice.vatRate}%)
                </span>
                <span
                  className="text-[#0f172a] text-[14px] leading-[20px]"
                  style={{ fontFamily: '"Inter:Regular", sans-serif' }}
                >
                  {formatCurrency(invoice.vat)}
                </span>
              </div>
              <div className="flex items-start justify-between pt-2 w-full gap-3">
                <span
                  className="text-[#0f172a] text-[16px] leading-[24px]"
                  style={{ fontFamily: '"Inter:Bold", sans-serif', fontWeight: 700 }}
                >
                  Total
                </span>
                <span
                  className="text-[#0f172a] text-[18px] leading-[28px]"
                  style={{ fontFamily: '"Inter:Bold", sans-serif', fontWeight: 700 }}
                >
                  {formatCurrency(invoice.totalDue)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[#eff6ff] border border-[#dbeafe] flex gap-3 items-start p-4 relative rounded-[12px] w-full">
        <div className="flex items-start justify-center pt-0.5 shrink-0">
          <span
            className="text-[#3b82f6] text-[16px] leading-none"
            aria-hidden="true"
            style={{ fontFamily: '"Font Awesome 5 Free:Solid", sans-serif' }}
          >
            {"\uF059"}
          </span>
        </div>
        <p
          className="text-[#1d4ed8] text-[12px] leading-[19.5px] break-words"
          style={{ fontFamily: '"Inter:Regular", sans-serif' }}
        >
          <strong style={{ fontFamily: '"Inter:Bold", sans-serif', fontWeight: 700 }}>
            Payment Note:
          </strong>{" "}
          {invoice.paymentNote}
        </p>
      </div>
    </section>
  );
}
