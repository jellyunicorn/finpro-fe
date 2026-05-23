import { useState } from "react";

type AttendanceEntry = {
  time: string;
  action: "Clock In" | "Clock Out";
};

export default function WorkerDashboardAttendance() {
  const [isClockedIn, setIsClockedIn] = useState(false);
  const [log, setLog] = useState<AttendanceEntry[]>([]);

  const handleToggle = () => {
    const now = new Date().toLocaleString();
    const action: AttendanceEntry["action"] = isClockedIn ? "Clock Out" : "Clock In";

    setLog([...log, { time: now, action }]);
    setIsClockedIn(!isClockedIn);
  };

  return (
    <div className="p-6">
      <div className="bg-white shadow rounded-lg p-4 mb-6 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-700">Attendance</h2>
        <button
          onClick={handleToggle}
          className={`px-4 py-2 rounded transition ${
            isClockedIn
              ? "bg-red-600 hover:bg-red-700 text-white"
              : "bg-blue-600 hover:bg-blue-700 text-white"
          }`}
        >
          {isClockedIn ? "Clock Out" : "Clock In"}
        </button>
      </div>

      <div className="bg-white shadow rounded-lg p-4">
        <h3 className="text-md font-semibold text-gray-700 mb-4">
          Attendance History
        </h3>
        {log.length === 0 ? (
          <p className="text-gray-500 text-sm">No attendance records yet.</p>
        ) : (
          <ul className="space-y-2 text-gray-600 text-sm">
            {log.map((entry, index) => (
              <li key={index} className="flex justify-between">
                <span>{entry.time}</span>
                <span
                  className={
                    entry.action === "Clock In"
                      ? "text-green-600 font-medium"
                      : "text-red-600 font-medium"
                  }
                >
                  {entry.action}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
