import type { Job } from "../../../types/job";
import { removeDate, removeTime } from "../../../utils/dateconverUtils";

interface JobsTableProps {
  jobs: Job[];
  onCompleteClick: (job: Job) => void;
}

export default function JobsTable({ jobs, onCompleteClick }: JobsTableProps) {
  return (
    <>
      <div className="hidden md:block overflow-x-auto">
        <table className="min-w-full text-left border-collapse">
          <thead className="bg-[#BAD6F5] text-claundry-blue">
            <tr>
              <th className="p-4">Job ID</th>
              <th className="p-4">Date</th>
              <th className="p-4">Start Time</th>
              <th className="p-4">Station</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {jobs.map((job) => (
              <tr
                key={job.jobId}
                className="border-t hover:bg-[#F3F8FE] transition-colors"
              >
                <td className="p-4 font-medium text-claundry-blue">
                  {job.jobId}
                </td>
                <td className="p-4 text-sm text-gray-600">
                  {removeTime(job.createdAt)}
                </td>
                <td className="p-4 text-sm text-gray-600">
                  {removeDate(job.startTime)}
                </td>
                <td className="p-4 text-sm text-gray-600">{job.station}</td>
                <td className="p-4">
                  <button
                    onClick={() => onCompleteClick(job)}
                    className="px-3 py-1 rounded text-sm bg-claundry-blue text-white hover:bg-blue-700"
                  >
                    Mark Complete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

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
            <p className="text-xs text-gray-600">Station: {job.station}</p>
            <div className="mt-2">
              <button
                onClick={() => onCompleteClick(job)}
                className="w-full px-3 py-2 rounded text-sm bg-claundry-blue text-white hover:bg-blue-700"
              >
                Mark Complete
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}