import React, { useState } from "react";
import useGetDeliveryHistory from "../../hooks/useGetDeliveryHistory";
import useGetPickupHistory from "../../hooks/useGetPickupHistory";
import { formatDateTime } from "../../utils/driverDashboardHelpers";
import Pagination from "../../components/Pagination";

export default function DriverDashboardDeliveryHistory() {
  const [pickupsPage, setPickupsPage] = useState(1);
  const [deliveriesPage, setDeliveriesPage] = useState(1);
  const [activeTab, setActiveTab] = useState<"pickup" | "delivery">("pickup");
  const [expandedRow, setExpandedRow] = useState<string | null>(null);

  const { data: pickups } = useGetPickupHistory(pickupsPage);
  const { data: deliveries } = useGetDeliveryHistory(deliveriesPage);

  const toggleRow = (id: string) => {
    setExpandedRow(expandedRow === id ? null : id);
  };

  return (
    <div className="p-8 font-dmsans">
      <div className="w-full bg-white shadow rounded-lg border border-[#BAD6F5] pb-4">
        <h1 className="text-2xl font-semibold text-claundry-blue mb-6 p-4">
          Pickup & Delivery History
        </h1>

        <div className="flex border-b border-[#BAD6F5]">
          <button
            className={`px-4 py-2 ${
              activeTab === "pickup"
                ? "text-claundry-blue font-semibold border-b-2 border-claundry-blue"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab("pickup")}
          >
            Pickups
          </button>
          <button
            className={`px-4 py-2 ${
              activeTab === "delivery"
                ? "text-claundry-blue font-semibold border-b-2 border-claundry-blue"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab("delivery")}
          >
            Deliveries
          </button>
        </div>

        <table className="w-full text-left border-collapse">
          <thead className="bg-[#BAD6F5] text-claundry-blue">
            <tr>
              <th className="p-4">Order ID</th>
              <th className="p-4">Distance</th>
              <th className="p-4">Date & Time</th>
              <th className="p-4">Details</th>
            </tr>
          </thead>
          <tbody>
            {(activeTab === "pickup" ? pickups?.data : deliveries?.data)?.map(
              (item) => {
                const isExpanded = expandedRow === item.id;
                return (
                  <React.Fragment key={item.id}>
                    <tr className="border-t hover:bg-[#F3F8FE] transition-colors">
                      <td className="p-4 font-medium text-claundry-blue">
                        {item.id}
                      </td>
                      <td className="p-4 text-sm text-gray-600">
                        {item.distance} km
                      </td>
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
              },
            )}
          </tbody>
        </table>

        {activeTab === "pickup" && pickups && pickups.data.length > 0 && (
          <Pagination
            currentPage={pickups.meta.page}
            totalPages={Math.ceil(pickups.meta.total / pickups.meta.take)}
            onPageChange={(pg) => setPickupsPage(pg)}
          />
        )}
        {activeTab === "delivery" &&
          deliveries &&
          deliveries.data.length > 0 && (
            <Pagination
              currentPage={deliveries.meta.page}
              totalPages={Math.ceil(
                deliveries.meta.total / deliveries.meta.take,
              )}
              onPageChange={(pg) => setDeliveriesPage(pg)}
            />
          )}
      </div>
    </div>
  );
}
