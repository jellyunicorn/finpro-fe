import { useState } from "react";
import LoadingSpinner from "../../components/LoadingSpinner";
import Pagination from "../../components/Pagination";
import AttendanceList from "../../components/AttendanceList";
import useClockIn from "../../hooks/employee/useClockIn";
import useClockOut from "../../hooks/employee/useClockOut";
import useGetAttendanceLog from "../../hooks/employee/useGetAttendanceLog";
import { cloudimages } from "../../lib/cloudinary";
import { useLoginStore } from "../../store/useAppStore";
import { todaysdate } from "../../utils/todaysdateUtils";
import type { AttendanceFilterSchema } from "../../schemas/attendanceFilterSchema";
import AttendanceFilterForm from "../../components/AttendanceFilterForm";

export default function WorkerDashboardMain() {
  const { user } = useLoginStore();
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState<AttendanceFilterSchema>({});
  const { mutateAsync: clockInMutation } = useClockIn();
  const { mutateAsync: clockOutMutation } = useClockOut();
  const { data: attendanceLog, isLoading } = useGetAttendanceLog(
    page,
    filters.startDate ?? undefined,
    filters.endDate ?? undefined,
    10
  );

  const handleClockIn = async () => await clockInMutation();
  const handleClockOut = async () => await clockOutMutation();

  const handleFilterSubmit = (data: AttendanceFilterSchema) => {
    setPage(1);
    setFilters(data);
  };

  const clearFilters = () => {
    setFilters({});
    setPage(1);
  };

  return (
    <div className="p-4 sm:p-6 flex flex-col gap-6 mt-4">
      <div className="relative flex flex-col items-center justify-center gap-4 p-6 sm:p-10 bg-gray-50 rounded-lg">
        <p className="text-sm sm:text-base">{todaysdate}</p>
        <h1 className="text-2xl sm:text-4xl text-claundry-blue text-center">
          Hello, {user?.fullName}
        </h1>
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-center mt-4 sm:mt-6 w-full sm:w-auto">
          <button
            onClick={handleClockIn}
            className="w-full sm:w-auto px-4 py-2 rounded bg-claundry-blue hover:bg-blue-700 text-white transition"
          >
            Clock In
          </button>
          <button
            onClick={handleClockOut}
            className="w-full sm:w-auto px-4 py-2 rounded border border-red-600 hover:bg-red-600 text-red-600 hover:text-white transition"
          >
            Clock Out
          </button>
        </div>
        <img
          src={cloudimages.dashboard_img}
          alt="Dashboard illustration"
          className="hidden lg:block absolute right-0 top-0 h-full max-h-64 object-contain mr-6"
        />
      </div>

      <div className="flex justify-center">
        <div className="bg-white shadow rounded-lg p-4 w-full lg:w-[60%]">
          <h3 className="text-md font-semibold text-gray-700 mb-4">
            Attendance History
          </h3>

          {attendanceLog && (
            <AttendanceFilterForm
              onSubmit={handleFilterSubmit}
              onClear={clearFilters}
            />
          )}

          {isLoading ? (
            <p className="flex justify-center">
              <LoadingSpinner />
            </p>
          ) : attendanceLog && attendanceLog.data.length > 0 ? (
            <>
              <AttendanceList data={attendanceLog.data} />
              <Pagination
                currentPage={attendanceLog.meta.page}
                totalPages={Math.ceil(
                  attendanceLog.meta.total / attendanceLog.meta.take
                )}
                onPageChange={(pg) => setPage(pg)}
              />
            </>
          ) : (
            <p className="text-gray-500 text-sm">No attendance records yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}
