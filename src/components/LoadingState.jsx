function Skeleton({ className = "" }) {
  return <div className={`bg-[#e2e8f0] rounded animate-pulse ${className}`} />;
}

export default function LoadingState() {
  return (
    <div
      className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-start justify-center max-w-[1400px] w-full min-h-[640px]"
      aria-busy="true"
      aria-live="polite"
      aria-label="Loading appointment details"
    >
      <div className="bg-white border border-[#e2e8f0] rounded-[12px] overflow-hidden flex-1 min-w-0 w-full">
        <div className="border-b border-[#f1f5f9] p-4 sm:p-6">
          <div className="flex gap-2 items-center">
            <Skeleton className="w-4 h-4 rounded" />
            <Skeleton className="w-40 h-5 rounded" />
          </div>
        </div>
        <div className="p-5 sm:p-8 flex flex-col gap-8">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="flex-1 flex flex-col gap-3">
              <Skeleton className="w-20 h-3 rounded" />
              <Skeleton className="w-56 max-w-full h-5 rounded" />
              <Skeleton className="w-40 h-5 rounded" />
            </div>
            <div className="flex-1 flex flex-col gap-3">
              <Skeleton className="w-24 h-3 rounded" />
              <div className="bg-[#f8fafc] border border-[#e2e8f0] rounded-[8px] p-3 flex flex-col gap-2">
                <Skeleton className="w-36 h-5 rounded" />
                <Skeleton className="w-32 h-4 rounded" />
                <Skeleton className="w-40 h-3 rounded" />
              </div>
            </div>
          </div>
          <div className="border-t border-[#f1f5f9] pt-6 flex flex-col gap-4">
            <Skeleton className="w-32 h-3 rounded" />
            <Skeleton className="w-full h-4 rounded" />
            <Skeleton className="w-full h-4 rounded" />
            <Skeleton className="w-3/4 h-4 rounded" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Skeleton className="w-full h-[128px] rounded-[8px]" />
            <Skeleton className="w-full h-[128px] rounded-[8px]" />
            <Skeleton className="w-full h-[128px] rounded-[8px]" />
          </div>
        </div>
      </div>

      <div className="bg-white border border-[#e2e8f0] rounded-[12px] w-full lg:w-[426px] shrink-0">
        <div className="border-b border-[#f1f5f9] p-6 flex items-center justify-between">
          <Skeleton className="w-32 h-5 rounded" />
          <Skeleton className="w-16 h-6 rounded-full" />
        </div>
        <div className="p-6 flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-1">
              <Skeleton className="w-16 h-3 rounded" />
              <Skeleton className="w-28 h-5 rounded" />
            </div>
            <div className="flex flex-col gap-1 items-end">
              <Skeleton className="w-16 h-3 rounded" />
              <Skeleton className="w-24 h-5 rounded" />
            </div>
          </div>
          <Skeleton className="w-full h-[80px] rounded-[12px]" />
          <div className="flex flex-col gap-4">
            <Skeleton className="w-24 h-3 rounded" />
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex justify-between">
                <Skeleton className="w-40 max-w-[60%] h-4 rounded" />
                <Skeleton className="w-16 h-4 rounded" />
              </div>
            ))}
            <div className="border-t border-[#e2e8f0] pt-4 flex flex-col gap-3">
              {[1, 2].map((i) => (
                <div key={i} className="flex justify-between">
                  <Skeleton className="w-16 h-4 rounded" />
                  <Skeleton className="w-16 h-4 rounded" />
                </div>
              ))}
              <div className="flex justify-between pt-2">
                <Skeleton className="w-12 h-5 rounded" />
                <Skeleton className="w-20 h-5 rounded" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
