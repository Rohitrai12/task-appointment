export default function ErrorState({
  message = "Failed to load appointment",
  onRetry,
}) {
  return (
    <div
      className="flex items-center justify-center w-full min-h-[480px] px-4 py-16"
      role="alert"
    >
      <div className="bg-white border border-[#e2e8f0] rounded-[12px] shadow-[0_1px_2px_rgba(0,0,0,0.05)] max-w-[420px] w-full px-8 py-10 flex flex-col items-center text-center gap-4">
        <div
          className="size-16 rounded-full bg-[#fef2f2] border border-[#fecaca] flex items-center justify-center"
          aria-hidden="true"
        >
          <span
            className="text-[28px] text-[#ef4444] leading-none"
            style={{ fontFamily: '"Font Awesome 5 Free:Solid", sans-serif' }}
          >
            {"\uF071"}
          </span>
        </div>
        <div className="flex flex-col gap-2 items-center">
          <h2
            className="text-[#0f172a] text-[18px] leading-[28px]"
            style={{ fontFamily: '"Inter:Semi Bold", sans-serif', fontWeight: 600 }}
          >
            Failed to load appointment
          </h2>
          <p
            className="text-[#64748b] text-[14px] leading-[20px] max-w-[320px]"
            style={{ fontFamily: '"Inter:Regular", sans-serif' }}
          >
            {message}
          </p>
        </div>
        {onRetry ? (
          <button
            type="button"
            onClick={onRetry}
            className="flex gap-2 items-center justify-center bg-[#2563eb] text-white px-6 py-3 rounded-[8px] text-[14px] leading-[20px] hover:bg-[#1d4ed8] active:bg-[#1e40af] transition-colors cursor-pointer min-h-[44px] min-w-[140px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2563eb]"
            style={{ fontFamily: '"Inter:Medium", sans-serif', fontWeight: 500 }}
          >
            <span
              className="text-[14px] leading-none"
              aria-hidden="true"
              style={{ fontFamily: '"Font Awesome 5 Free:Solid", sans-serif' }}
            >
              {"\uF01E"}
            </span>
            Retry
          </button>
        ) : null}
      </div>
    </div>
  );
}
