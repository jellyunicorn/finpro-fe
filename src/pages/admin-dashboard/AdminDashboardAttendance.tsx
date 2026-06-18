import { useState } from "react";
import Pagination from "../../components/Pagination";
import useGetOutletAttendance from "../../hooks/admin/useGetOutletAttendance";
import AttendanceTable from "../../components/admin-dashboard/AttendanceTable";

export default function AdminDashboardAttendance() {
  const [page, setPage] = useState(1);
  const [expandedEmployee, setExpandedEmployee] = useState<number | null>(null);

  const { data: reportData } = useGetOutletAttendance(page);

  const toggleEmployee = (id: number) => {
    setExpandedEmployee(expandedEmployee === id ? null : id);
  };

  return (
    <div className="p-8 font-dmsans">
      <h1 className="text-2xl font-semibold text-claundry-blue mb-6">
        Attendance Report
      </h1>
      <div className="w-full bg-white shadow rounded-lg border border-[#BAD6F5] pb-4">
        {reportData?.data && (
          <AttendanceTable
            employees={reportData.data}
            expandedEmployee={expandedEmployee}
            onToggle={toggleEmployee}
          />
        )}

        {reportData && reportData.data.length > 0 && (
          <Pagination
            currentPage={reportData.meta.page}
            totalPages={Math.ceil(reportData.meta.total / reportData.meta.take)}
            onPageChange={(pg) => setPage(pg)}
          />
        )}
      </div>
    </div>
  );
}
