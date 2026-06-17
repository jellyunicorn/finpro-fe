import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { cloudimages } from "../../lib/cloudinary";
import { todaysdate } from "../../utils/todaysdateUtils";

const data = [
  { day: "Mon", deliveries: 7 },
  { day: "Tue", deliveries: 6 },
  { day: "Wed", deliveries: 9 },
  { day: "Thu", deliveries: 5 },
  { day: "Fri", deliveries: 1 },
  { day: "Sat", deliveries: 5 },
  { day: "Sun", deliveries: 4 },
];

export default function DriverDashboardStats() {
  const notifications = [
    { id: 1, message: "New order nearby! #209", time: "2026-05-23 09:15" },
  ];

  return (
    <div className="p-6 flex flex-col gap-6">
      <div className="h-50  w-full z-2 relative flex flex-col gap-1  p-10 items-center justify-center">
        <p>{todaysdate}</p>
        <h1 className="text-4xl z-2 text-claundry-blue max-w-150 text-center ">
          {" "}
          Hallo Drivers!
        </h1>
        <img
          src={cloudimages.dashboard_img}
          alt=""
          className="h-full absolute right-0 mr-10 "
        />
      </div>
      <div className="flex gap-5">
        <div className="w-1/3 bg-white shadow rounded-lg p-4">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">
            Notifications
          </h2>
          {notifications.length === 0 ? (
            <p className="text-gray-500 text-sm">No new notifications.</p>
          ) : (
            <ul className="space-y-3 text-sm text-gray-600">
              {notifications.map((note) => (
                <li
                  key={note.id}
                  className="border-b pb-2 last:border-b-0 flex flex-col"
                >
                  <span className="font-medium">{note.message}</span>
                  <span className="text-xs text-gray-400">{note.time}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* graph */}
        <div className="w-2/3">
          <div className="bg-white shadow rounded-lg p-4 mb-6">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">
              Weekly Performance
            </h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="deliveries"
                    stroke="#2563eb"
                    strokeWidth={2}
                    dot={{ r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Summary Stats */}
          <div className="bg-white shadow rounded-lg p-4">
            <h3 className="text-md font-semibold text-gray-700 mb-4">
              Summary
            </h3>
            <ul className="space-y-2 text-gray-600 text-sm">
              <li className="flex justify-between">
                <span>Total Deliveries This Week</span>
                <span className="font-medium">98</span>
              </li>
              <li className="flex justify-between">
                <span>Average per Day</span>
                <span className="font-medium">14</span>
              </li>
              <li className="flex justify-between">
                <span>Best Day</span>
                <span className="font-medium text-green-600">Friday (20)</span>
              </li>
              <li className="flex justify-between">
                <span>Lowest Day</span>
                <span className="font-medium text-red-600">Wednesday (9)</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
