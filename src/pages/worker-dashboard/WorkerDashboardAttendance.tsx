import { useState } from "react";
import Pagination from "../../components/Pagination";
import useClockIn from "../../hooks/useClockIn";
import useClockOut from "../../hooks/useClockOut";
import useGetAttendanceLog from "../../hooks/useGetAttendanceLog";

export default function WorkerDashboardAttendance() {
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
    <div className="p-6">
      <div className="bg-white shadow rounded-lg p-4 mb-6 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-700">Attendance</h2>
        <div className="space-x-2">
          <button
            onClick={handleClockIn}
            className="px-4 py-2 rounded bg-blue-600 hover:bg-blue-700 text-white transition"
          >
            Clock In
          </button>
          <button
            onClick={handleClockOut}
            className="px-4 py-2 rounded bg-red-600 hover:bg-red-700 text-white transition"
          >
            Clock Out
          </button>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg p-4">
        <h3 className="text-md font-semibold text-gray-700 mb-4">
          Attendance History
        </h3>
        {isLoading ? (
          <p className="text-gray-500 text-sm">Loading...</p>
        ) : attendanceLog && attendanceLog.data.length > 0 ? (
          <ul className="space-y-2 text-gray-600 text-sm">
            {attendanceLog.data.map((entry: any) => (
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
