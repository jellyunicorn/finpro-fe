import type { Job } from "../../../types/job";
import { removeDate, removeTime } from "../../../utils/dateconverUtils";
import { formatOrderItems } from "../../../utils/formatOrderItems";

interface JobHistoryCardsProps {
  jobs: Job[];
}

export default function JobHistoryCardList({ jobs }: JobHistoryCardsProps) {
  return (
    <div className="block md:hidden space-y-4 p-4">
      {jobs.map((job) => (
        <div
          key={job.jobId}
          className="flex flex-col gap-1.5 border border-[#BAD6F5] hover:border-claundry-blue rounded-lg p-4 shadow-sm transition-colors"
        >
          <p className="text-claundry-blue font-semibold text-xs mb-0.5">
            #{job.jobId}
          </p>
          <p className="text-xs text-gray-600">
            Date: {removeTime(job.createdAt)}
          </p>
          <p className="text-xs text-gray-600">
            Start: {removeDate(job.startTime)}
          </p>
          <p className="text-xs text-gray-600">
            End: {removeDate(job.endTime)}
          </p>
          <p className="text-xs text-gray-600">Station: {job.station}</p>
          <p className="text-xs text-gray-600">
            Items: {formatOrderItems(job.orderItems)}
          </p>
        </div>
      ))}
    </div>
  );
}
