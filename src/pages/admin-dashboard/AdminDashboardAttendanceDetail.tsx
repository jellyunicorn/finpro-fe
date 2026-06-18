import { useState } from "react";
import { useParams } from "react-router";
import AttendanceFilterFormLarge from "../../components/admin-dashboard/AttendanceFilterFormLarge";
import AttendanceList from "../../components/AttendanceList";
import Pagination from "../../components/Pagination";
import useGetEmployeeAttendance from "../../hooks/admin/useGetEmployeeAttendance";
import type { AttendanceFilterSchema } from "../../schemas/attendanceFilterSchema";

export default function AdminDashboardAttendanceDetail() {
  const { id } = useParams();
  const numericId = Number(id);
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState<AttendanceFilterSchema>({});

  const { data: attendanceLog, isLoading } = useGetEmployeeAttendance(
    numericId,
    page,
    filters.startDate ?? undefined,
    filters.endDate ?? undefined,
    10,
  );

  const handleFilterSubmit = (data: AttendanceFilterSchema) => {
    setPage(1);
    setFilters(data);
  };

  const clearFilters = () => {
    setFilters({});
    setPage(1);
  };

  return (
    <div className="bg-white shadow rounded-lg p-4 m-4">
      <h3 className="text-md font-semibold text-gray-700 mb-4">
        {attendanceLog?.data.employeeName}'s Attendance History
      </h3>

      {attendanceLog && (
        <AttendanceFilterFormLarge
          onSubmit={handleFilterSubmit}
          onClear={clearFilters}
        />
      )}

      {isLoading ? (
        <p className="text-gray-500 text-sm">Loading...</p>
      ) : attendanceLog?.data.attendance &&
        attendanceLog.data.attendance.length > 0 ? (
        <>
          <AttendanceList data={attendanceLog.data.attendance} />
          <Pagination
            currentPage={attendanceLog.meta.page}
            totalPages={Math.ceil(
              attendanceLog.meta.total / attendanceLog.meta.take,
            )}
            onPageChange={(pg) => setPage(pg)}
          />
        </>
      ) : (
        <p className="text-gray-500 text-sm">No attendance records yet.</p>
      )}
    </div>
  );
}
