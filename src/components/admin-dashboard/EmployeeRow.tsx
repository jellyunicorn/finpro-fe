// components/EmployeeRow.tsx
import { Link } from "react-router";
import type { EmployeeAttendance } from "../../types/employeeAttendance";
import AttendanceDropDown from "./AttendanceDropDown";

interface EmployeeRowProps {
  employee: EmployeeAttendance;
  isExpanded: boolean;
  onToggle: (id: number) => void;
}

export default function EmployeeRow({
  employee,
  isExpanded,
  onToggle,
}: EmployeeRowProps) {
  return (
    <>
      <tr className="border-t hover:bg-[#F3F8FE] transition-colors">
        <td className="p-4 font-medium text-claundry-blue">
          <Link to={`${employee.id}`}>{employee.fullName}</Link>
        </td>
        <td className="p-4 text-sm text-gray-600">
          {employee.attendance.length}
        </td>
        <td className="p-4">
          <button
            onClick={() => onToggle(employee.id)}
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
            <AttendanceDropDown attendance={employee.attendance} />
          </td>
        </tr>
      )}
    </>
  );
}
