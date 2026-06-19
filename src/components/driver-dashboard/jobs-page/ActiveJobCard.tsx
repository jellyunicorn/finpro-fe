import type { DriverJob } from "../../../types/driverJob";
import { addressBuilder } from "../../../utils/driverDashboardHelpers";

interface ActiveJobCardProps {
  activeJob: DriverJob;
  onAdvance: (jobId: string, type: DriverJob["type"]) => void;
  onComplete: (jobId: string, type: DriverJob["type"]) => void;
  onCancel: (jobId: string, type: DriverJob["type"]) => void;
}

export function ActiveJobCard({
  activeJob,
  onAdvance,
  onComplete,
  onCancel,
}: ActiveJobCardProps) {
  return (
    <div className="flex-1 bg-white shadow rounded-lg border border-[#BAD6F5] p-6">
      <h2 className="text-xl font-semibold text-claundry-blue mb-4">
        Active Order
      </h2>
      <div>
        <p>
          <span className="font-semibold">ID:</span> {activeJob.id}
        </p>
        <p>
          <span className="font-semibold">Customer:</span>{" "}
          {activeJob.customerName}
        </p>
        <p>
          <span className="font-semibold">Address:</span>{" "}
          {addressBuilder(
            activeJob.address,
            activeJob.regency,
            activeJob.district,
            activeJob.village,
          )}
        </p>
        <p>
          <span className="font-semibold">Postal Code:</span>{" "}
          {activeJob.postalCode}
        </p>
        <p className="mb-4">
          <span className="font-semibold">Status:</span> {activeJob.status}
        </p>

        <div className="flex gap-2">
          {activeJob.status === "WAITING_FOR_DRIVER" && (
            <button
              className="bg-claundry-blue text-white px-4 py-2 rounded hover:bg-blue-700 transition"
              onClick={() => onAdvance(activeJob.id, activeJob.type)}
            >
              {activeJob.type === "pickup"
                ? "Head to Outlet"
                : "Start Delivery"}
            </button>
          )}

          {(activeJob.status === "OTW_TO_OUTLET" ||
            activeJob.status === "OTW_TO_CUSTOMER") && (
            <button
              className="bg-claundry-blue text-white px-4 py-2 rounded hover:bg-blue-700 transition"
              onClick={() => onComplete(activeJob.id, activeJob.type)}
            >
              Mark as Complete
            </button>
          )}

          <button
            className="border-2 border-red-500 text-red-500 px-4 py-2 rounded hover:bg-red-500 hover:text-white transition"
            onClick={() => onCancel(activeJob.id, activeJob.type)}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
