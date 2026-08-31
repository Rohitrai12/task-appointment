export default function StatusBadge({ type, status }) {
  const appointmentConfig = {
    Scheduled: {
      bg: "bg-[#eff6ff]",
      border: "border-[#bfdbfe]",
      text: "text-[#1d4ed8]",
      icon: "\uF133",
      iconFamily: "Font Awesome 5 Free:Regular",
    },
    "In Progress": {
      bg: "bg-[#fffbeb]",
      border: "border-[#fde68a]",
      text: "text-[#b45309]",
      icon: "\uF017",
      iconFamily: "Font Awesome 5 Free:Regular",
    },
    Completed: {
      bg: "bg-[#ecfdf5]",
      border: "border-[#a7f3d0]",
      text: "text-[#065f46]",
      icon: "\uF058",
      iconFamily: "Font Awesome 5 Free:Solid",
    },
  };

  const invoiceConfig = {
    Unpaid: {
      bg: "bg-[#fef2f2]",
      border: "border-[#fecaca]",
      text: "text-[#dc2626]",
      icon: "\uF06A",
      iconFamily: "Font Awesome 5 Free:Solid",
    },
    Paid: {
      bg: "bg-[#ecfdf5]",
      border: "border-[#a7f3d0]",
      text: "text-[#065f46]",
      icon: "\uF058",
      iconFamily: "Font Awesome 5 Free:Solid",
    },
    Overdue: {
      bg: "bg-[#fef2f2]",
      border: "border-[#fecaca]",
      text: "text-[#dc2626]",
      icon: "\uF071",
      iconFamily: "Font Awesome 5 Free:Solid",
    },
  };

  const config =
    type === "appointment"
      ? appointmentConfig[status] || appointmentConfig.Scheduled
      : invoiceConfig[status] || invoiceConfig.Unpaid;

  return (
    <div
      className={`${config.bg} border ${config.border} border-solid flex gap-[6px] items-center px-3 py-1 rounded-full shrink-0`}
      role="status"
      aria-label={`${type === "appointment" ? "Appointment" : "Invoice"} status: ${status}`}
    >
      {config.icon ? (
        <span
          className={`${config.text} text-[12px] leading-none`}
          aria-hidden="true"
          style={{ fontFamily: `"${config.iconFamily}", sans-serif` }}
        >
          {config.icon}
        </span>
      ) : null}
      <span
        className={`${config.text} text-[12px] font-medium leading-[18px] whitespace-nowrap`}
        style={{ fontFamily: '"Inter:Medium", sans-serif' }}
      >
        {status}
      </span>
    </div>
  );
}
