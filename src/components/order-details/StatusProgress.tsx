import { STATUS, type OrderStatus } from "../../lib/statusLookup";

// Ordered laundry pipeline (CANCELLED is handled separately — it's not a stage)
const STAGES: OrderStatus[] = [
  "WAITING_FOR_DRIVER",
  "OTW_TO_OUTLET",
  "ARRIVED_AT_OUTLET",
  "WASHING",
  "IRONING",
  "PACKING",
  "WAITING_FOR_PAYMENT",
  "READY_TO_DELIVER",
  "OTW_TO_CUSTOMER",
  "ARRIVED_AT_CUSTOMER",
  "CONFIRMED",
];

export default function StatusProgress({ status }: { status: OrderStatus }) {
  const isCancelled = status === "CANCELLED";
  const currentIndex = STAGES.indexOf(status);

  return (
    <div className="w-full rounded-2xl border-claundry-accent border p-5 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="font-medium text-claundry-blue">Order Progress</h2>
        {isCancelled && (
          <span className="text-sm px-3 py-1 border rounded-full border-red-400 text-red-600 bg-red-50">
            Cancelled
          </span>
        )}
        {status === "WAITING_FOR_PAYMENT" && (
          <div className="text-sm bg-amber-100 text-amber-600 px-2 py-1 rounded-md">
            Payment required : complete to proceed to delivery.
          </div>
        )}
         {status === "ARRIVED_AT_CUSTOMER" && (
                <div className="text-sm bg-amber-100 text-amber-600 px-2 py-1 rounded-md">
                  Delivered. Please confirm receipt — orders auto-confirm after 2 days
                </div>
              )}
      </div>
      <hr className="border-neutral-200" />

      <div className="flex items-start overflow-x-auto  py-2">
        {STAGES.map((stage, idx) => {
          const isDone = !isCancelled && idx < currentIndex;
          const isActive = !isCancelled && idx === currentIndex;
          const isLast = idx === STAGES.length - 1;

          return (
            <div
              key={stage}
              className="flex flex-col items-center min-w-18 flex-1 relative"
            >
              {/* //----->connecting line to the next node */}
              {!isLast && (
                <div
                  className={`absolute top-3 left-1/2 h-0.5 w-full ${
                    isDone ? "bg-claundry-blue" : "bg-neutral-200"
                  }`}
                />
              )}

              {/* //---->node */}
              <div
                className={`relative z-1 h-6 w-6 rounded-full flex items-center justify-center text-[10px] font-medium transition-colors ${
                  isDone
                    ? "bg-claundry-blue text-white"
                    : isActive
                      ? "bg-white text-claundry-blue border-2  ring-4 "
                      : "bg-white text-neutral-400 border-2 border-neutral-200"
                }`}
              >
                {isDone ? "✓" : idx + 1}
              </div>

              {/* //---->label */}
              <p
                className={`mt-2 text-center text-[11px] leading-tight px-1 ${
                  isActive
                    ? "text-claundry-blue font-medium"
                    : isDone
                      ? "text-neutral-600"
                      : "text-neutral-400"
                }`}
              >
                {STATUS[stage].label}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
