import type { Job } from "../../../types/job";
import { removeDate, removeTime } from "../../../utils/dateconverUtils";
import { formatOrderItems } from "../../../utils/formatOrderItems";

interface JobHistoryTableProps {
  jobs: Job[];
}

export default function JobHistoryTable({ jobs }: JobHistoryTableProps) {
  return (
    <div className="hidden md:block overflow-x-auto rounded-lg">
      <table className="w-full text-left border-collapse">
        <thead className="bg-[#BAD6F5] text-claundry-blue">
          <tr>
            <th className="p-4">Order ID</th>
            <th className="p-4">Items</th>
            <th className="p-4">Station</th>
            <th className="p-4">Date</th>
            <th className="p-4">Start Time</th>
            <th className="p-4">End Time</th>
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
              <td className="p-4">{formatOrderItems(job.orderItems)}</td>
              <td className="p-4">{job.station}</td>
              <td className="p-4 text-sm text-gray-600">
                {removeTime(job.startTime)}
              </td>
              <td className="p-4 text-sm text-gray-600">
                {removeDate(job.startTime)}
              </td>
              <td className="p-4 text-sm text-gray-600">
                {removeDate(job.endTime)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
