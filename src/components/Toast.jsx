import { useEffect, useState } from "react";

const ICONS = {
  success: { glyph: "\uF058", className: "text-[#10b981]" },
  error: { glyph: "\uF06A", className: "text-[#ef4444]" },
  info: { glyph: "\uF05A", className: "text-[#2563eb]" },
};

function ToastItem({ toast, onRemove }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const show = requestAnimationFrame(() => setVisible(true));
    const hideTimer = setTimeout(() => {
      setVisible(false);
      setTimeout(() => onRemove(toast.id), 300);
    }, toast.duration || 3000);
    return () => {
      cancelAnimationFrame(show);
      clearTimeout(hideTimer);
    };
  }, [toast.id, toast.duration, onRemove]);

  const icon = ICONS[toast.type] || ICONS.info;
  const isSuccess = toast.type === "success";
  const isError = toast.type === "error";

  return (
    <div
      role="status"
      aria-live={isError ? "assertive" : "polite"}
      aria-atomic="true"
      className={`flex items-start gap-3 bg-white border rounded-[10px] shadow-[0_4px_16px_rgba(0,0,0,0.12)] p-4 w-full max-w-full md:min-w-[300px] md:max-w-[380px] transition-all duration-300 ${
        visible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
      } ${isSuccess ? "border-[#a7f3d0]" : isError ? "border-[#fecaca]" : "border-[#bfdbfe]"}`}
    >
      <span
        className={`text-[16px] leading-none mt-0.5 shrink-0 ${icon.className}`}
        aria-hidden="true"
        style={{ fontFamily: '"Font Awesome 5 Free:Solid", sans-serif' }}
      >
        {icon.glyph}
      </span>
      <div className="flex-1 min-w-0">
        <p
          className="text-[#0f172a] text-[14px] leading-[20px] break-words"
          style={{ fontFamily: '"Inter:Medium", sans-serif', fontWeight: 500 }}
        >
          {toast.title}
        </p>
        {toast.message ? (
          <p
            className="text-[#64748b] text-[12px] leading-[16px] mt-0.5 break-words"
            style={{ fontFamily: '"Inter:Regular", sans-serif' }}
          >
            {toast.message}
          </p>
        ) : null}
      </div>
      <button
        type="button"
        aria-label="Dismiss notification"
        onClick={() => {
          setVisible(false);
          setTimeout(() => onRemove(toast.id), 300);
        }}
        className="text-[#94a3b8] hover:text-[#64748b] text-[12px] leading-none shrink-0 cursor-pointer transition-colors min-h-[44px] min-w-[44px] md:min-h-0 md:min-w-0 flex items-center justify-center -mr-2 -mt-2 md:mr-0 md:mt-0"
        style={{ fontFamily: '"Font Awesome 5 Free:Solid", sans-serif' }}
      >
        {"\uF00D"}
      </button>
    </div>
  );
}

export default function ToastStack({ toasts, onRemove }) {
  if (!toasts.length) return null;

  return (
    <div
      className="fixed top-4 right-4 left-4 md:left-auto z-50 flex flex-col gap-2 items-stretch md:items-end pointer-events-none"
      role="region"
      aria-label="Notifications"
    >
      {toasts.map((toast) => (
        <div key={toast.id} className="pointer-events-auto w-full md:w-auto">
          <ToastItem toast={toast} onRemove={onRemove} />
        </div>
      ))}
    </div>
  );
}
