import React from "react";
import type { DriverJob } from "../../../types/driverJob";
import { formatDateTime } from "../../../utils/driverDashboardHelpers";

interface TableProps {
  data: DriverJob[];
  expandedRow: string | null;
  toggleRow: (id: string) => void;
}

export default function JobHistoryTable({
  data,
  expandedRow,
  toggleRow,
}: TableProps) {
  return (
    <table className="hidden md:table w-full text-left border-collapse">
      <thead className="bg-[#BAD6F5] text-claundry-blue">
        <tr>
          <th className="p-4">Order ID</th>
          <th className="p-4">Distance</th>
          <th className="p-4">Date & Time</th>
          <th className="p-4">Details</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item) => {
          const isExpanded = expandedRow === item.id;
          return (
            <React.Fragment key={item.id}>
              <tr className="border-t hover:bg-[#F3F8FE] transition-colors">
                <td className="p-4 font-medium text-claundry-blue">{item.id}</td>
                <td className="p-4 text-sm text-gray-600">{item.distance} km</td>
                <td className="p-4 text-sm text-gray-600">
                  {formatDateTime(item.createdAt)}
                </td>
                <td className="p-4">
                  <button
                    onClick={() => toggleRow(item.id)}
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
                  <td colSpan={4} className="p-4 text-sm text-gray-700">
                    <p>
                      <span className="font-semibold">Customer:</span>{" "}
                      {item.customerName || "N/A"}
                    </p>
                    <p>
                      <span className="font-semibold">Address:</span>{" "}
                      {item.address || "N/A"}
                    </p>
                    <p>
                      <span className="font-semibold">Postal Code:</span>{" "}
                      {item.postalCode || "N/A"}
                    </p>
                    <p>
                      <span className="font-semibold">Status:</span>{" "}
                      {item.status || "N/A"}
                    </p>
                  </td>
                </tr>
              )}
            </React.Fragment>
          );
        })}
      </tbody>
    </table>
  );
}
