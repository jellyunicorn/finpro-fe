import type { DriverJob } from "../../../types/driverJob";
import { formatDateTime } from "../../../utils/driverDashboardHelpers";


interface CardsProps {
  data: DriverJob[];
}

export default function JobHistoryCards({ data }: CardsProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 md:hidden m-3">
      {data.map((item) => (
        <div
          key={item.id}
          className="flex flex-col gap-1.5 bg-white shadow rounded-lg border border-[#BAD6F5] p-4 hover:border-claundry-blue transition-colors"
        >
          <p className="text-claundry-blue font-semibold mb-0.5">#{item.id}</p>
          <p className="text-sm text-gray-600">{formatDateTime(item.createdAt)}</p>
          <p className="text-sm text-gray-600">Distance: {item.distance} km</p>
          <p className="text-sm text-gray-600">Address: {item.address}</p>
          <p className="text-sm text-gray-600">Postal Code: {item.postalCode}</p>
          <p className="text-sm text-gray-600">Customer: {item.customerName}</p>
          <p className="text-sm text-gray-600">Status: {item.status || "N/A"}</p>
        </div>
      ))}
    </div>
  );
}
