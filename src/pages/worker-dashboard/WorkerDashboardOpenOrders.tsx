import { useState } from "react";
import useGetAvailableJobs from "../../hooks/useGetAvailableJobs";
import { useBeginJob } from "../../hooks/useBeginJob";
import type { AvailableJob } from "../../types/availableJob";
import type { OrderItem } from "../../types/orderItem";
import Pagination from "../../components/Pagination";
import JobTable from "../../components/worker-dashboard/job-requests/JobTable";
import JobCardList from "../../components/worker-dashboard/job-requests/JobCardList";
import JobInputPopup from "../../components/worker-dashboard/job-requests/JobInputPopup";
import JobReviewPopup from "../../components/worker-dashboard/job-requests/JobReviewPopup";
import LoadingSpinner from "../../components/LoadingSpinner";

export default function WorkerDashboardOpenOrders() {
  const [openInputPopup, setOpenInputPopup] = useState(false);
  const [openReviewPopup, setOpenReviewPopup] = useState(false);
  const [selectedJob, setSelectedJob] = useState<AvailableJob | null>(null);
  const [pendingItems, setPendingItems] = useState<OrderItem[]>([]);
  const [page, setPage] = useState(1);

  const { data: availableJobs, isLoading } = useGetAvailableJobs(page);
  const { mutateAsync: beginJob } = useBeginJob();

  const handleAcceptClick = (job: AvailableJob) => {
    setSelectedJob(job);
    setOpenInputPopup(true);
  };

  const handleSubmitItems = (values: { items: OrderItem[] }) => {
    setPendingItems(values.items);
    setOpenInputPopup(false);
    setOpenReviewPopup(true);
  };

  const handleConfirmJob = async () => {
    if (!selectedJob) return;

    const items = pendingItems.map((item) => ({
      itemId: item.id,
      quantity: item.quantity,
    }));

    await beginJob({ jobId: selectedJob.jobId, items });

    setOpenReviewPopup(false);
    setSelectedJob(null);
    setPendingItems([]);
  };

  return (
    <div className="p-6 sm:p-8 font-dmsans">
      <h1 className="text-xl sm:text-2xl font-semibold text-claundry-blue mb-6">
        Open Jobs
      </h1>

      <p className="text-gray-500">
        No jobs available at the moment.
      </p>

      {isLoading && (
        <div className="flex items-center justify-center">
          <LoadingSpinner />
        </div>
      )}

      {availableJobs && availableJobs.data.length > 0 && (
        <div className="bg-white shadow rounded-lg border border-[#BAD6F5] pb-3">
          <JobTable jobs={availableJobs.data} onAccept={handleAcceptClick} />
          <JobCardList jobs={availableJobs.data} onAccept={handleAcceptClick} />
          <Pagination
            currentPage={availableJobs.meta.page}
            totalPages={Math.ceil(
              availableJobs.meta.total / availableJobs.meta.take,
            )}
            onPageChange={setPage}
          />
        </div>
      )}

      {selectedJob && (
        <JobInputPopup
          open={openInputPopup}
          job={selectedJob}
          onClose={() => setOpenInputPopup(false)}
          onSubmit={handleSubmitItems}
        />
      )}

      {selectedJob && (
        <JobReviewPopup
          open={openReviewPopup}
          job={selectedJob}
          items={pendingItems}
          onClose={() => setOpenReviewPopup(false)}
          onConfirm={handleConfirmJob}
          onBack={() => {
            setOpenReviewPopup(false);
            setOpenInputPopup(true);
          }}
        />
      )}
    </div>
  );
}
