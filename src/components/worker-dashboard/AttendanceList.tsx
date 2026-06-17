import type { Attendance } from "../../types/attendance";

interface AttendanceListProps {
  data: Attendance[];
}

export default function AttendanceList({ data }: AttendanceListProps) {
  return (
    <ul className="space-y-2 text-gray-600 text-sm">
      {data.map((entry: Attendance) => (
        <li
          key={entry.id}
          className="grid grid-cols-2 sm:grid-cols-4 gap-2 border-b pb-2"
        >
          <span>{new Date(entry.startTime).toLocaleString()}</span>
          <span className="text-green-600 font-medium">Clock In</span>
          {entry.endTime ? (
            <>
              <span>{new Date(entry.endTime).toLocaleString()}</span>
              <span className="text-red-600 font-medium">Clock Out</span>
            </>
          ) : (
            <span className="col-span-2 text-gray-400 italic">Clocked in</span>
          )}
        </li>
      ))}
    </ul>
  );
}
