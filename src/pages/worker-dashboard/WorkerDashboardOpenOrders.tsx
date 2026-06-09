import { useState } from "react";
import useGetAvailableJobs from "../../hooks/useGetAvailableJobs";
import type { AvailableJob } from "../../types/availableJob";
import { removeDate, removeTime } from "../../utils/dateconverUtils";
import Popup from "../../components/Popup";
import Pagination from "../../components/Pagination";
import ConfirmItemsForm from "../../components/worker-dashboard/ConfirmItemsForm";
import { useBeginJob } from "../../hooks/useBeginJob";

export default function WorkerDashboardOpenOrders() {
  const [openInputPopup, setOpenInputPopup] = useState(false);
  const [selectedJob, setSelectedJob] = useState<AvailableJob | null>(null);
  const [page, setPage] = useState(1);
  const { data: availableJobs } = useGetAvailableJobs(page);
  const { mutate: beginJob } = useBeginJob();

  const handleAcceptClick = (job: AvailableJob) => {
    setSelectedJob(job);
    setOpenInputPopup(true);
  };

  const handleSubmitJob = (values: {
    items: { id: number; quantity: number }[];
  }) => {
    if (!selectedJob) return;

    const items = values.items.map((i) => ({
      itemId: i.id,
      quantity: i.quantity,
    }));

    beginJob({ jobId: selectedJob.jobId, items });

    setOpenInputPopup(false);
  };

  return (
    <div className="p-8 font-dmsans">
      <h1 className="text-2xl font-semibold text-claundry-blue mb-6">
        Open Jobs
      </h1>

      <div className="bg-white shadow rounded-lg border border-[#BAD6F5] pb-3">
        <table className="w-full text-left border-collapse">
          <thead className="bg-[#BAD6F5] text-claundry-blue">
            <tr>
              <th className="p-4">Job ID</th>
              <th className="p-4">Station</th>
              <th className="p-4">Date</th>
              <th className="p-4">Time Created</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {availableJobs &&
              availableJobs.data.map((job: AvailableJob) => (
                <tr
                  key={job.jobId}
                  className="border-t hover:bg-[#F3F8FE] transition-colors"
                >
                  <td className="p-4 font-medium text-claundry-blue">
                    {job.jobId}
                  </td>
                  <td className="p-4">{job.station}</td>
                  <td className="p-4">{removeTime(job.createdAt)}</td>
                  <td className="p-4">{removeDate(job.createdAt)}</td>
                  <td className="p-4">
                    <button
                      onClick={() => handleAcceptClick(job)}
                      className="px-3 py-1 rounded text-sm bg-claundry-blue text-white hover:bg-blue-700"
                    >
                      Accept
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        {availableJobs && (
          <Pagination
            currentPage={availableJobs.meta.page}
            totalPages={Math.ceil(
              availableJobs.meta.total / availableJobs.meta.take,
            )}
            onPageChange={(pg) => setPage(pg)}
          />
        )}
      </div>

      {selectedJob && (
        <Popup open={openInputPopup} onClose={() => setOpenInputPopup(false)}>
          <p className="absolute top-1 left-1 p-2">
            Please input item quantities
          </p>
          <ConfirmItemsForm
            orderItems={{ items: selectedJob.orderItems }}
            onSubmit={handleSubmitJob}
          />
        </Popup>
      )}
    </div>
  );
}
