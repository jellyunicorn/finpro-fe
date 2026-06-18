import type { Attendance } from "../types/attendance";

interface AttendanceListProps {
  data: Attendance[];
}

const formatType = (type: string) => {
  switch (type) {
    case "CLOCK_IN":
      return { label: "Clock In", className: "text-claundry-blue font-semibold" };
    case "CLOCK_OUT":
      return { label: "Clock Out", className: "text-red-600 font-semibold" };
    default:
      return { label: type, className: "text-gray-600" };
  }
};

export default function AttendanceList({ data }: AttendanceListProps) {
  return (
    <ul className="space-y-2 text-gray-600 text-sm">
      {data.map((entry: Attendance) => {
        const { label, className } = formatType(entry.type);
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
