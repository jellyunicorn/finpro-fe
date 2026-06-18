import type { AvailableJob } from "../../../types/availableJob";
import { removeDate, removeTime } from "../../../utils/dateconverUtils";

interface JobCardListProps {
  jobs: AvailableJob[];
  onAccept: (job: AvailableJob) => void;
}

export default function JobCardList({ jobs, onAccept }: JobCardListProps) {
  return (
    <div className="sm:hidden space-y-4 p-4">
      {jobs.map((job) => (
        <div key={job.jobId} className="p-4 border rounded shadow-sm bg-white">
          <p className="font-semibold text-claundry-blue">Job #{job.jobId}</p>
          <p>Station: {job.station}</p>
          <p>Date: {removeTime(job.createdAt)}</p>
          <p>Time: {removeDate(job.createdAt)}</p>
          <button
            onClick={() => onAccept(job)}
            className="mt-2 w-full px-3 py-1 rounded text-sm bg-claundry-blue text-white hover:bg-blue-700 transition"
          >
            Accept
          </button>
        </div>
      ))}
    </div>
  );
}
