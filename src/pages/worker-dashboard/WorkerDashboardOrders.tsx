import { useState } from "react";
import useGetActiveJobs from "../../hooks/useGetActiveJobs";
import { removeDate, removeTime } from "../../utils/dateconverUtils";
import type { Job } from "../../types/job";
import Pagination from "../../components/Pagination";
import Popup from "../../components/Popup";
import { useFinishJob } from "../../hooks/useFinishJob";
import { useBeginJob } from "../../hooks/useBeginJob";
import toast from "react-hot-toast";
import ConfirmItemsForm from "../../components/worker-dashboard/ConfirmItemsForm";

export default function WorkerDashboardOrders() {
  const stations = ["WASHING", "IRONING", "PACKING"];
  const [openCompletePopup, setOpenCompletePopup] = useState(false);
  const [openBeginNextPopup, setOpenBeginNextPopup] = useState(false);
  const [openInputPopup, setOpenInputPopup] = useState(false);
  const [page, setPage] = useState(1);
  const { data: activeJobs } = useGetActiveJobs(page);
  const { mutate: beginJob } = useBeginJob();
  const { mutate: finishJob } = useFinishJob();

  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [nextJob, setNextJob] = useState<Job | null>(null);
  const [currentStation, setCurrentStation] = useState<string | null>(null);

  const handleCompleteClick = (job: Job) => {
    setSelectedJob(job);
    setOpenCompletePopup(true);
  };

  const handleFinishYesClick = () => {
    if (!selectedJob) return;
    finishJob(
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

  const handleSubmitJob = (values: {
    items: { id: number; quantity: number }[];
  }) => {
    if (!nextJob) return;

    const items = values.items.map((i) => ({
      itemId: i.id,
      quantity: i.quantity,
    }));

    beginJob({ jobId: nextJob.jobId, items });

    setOpenInputPopup(false);
  };

  const filteredJobs =
    activeJobs?.data.filter((job) =>
      currentStation ? job.station === currentStation : true,
    ) ?? [];

  return (
    <div className="p-8 font-dmsans">
      <h1 className="text-2xl font-semibold text-claundry-blue mb-6">
        Active Jobs
      </h1>

      <div className="flex gap-4 mb-6">
        {stations.map((station) => (
          <button
            key={station}
            onClick={() =>
              setCurrentStation(currentStation === station ? null : station)
            }
            className={`px-4 py-2 rounded ${
              currentStation === station
                ? "bg-claundry-blue text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            {station}
          </button>
        ))}

        {currentStation && (
          <button
            onClick={() => setCurrentStation(null)}
            className="px-4 py-2 rounded bg-red-200 text-red-700 hover:bg-red-300"
          >
            Clear Filter
          </button>
        )}
      </div>

      <div className="bg-white shadow rounded-lg border border-[#BAD6F5] pb-4">
        <table className="w-full text-left border-collapse">
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
            {filteredJobs.map((job) => (
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
                    onClick={() => handleCompleteClick(job)}
                    className="px-3 py-1 rounded text-sm bg-claundry-blue text-white hover:bg-blue-700"
                  >
                    Mark Complete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {activeJobs && (
          <Pagination
            currentPage={activeJobs.meta.page}
            totalPages={Math.ceil(activeJobs.meta.total / activeJobs.meta.take)}
            onPageChange={(pg) => setPage(pg)}
          />
        )}
      </div>

      {/** popups */}
      {selectedJob && (
        <Popup
          open={openCompletePopup}
          onClose={() => setOpenCompletePopup(false)}
        >
          <div className="p-2">
            <p className="mb-4 text-lg font-medium">
              Mark this job as complete?
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={handleFinishYesClick}
                className="px-4 py-1 bg-claundry-blue text-white rounded"
              >
                Yes
              </button>
              <button
                onClick={() => setOpenCompletePopup(false)}
                className="px-4 py-1 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 transition"
              >
                No
              </button>
            </div>
          </div>
        </Popup>
      )}
      {selectedJob && (
        <Popup
          open={openBeginNextPopup}
          onClose={() => setOpenBeginNextPopup(false)}
        >
          <div className="p-2">
            <p className="mb-4 text-lg font-medium">
              Do you want to immediately begin the next job?
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={handleBeginYesClick}
                className="px-4 py-1 bg-claundry-blue text-white rounded"
              >
                Yes
              </button>
              <button
                onClick={() => setOpenBeginNextPopup(false)}
                className="px-4 py-1 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 transition"
              >
                No
              </button>
            </div>
          </div>
        </Popup>
      )}
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
