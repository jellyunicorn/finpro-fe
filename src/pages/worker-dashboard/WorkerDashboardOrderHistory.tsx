import { useState } from "react";
import useGetJobHistory from "../../hooks/worker/useGetJobHistory";
import Pagination from "../../components/Pagination";
import LoadingSpinner from "../../components/LoadingSpinner";
import JobHistoryTable from "../../components/worker-dashboard/job-history/JobHistoryTable";
import JobHistoryCardList from "../../components/worker-dashboard/job-history/JobHistoryCards";
import type { JobHistoryFilterSchema } from "../../schemas/jobHistoryFilterSchema";
import JobHistoryFilterForm from "../../components/worker-dashboard/job-history/JobHistoryFilterForm";

export default function WorkerDashboardOrderHistory() {
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState<JobHistoryFilterSchema>({});

  const { data: jobHistory, isLoading } = useGetJobHistory(
    page,
    filters.startDate ?? undefined,
    filters.endDate ?? undefined,
    10,
  );

  const handleFilterSubmit = (data: JobHistoryFilterSchema) => {
    setPage(1);
    setFilters(data);
  };

  const clearFilters = () => {
    setFilters({});
    setPage(1);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center p-8">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="p-8 font-dmsans">
      <h1 className="text-2xl font-semibold text-claundry-blue mb-6">
        Job History
      </h1>

      {jobHistory && (
        <JobHistoryFilterForm
          onSubmit={handleFilterSubmit}
          onClear={clearFilters}
        />
      )}

      {jobHistory && jobHistory.data.length > 0 ? (
        <div className="bg-white shadow rounded-lg border border-[#BAD6F5] pb-4">
          <JobHistoryTable jobs={jobHistory.data} />
          <JobHistoryCardList jobs={jobHistory.data} />
          <Pagination
            currentPage={jobHistory.meta.page}
            totalPages={Math.ceil(jobHistory.meta.total / jobHistory.meta.take)}
            onPageChange={(pg) => setPage(pg)}
          />
        </div>
      ) : (
        <p className="p-4 text-gray-500 text-sm">Jobs not found.</p>
      )}
    </div>
  );
}
