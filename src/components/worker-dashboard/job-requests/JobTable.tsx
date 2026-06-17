import type { AvailableJob } from "../../../types/availableJob";
import { removeDate, removeTime } from "../../../utils/dateconverUtils";

interface JobTableProps {
  jobs: AvailableJob[];
  onAccept: (job: AvailableJob) => void;
}

export default function JobTable({ jobs, onAccept }: JobTableProps) {
  return (
    <div className="overflow-x-auto hidden sm:block">
      <table className="w-full text-left border-collapse min-w-150px">
        <thead className="bg-[#BAD6F5] text-claundry-blue sticky top-0">
          <tr>
            <th className="p-4">Job ID</th>
            <th className="p-4">Station</th>
            <th className="p-4">Date</th>
            <th className="p-4">Time Created</th>
            <th className="p-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {jobs.map((job, idx) => (
            <tr
              key={job.jobId}
              className={`border-t transition-colors ${
                idx % 2 === 0 ? "bg-white" : "bg-gray-50"
              } hover:bg-[#F3F8FE]`}
            >
              <td className="p-4 font-medium text-claundry-blue">
                {job.jobId}
              </td>
              <td className="p-4">{job.station}</td>
              <td className="p-4">{removeTime(job.createdAt)}</td>
              <td className="p-4">{removeDate(job.createdAt)}</td>
              <td className="p-4">
                <button
                  onClick={() => onAccept(job)}
                  className="px-3 py-1 rounded text-sm bg-claundry-blue text-white hover:bg-blue-700 transition"
                >
                  Accept
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
