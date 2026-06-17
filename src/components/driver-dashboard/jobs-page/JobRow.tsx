import type { DriverJob } from "../../../types/driverJob";
import { formatDateTime } from "../../../utils/driverDashboardHelpers";


interface JobRowProps {
  item: DriverJob;
  isExpanded: boolean;
  onAccept: (jobId: string) => void;
  onToggle: (jobId: string) => void;
}

export function JobRow({ item, isExpanded, onAccept, onToggle }: JobRowProps) {
  return (
    <>
      <tr className="border-t hover:bg-[#F3F8FE] transition-colors">
        <td className="p-4 font-medium text-claundry-blue">{item.id}</td>
        <td className="p-4 text-sm text-gray-600">{item.distance} km</td>
        <td className="p-4 text-sm text-gray-600">{formatDateTime(item.createdAt)}</td>
        <td className="p-4 flex gap-2 items-center">
          <button
            className="bg-claundry-blue text-white px-3 py-1 rounded hover:bg-blue-700 transition"
            onClick={() => onAccept(item.id)}
          >
            Accept
          </button>
          <button onClick={() => onToggle(item.id)} className="p-1 rounded transition-transform duration-300">
            <span className={`inline-block transform transition-transform duration-300 ${isExpanded ? "-rotate-90" : "rotate-90"}`}>
              &gt;
            </span>
          </button>
        </td>
      </tr>
      {isExpanded && (
        <tr className="bg-[#F9FCFF]">
          <td colSpan={4} className="p-4 text-sm text-gray-700">
            <p><span className="font-semibold">Customer:</span> {item.customerName || "N/A"}</p>
            <p><span className="font-semibold">Address:</span> {item.address || "N/A"}</p>
            <p><span className="font-semibold">Postal Code:</span> {item.postalCode || "N/A"}</p>
          </td>
        </tr>
      )}
    </>
  );
}
