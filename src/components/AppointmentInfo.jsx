export default function AppointmentInfo({ appointment }) {
  return (
    <section
      className="bg-white border border-[#e2e8f0] border-solid flex flex-col items-start overflow-hidden rounded-[12px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] flex-1 min-w-0 w-full"
      data-name="AppointmentCard"
      aria-labelledby="appointment-details-heading"
    >
      <div className="bg-[rgba(248,250,252,0.5)] border-b border-[#f1f5f9] flex flex-col items-start p-4 sm:p-6 w-full">
        <div className="flex gap-2 items-center w-full">
          <span
            className="text-[#2563eb] text-[16px] leading-none"
            aria-hidden="true"
            style={{ fontFamily: '"Font Awesome 5 Free:Solid", sans-serif' }}
          >
            {"\uF05A"}
          </span>
          <h2
            id="appointment-details-heading"
            className="text-[#0f172a] text-[16px] leading-[24px]"
            style={{
              fontFamily: '"Inter:Semi Bold", sans-serif',
              fontWeight: 600,
              letterSpacing: "-0.031px",
            }}
          >
            Appointment Details
          </h2>
        </div>
      </div>

      <div className="flex flex-col gap-8 p-5 sm:p-8 w-full">
        <div className="flex flex-col md:flex-row gap-8 items-start w-full">
          <div className="flex flex-1 flex-col gap-4 items-start min-w-0 w-full">
            <div className="flex flex-col gap-[6.5px] items-start w-full">
              <h3
                className="text-[#94a3b8] text-[12px] leading-[16px] uppercase tracking-[0.6px]"
                style={{ fontFamily: '"Inter:Bold", sans-serif', fontWeight: 700 }}
              >
                Service Type
              </h3>
              <p
                className="text-[#0f172a] text-[16px] leading-[24px] w-full break-words"
                style={{ fontFamily: '"Inter:Medium", sans-serif', fontWeight: 500 }}
              >
                {appointment.serviceType}
              </p>
            </div>

            <div className="flex flex-col gap-[10.5px] items-start w-full">
              <h3
                className="text-[#94a3b8] text-[12px] leading-[16px] uppercase tracking-[0.6px]"
                style={{ fontFamily: '"Inter:Bold", sans-serif', fontWeight: 700 }}
              >
                Customer Information
              </h3>
              <div className="flex gap-3 items-start w-full min-w-0">
                <div className="relative rounded-[8px] shrink-0 size-10 overflow-hidden">
                  <img
                    alt=""
                    className="absolute inset-0 size-full object-cover"
                    src="/person1.png"
                  />
                </div>
                <div className="flex flex-col items-start min-w-0">
                  <p
                    className="text-[#0f172a] text-[14px] leading-[20px] break-words"
                    style={{ fontFamily: '"Inter:Semi Bold", sans-serif', fontWeight: 600 }}
                  >
                    {appointment.customer.name}
                  </p>
                  <a
                    href={`mailto:${appointment.customer.email}`}
                    className="text-[#64748b] text-[12px] leading-[16px] break-all hover:text-[#2563eb] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2563eb] rounded"
                    style={{ fontFamily: '"Inter:Regular", sans-serif' }}
                  >
                    {appointment.customer.email}
                  </a>
                  <a
                    href={`tel:${appointment.customer.phone}`}
                    className="text-[#64748b] text-[12px] leading-[16px] hover:text-[#2563eb] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2563eb] rounded"
                    style={{ fontFamily: '"Inter:Regular", sans-serif' }}
                  >
                    {appointment.customer.phone}
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-1 flex-col items-start min-w-0 w-full md:pb-[54px]">
            <div className="flex flex-col gap-[10.5px] items-start w-full">
              <h3
                className="text-[#94a3b8] text-[12px] leading-[16px] uppercase tracking-[0.6px]"
                style={{ fontFamily: '"Inter:Bold", sans-serif', fontWeight: 700 }}
              >
                Vehicle Details
              </h3>
              <div className="bg-[#f8fafc] border border-[#e2e8f0] rounded-[8px] p-3 flex flex-col items-start w-full">
                <p
                  className="text-[#0f172a] text-[16px] leading-[24px] w-full break-words"
                  style={{ fontFamily: '"Inter:Bold", sans-serif', fontWeight: 700 }}
                >
                  {appointment.vehicle.make} ({appointment.vehicle.year})
                </p>
                <div className="flex flex-wrap items-center gap-2 w-full mt-1">
                  <span
                    className="text-[#64748b] text-[14px] leading-[20px]"
                    style={{ fontFamily: '"Inter:Regular", sans-serif' }}
                  >
                    Plate:
                  </span>
                  <span
                    className="bg-[#fef9c3] px-[6px] py-px rounded-[4px] text-[#1e293b] text-[12px] leading-[16px]"
                    style={{ fontFamily: '"Inter:Regular", sans-serif' }}
                  >
                    {appointment.vehicle.plate}
                  </span>
                </div>
                <p
                  className="text-[#64748b] text-[12px] leading-[16px] mt-1 break-all"
                  style={{ fontFamily: '"Inter:Regular", sans-serif' }}
                >
                  Chassis: {appointment.vehicle.chassis}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-[#f1f5f9] flex flex-col gap-[13.625px] items-start pt-[29.5px] w-full">
          <h3
            className="text-[#94a3b8] text-[12px] leading-[16px] uppercase tracking-[0.6px]"
            style={{ fontFamily: '"Inter:Bold", sans-serif', fontWeight: 700 }}
          >
            Work Completed Description
          </h3>
          <p
            className="text-[#475569] text-[14px] leading-[22.75px] w-full break-words"
            style={{ fontFamily: '"Inter:Regular", sans-serif' }}
          >
            {appointment.workDescription}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full">
          <div className="relative h-[128px] w-full rounded-[8px] overflow-hidden group cursor-pointer">
            <img
              alt="Close up photo of clean car engine bay, cinematic lighting"
              className="absolute inset-0 size-full object-cover"
              src="/img2.png"
            />
            <div className="absolute inset-0 bg-[rgba(0,0,0,0.2)] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <span
                className="text-white text-[20px] leading-none"
                aria-hidden="true"
                style={{ fontFamily: '"Font Awesome 5 Free:Solid", sans-serif' }}
              >
                {"\uF00E"}
              </span>
            </div>
          </div>

          <div className="relative h-[128px] w-full rounded-[8px] overflow-hidden group cursor-pointer">
            <img
              alt="Mechanic hand pointing at new brake pads on a car, workshop setting"
              className="absolute inset-0 size-full object-cover"
              src="/img1.png"
            />
            <div className="absolute inset-0 bg-[rgba(0,0,0,0.2)] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <span
                className="text-white text-[20px] leading-none"
                aria-hidden="true"
                style={{ fontFamily: '"Font Awesome 5 Free:Solid", sans-serif' }}
              >
                {"\uF00E"}
              </span>
            </div>
          </div>

          <button
            type="button"
            aria-label="Add photo"
            className="border-2 border-[#e2e8f0] border-dashed h-[128px] w-full rounded-[8px] flex flex-col items-center justify-center cursor-pointer hover:border-[#94a3b8] hover:bg-[#f8fafc] transition-colors group focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2563eb]"
          >
            <span
              className="text-[#94a3b8] text-[16px] leading-none mb-2 group-hover:text-[#64748b]"
              aria-hidden="true"
            >
              +
            </span>
            <span
              className="text-[#94a3b8] text-[12px] leading-[16px] group-hover:text-[#64748b]"
              style={{ fontFamily: '"Inter:Medium", sans-serif', fontWeight: 500 }}
            >
              Add Photo
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}
