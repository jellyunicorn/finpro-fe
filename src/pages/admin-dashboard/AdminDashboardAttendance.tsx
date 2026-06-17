import React, { useState } from "react";
import Pagination from "../../components/Pagination";
import useGetOutletAttendance from "../../hooks/useGetOutletAttendance";
import { Link } from "react-router";

export default function AdminDashboardAttendance() {
  const [page, setPage] = useState(1);
  const [expandedEmployee, setExpandedEmployee] = useState<number | null>(null);

  const { data: reportData } = useGetOutletAttendance(page);

  const toggleEmployee = (id: number) => {
    setExpandedEmployee(expandedEmployee === id ? null : id);
  };

  return (
    <div className="p-8 font-dmsans">
      <div className="w-full bg-white shadow rounded-lg border border-[#BAD6F5] pb-4">
        <h1 className="text-2xl font-semibold text-claundry-blue mb-6 p-4">
          Attendance Report
        </h1>

        <table className="w-full text-left border-collapse">
          <thead className="bg-[#BAD6F5] text-claundry-blue">
            <tr>
              <th className="p-4">Employee</th>
              <th className="p-4">Total Days</th>
              <th className="p-4">Details</th>
            </tr>
          </thead>
          <tbody>
            {reportData?.data.map((employee: any) => {
              const isExpanded = expandedEmployee === employee.id;

              return (
                <React.Fragment key={employee.id}>
                  <tr className="border-t hover:bg-[#F3F8FE] transition-colors">
                    <td className="p-4 font-medium text-claundry-blue">
                      <Link to={`${employee.id}`}>{employee.fullName}</Link>
                    </td>
                    <td className="p-4 text-sm text-gray-600">
                      {employee.attendance.length}
                    </td>
                    <td className="p-4">
                      <button
                        onClick={() => toggleEmployee(employee.id)}
                        className="p-1 rounded transition-transform duration-300"
                      >
                        <span
                          className={`inline-block transform transition-transform duration-300 ${
                            isExpanded ? "-rotate-90" : "rotate-90"
                          }`}
                        >
                          &gt;
                        </span>
                      </button>
                    </td>
                  </tr>

                  {isExpanded && (
                    <tr className="bg-[#F9FCFF]">
                      <td colSpan={3} className="p-4 text-sm text-gray-700">
                        <table className="w-full text-left border-collapse">
                          <thead className="text-claundry-blue">
                            <tr>
                              <th className="p-2">Date</th>
                              <th className="p-2">Check-In</th>
                              <th className="p-2">Check-Out</th>
                            </tr>
                          </thead>
                          <tbody>
                            {employee.attendance.map((log: any) => (
                              <tr key={log.id} className="border-t">
                                <td className="p-2">
                                  {new Date(log.startTime).toLocaleDateString()}
                                </td>
                                <td className="p-2">
                                  {new Date(log.startTime).toLocaleTimeString()}
                                </td>
                                <td className="p-2">
                                  {log.endTime
                                    ? new Date(log.endTime).toLocaleTimeString()
                                    : "-"}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              );
            })}
          </tbody>
        </table>

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
