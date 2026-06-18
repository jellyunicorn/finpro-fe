import type { EmployeeAttendance } from "../../types/employeeAttendance";
import EmployeeRow from "./EmployeeRow";

interface AttendanceTableProps {
  employees: EmployeeAttendance[];
  expandedEmployee: number | null;
  onToggle: (id: number) => void;
}

export default function AttendanceTable({
  employees,
  expandedEmployee,
  onToggle,
}: AttendanceTableProps) {
  return (
    <table className="w-full text-left border-collapse">
      <thead className="bg-[#BAD6F5] text-claundry-blue">
        <tr>
          <th className="p-4">Employee</th>
          <th className="p-4">Total Days</th>
          <th className="p-4">Details</th>
        </tr>
      </thead>
      <tbody>
        {employees.map((employee) => (
          <EmployeeRow
            key={employee.id}
            employee={employee}
            isExpanded={expandedEmployee === employee.id}
            onToggle={onToggle}
          />
        ))}
      </tbody>
    </table>
  );
}
