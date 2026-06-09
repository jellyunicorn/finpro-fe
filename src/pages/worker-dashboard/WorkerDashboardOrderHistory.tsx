import { useState } from "react";
import useGetJobHistory from "../../hooks/useGetJobHistory";
import { formatOrderItems } from "../../utils/formatOrderItems";
import { removeDate, removeTime } from "../../utils/dateconverUtils";
import Pagination from "../../components/Pagination";

export default function WorkerDashboardOrderHistory() {
  const [page, setPage] = useState(1);
  const { data: jobHistory } = useGetJobHistory(page);

  return (
    <div className="p-8 font-dmsans">
      <h1 className="text-2xl font-semibold text-claundry-blue mb-6">
        Job History
      </h1>

      <div className="bg-white shadow rounded-lg border border-[#BAD6F5] pb-4">
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
            {jobHistory &&
              jobHistory.data.map((job) => (
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
                    {removeTime(job.createdAt)}
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
        {jobHistory && (
          <Pagination
            currentPage={jobHistory.meta.page}
            totalPages={Math.ceil(jobHistory.meta.total / jobHistory.meta.take)}
            onPageChange={(pg) => setPage(pg)}
          />
        )}
      </div>
    </div>
  );
}
