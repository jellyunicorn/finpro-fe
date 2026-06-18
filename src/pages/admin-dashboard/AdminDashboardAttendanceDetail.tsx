import { useState } from "react";
import { useParams } from "react-router";
import Pagination from "../../components/Pagination";
import useGetEmployeeAttendance from "../../hooks/admin/useGetEmployeeAttendance";
import AttendanceList from "../../components/AttendanceList";

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
          <AttendanceList data={attendanceLog.data.attendance} />
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