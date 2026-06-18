import { useState } from "react";
import type { Job } from "../../types/job";
import type { OrderItem } from "../../types/orderItem";
import useGetActiveJobs from "../../hooks/worker/useGetActiveJobs";
import { useBeginJob } from "../../hooks/worker/useBeginJob";
import { useFinishJob } from "../../hooks/worker/useFinishJob";
import StationFilterTabs from "../../components/worker-dashboard/active-jobs/StationFilterTabs";
import LoadingSpinner from "../../components/LoadingSpinner";
import JobsTable from "../../components/worker-dashboard/active-jobs/JobsTable";
import Pagination from "../../components/Pagination";
import CompleteJobPopup from "../../components/worker-dashboard/active-jobs/CompleteJobPopup";
import BeginNextJobPopup from "../../components/worker-dashboard/active-jobs/BeginNextJobPopup";
import InputQuantitiesPopup from "../../components/worker-dashboard/active-jobs/InputQuantitiesPopup";
import ReviewInputQuantitiesPopup from "../../components/worker-dashboard/active-jobs/ReviewInputQuantitiesPopup";
import WorkerDashboardOpenOrders from "./WorkerDashboardOpenOrders";

export default function WorkerDashboardOrders() {
  const stations = ["WASHING", "IRONING", "PACKING"];

  const [page, setPage] = useState(1);
  const [currentStation, setCurrentStation] = useState<string | null>(null);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [nextJob, setNextJob] = useState<Job | null>(null);
  const [pendingItems, setPendingItems] = useState<OrderItem[]>([]);

  const [openCompletePopup, setOpenCompletePopup] = useState(false);
  const [openBeginNextPopup, setOpenBeginNextPopup] = useState(false);
  const [openInputPopup, setOpenInputPopup] = useState(false);
  const [openReviewPopup, setOpenReviewPopup] = useState(false);

  const { data: activeJobs, isLoading } = useGetActiveJobs(page);
  const { mutateAsync: beginJob, isPending: beginJobPending } = useBeginJob();
  const { mutateAsync: finishJob, isPending: finishJobPending } =
    useFinishJob();

  const handleCompleteClick = (job: Job) => {
    setSelectedJob(job);
    setOpenCompletePopup(true);
  };

  const handleFinishYesClick = async () => {
    if (!selectedJob) return;
    await finishJob(
      { jobId: selectedJob.jobId },
      {
        onSuccess: (data) => {
          setOpenCompletePopup(false);
          if (selectedJob.station !== "PACKING") {
            setNextJob(data.job);
            setOpenBeginNextPopup(true);
          }
        },
        onError: () => {
          setOpenCompletePopup(false);
        },
      },
    );
  };

  const handleBeginYesClick = () => {
    setOpenBeginNextPopup(false);
    setOpenInputPopup(true);
  };

  const handleSubmitJob = (values: { items: OrderItem[] }) => {
    setPendingItems(values.items);
    setOpenInputPopup(false);
    setOpenReviewPopup(true);
  };

  const handleConfirmJob = async () => {
    if (!nextJob) return;
    const items = pendingItems.map((item) => ({
      itemId: item.id,
      quantity: item.quantity,
    }));
    await beginJob({ jobId: nextJob.jobId, items });
    setOpenReviewPopup(false);
    setPendingItems([]);
    setNextJob(null);
  };

  const filteredJobs =
    activeJobs?.data.filter((job) =>
      currentStation ? job.station === currentStation : true,
    ) ?? [];

  return (
    <>
      <WorkerDashboardOpenOrders />
      <div className="p-4 md:p-8 font-dmsans">
        <h1 className="text-xl md:text-2xl font-semibold text-claundry-blue mb-4 md:mb-6">
          Active Jobs
        </h1>

        <StationFilterTabs
          stations={stations}
          currentStation={currentStation}
          onSelectStation={setCurrentStation}
        />

        {isLoading && (
          <div className="flex justify-center items-center">
            <LoadingSpinner />
          </div>
        )}

        {!isLoading && filteredJobs.length === 0 && (
          <div className="p-6 text-center text-gray-500">
            No active jobs found.
          </div>
        )}

        {!isLoading && filteredJobs.length > 0 && (
          <div className="bg-white shadow rounded-lg border border-[#BAD6F5] pb-4">
            <JobsTable
              jobs={filteredJobs}
              onCompleteClick={handleCompleteClick}
            />

            {activeJobs && (
              <Pagination
                currentPage={activeJobs.meta.page}
                totalPages={Math.ceil(
                  activeJobs.meta.total / activeJobs.meta.take,
                )}
                onPageChange={(pg) => setPage(pg)}
              />
            )}
          </div>
        )}

        <CompleteJobPopup
          isOpen={openCompletePopup}
          onClose={() => setOpenCompletePopup(false)}
          onConfirm={handleFinishYesClick}
          isPending={finishJobPending}
        />

        <BeginNextJobPopup
          isOpen={openBeginNextPopup}
          onClose={() => setOpenBeginNextPopup(false)}
          onConfirm={handleBeginYesClick}
        />

        <InputQuantitiesPopup
          isOpen={openInputPopup}
          onClose={() => setOpenInputPopup(false)}
          selectedJob={selectedJob}
          onSubmit={handleSubmitJob}
        />

        <ReviewInputQuantitiesPopup
          isOpen={openReviewPopup}
          onClose={() => setOpenReviewPopup(false)}
          onBack={() => {
            setOpenReviewPopup(false);
            setOpenInputPopup(true);
          }}
          onConfirm={handleConfirmJob}
          nextJob={nextJob}
          pendingItems={pendingItems}
          isPending={beginJobPending}
        />
      </div>
    </>
  );
}
