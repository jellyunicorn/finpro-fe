import type { Attendance } from "../types/attendance";
import { formatAttendanceType } from "../utils/attendanceHelper";

interface AttendanceListProps {
  data: Attendance[];
}

export default function AttendanceList({ data }: AttendanceListProps) {
  return (
    <ul className="space-y-2 text-gray-600 text-sm">
      {data.map((entry: Attendance) => {
        const { label, className } = formatAttendanceType(entry.type);
        return (
          <li key={entry.id} className="grid grid-cols-2 gap-2 border-b pb-2">
            <span>{new Date(entry.startTime).toLocaleString()}</span>
            <span className={className}>{label}</span>
          </li>
        );
      })}
    </ul>
  );
}
