import type { DriverJob } from "../../../types/driverJob";
import {
  addressBuilder,
  formatDateTime,
} from "../../../utils/driverDashboardHelpers";

interface JobRequestsCardsListProps {
  jobs: DriverJob[];
  onAccept: (id: string, type: DriverJob["type"]) => void;
}

export default function JobRequestsCardsList({
  jobs,
  onAccept,
}: JobRequestsCardsListProps) {
  return (
    <div className="m-3 grid gap-4 sm:grid-cols-2 md:hidden">
      {jobs.map((job) => (
        <div
          key={job.id}
          className="flex flex-col gap-1.5 border border-[#BAD6F5] hover:border-claundry-blue rounded-lg p-4 shadow-sm transition-colors"
        >
          <div className="flex flex-col gap-1.5">
            <p className="text-claundry-blue font-semibold mb-0.5">#{job.id}</p>
            <p className="text-sm text-gray-600">
              {formatDateTime(job.createdAt)}
            </p>
            <p className="text-sm text-gray-600">
              Address:{" "}
              {addressBuilder(
                job.address,
                job.regency,
                job.district,
                job.village,
              )}
            </p>
            <p className="text-sm text-gray-600">
              Postal Code: {job.postalCode}
            </p>
            <p className="text-sm text-gray-600">
              Customer: {job.customerName}
            </p>
            <p className="text-sm text-gray-600">Distance: {job.distance} km</p>
          </div>

          <div className="mt-4 flex justify-end">
            <button
              onClick={() => onAccept(job.id, job.type)}
              className="bg-claundry-blue text-white px-3 py-1 rounded hover:bg-blue-700 transition"
            >
              Accept
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
