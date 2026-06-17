import { useState } from "react";
import { useParams } from "react-router";
import Pagination from "../../components/Pagination";
import useGetEmployeeAttendance from "../../hooks/useGetEmployeeAttendance";

export default function AdminDashboardAttendanceDetail() {
  const { id } = useParams();
  const numericId = Number(id);
  const [page, setPage] = useState(1);
  const { data: attendanceLog, isLoading } = useGetEmployeeAttendance(
    numericId,
    page,
  );
  return (
    <div className="bg-white shadow rounded-lg p-4 m-4">
      <h3 className="text-md font-semibold text-gray-700 mb-4">
        {attendanceLog?.data.employeeName}'s Attendance History
      </h3>
      {isLoading ? (
        <p className="text-gray-500 text-sm">Loading...</p>
      ) : attendanceLog.data.attendance &&
        attendanceLog.data.attendance.length > 0 ? (
        <ul className="space-y-2 text-gray-600 text-sm">
          {attendanceLog.data.attendance.map((entry: any) => (
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
  );
}
