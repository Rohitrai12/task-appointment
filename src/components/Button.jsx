export default function Button({
  children,
  variant = "default",
  icon,
  loading = false,
  disabled = false,
  onClick,
  className = "",
  type = "button",
  ariaLabel,
}) {
  const variants = {
    default:
      "bg-white border border-[#9ca3af] text-[#374151] hover:bg-gray-50 active:bg-gray-100 ",
    primary:
      "bg-[#1d4ed8] text-white border border-[#1d4ed8] hover:bg-[#1e40af] active:bg-[#1e3a8a]",
    dark: "bg-[#0f172a] text-white border border-[#0f172a] hover:bg-[#1e293b] active:bg-[#020617]",
    danger:
      "bg-[#ef4444] text-white border border-[#ef4444] hover:bg-[#dc2626] active:bg-[#b91c1c]",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      aria-busy={loading ? "true" : undefined}
      aria-label={ariaLabel}
      className={`flex gap-2 items-center justify-center px-6 py-[10px] rounded-[8px] text-[14px] leading-[21px] min-h-[44px] transition-colors duration-150 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2563eb] ${variants[variant]} ${className}`}
      style={{ fontFamily: '"Inter:Medium", sans-serif', fontWeight: 500 }}
    >
      {loading ? (
        <>
          <span
            className="inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"
            aria-hidden="true"
          />
          Loading...
        </>
      ) : (
        <>
          {icon ? (
            <span
              className="text-[14px] leading-none"
              aria-hidden="true"
              style={{ fontFamily: '"Font Awesome 5 Free:Solid", sans-serif' }}
            >
              {icon}
            </span>
          ) : null}
          {children}
        </>
      )}
    </button>
  );
}
