import { useState } from "react";
import useClockIn from "../../hooks/employee/useClockIn";
import useClockOut from "../../hooks/employee/useClockOut";
import useGetAttendanceLog from "../../hooks/employee/useGetAttendanceLog";
import { cloudimages } from "../../lib/cloudinary";
import { todaysdate } from "../../utils/todaysdateUtils";
import Pagination from "../../components/Pagination";
import type { Attendance } from "../../types/attendance";

export default function DriverDashboardMain() {
  const [page, setPage] = useState(1);
  const { mutateAsync: clockInMutation } = useClockIn();
  const { mutateAsync: clockOutMutation } = useClockOut();
  const { data: attendanceLog, isLoading } = useGetAttendanceLog(page);

  const handleClockIn = async () => {
    await clockInMutation();
  };

  const handleClockOut = async () => {
    await clockOutMutation();
  };

  return (
    <div className="p-6 flex flex-col gap-6 mt-4">
      <div className="h-50  w-full z-2 relative flex flex-col gap-1  p-10 items-center justify-center">
        <p>{todaysdate}</p>
        <h1 className="text-4xl z-2 text-claundry-blue max-w-150 text-center">
          Hallo Drivers!
        </h1>
        <div className="flex gap-4 items-center justify-center mt-6">
          <button
            onClick={handleClockIn}
            className="px-4 py-2 rounded bg-blue-600 hover:bg-blue-700 text-white transition"
          >
            Clock In
          </button>
          <button
            onClick={handleClockOut}
            className="px-4 py-2 rounded border border-red-600 hover:bg-red-600 text-red-600 hover:text-white transition"
          >
            Clock Out
          </button>
        </div>
        <img
          src={cloudimages.dashboard_img}
          alt=""
          className="h-full absolute right-0 mr-10"
        />
      </div>

      <div className="bg-white shadow rounded-lg p-4">
        <h3 className="text-md font-semibold text-gray-700 mb-4">
          Attendance History
        </h3>
        {isLoading ? (
          <p className="text-gray-500 text-sm">Loading...</p>
        ) : attendanceLog && attendanceLog.data.length > 0 ? (
          <ul className="space-y-2 text-gray-600 text-sm">
            {attendanceLog.data.map((entry: Attendance) => (
              <li key={entry.id} className="grid grid-cols-4 gap-2">
                <span>{new Date(entry.startTime).toLocaleString()}</span>
                <span className="text-green-600 font-medium">Clock In</span>
                {entry.endTime ? (
                  <>
                    <span>{new Date(entry.endTime).toLocaleString()}</span>
                    <span className="text-red-600 font-medium">Clock Out</span>
                  </>
                ) : (
                  <>
                    <span className="col-span-2 text-gray-400 italic">
                      Clocked in
                    </span>
                  </>
                )}
              </li>
            ))}
            <Pagination
              currentPage={attendanceLog.meta.page}
              totalPages={Math.ceil(
                attendanceLog.meta.total / attendanceLog.meta.take,
              )}
              onPageChange={(pg) => setPage(pg)}
            />
          </ul>
        ) : (
          <p className="text-gray-500 text-sm">No attendance records yet.</p>
        )}
      </div>
    </div>
  );
}
