import type { Attendance } from "../../types/attendance";

export default function AttendanceDropDown({
  attendance,
}: {
  attendance: Attendance[];
}) {
  if (attendance.length === 0) {
    return (
      <div className="text-center text-gray-500 italic">
        No attendance records available
      </div>
    );
  }

  return (
    <table className="w-full text-left border-collapse">
      <thead className="text-claundry-blue">
        <tr>
          <th className="p-2">Date</th>
          <th className="p-2">Type</th>
        </tr>
      </thead>
      <tbody>
        {attendance.map((log) => (
          <tr key={log.id} className="border-t">
            <td className="p-2">
              {new Date(log.startTime).toLocaleDateString()}
            </td>
            <td className="p-2">{log.type}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
