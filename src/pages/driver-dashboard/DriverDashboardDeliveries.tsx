import { useEffect, useState } from "react";
import DriverActiveMap from "../../components/driver-dashboard/DriverActiveMap";
import Pagination from "../../components/Pagination";
import { useBeginDriverJob } from "../../hooks/useBeginDriverJob";
import { useCancelDriverJob } from "../../hooks/useCancelDriverJob";
import { useFinishDriverJob } from "../../hooks/useFinishDriverJob";
import useGetActiveDriverJob from "../../hooks/useGetActiveDriverJob";
import useGetAvailableDeliveries from "../../hooks/useGetAvailableDeliveries";
import useGetAvailablePickups from "../../hooks/useGetAvailablePickups";
import { useNextDriverJobStatus } from "../../hooks/useNextDriverJobStatus";
import {
  formatDateTime,
  getDestinationCoords,
  getFromCoords,
} from "../../utils/driverDashboardHelpers";

export default function DriverDashboardDeliveries() {
  const [pickupPage, setPickupPage] = useState(1);
  const [deliveryPage, setDeliveryPage] = useState(1);
  const [activeTab, setActiveTab] = useState<"pickup" | "delivery">("pickup");
  const [expandedRow, setExpandedRow] = useState<string | null>(null);

  const { data: pickups } = useGetAvailablePickups(pickupPage);
  const { data: deliveries } = useGetAvailableDeliveries(deliveryPage);

  const { data: activeJob } = useGetActiveDriverJob();

  useEffect(() => {
    console.log("activeJob is:" + activeJob);
  }, [activeJob]);

  const { mutateAsync: beginJob } = useBeginDriverJob();
  const { mutateAsync: nextJobStatus } = useNextDriverJobStatus();
  const { mutateAsync: finishJob } = useFinishDriverJob();
  const { mutateAsync: cancelJob } = useCancelDriverJob();

  const handleAcceptClick = async (jobId: string) => {
    await beginJob({ jobId, type: activeTab });
  };

  const handleAdvanceClick = async (
    jobId: string,
    activeJobType: "pickup" | "delivery",
  ) => {
    await nextJobStatus({ jobId, type: activeJobType });
  };

  const handleMarkCompleteClick = async (
    jobId: string,
    activeJobType: "pickup" | "delivery",
  ) => {
    await finishJob({ jobId, type: activeJobType });
  };

  const toggleRow = (id: string) => {
    setExpandedRow(expandedRow === id ? null : id);
  };

  const handleCancelClick = async (
    jobId: string,
    activeJobType: "pickup" | "delivery",
  ) => {
    await cancelJob({ jobId, type: activeJobType });
  };

  return (
    <div className="p-8 font-dmsans">
      {activeJob && activeJob !== undefined ? (
        <div className="w-full flex gap-6">
          <div className="flex-1 bg-white shadow rounded-lg border border-[#BAD6F5] p-6">
            <h2 className="text-xl font-semibold text-claundry-blue mb-4">
              Active Order
            </h2>
            <div>
              <p className="mb-2">
                <span className="font-semibold">ID:</span> {activeJob.id}
              </p>
              <p className="mb-2">
                <span className="font-semibold">Customer:</span>{" "}
                {activeJob.customerName}
              </p>
              <p className="mb-2">
                <span className="font-semibold">Address:</span>{" "}
                {activeJob.address}
              </p>
              <p className="mb-2">
                <span className="font-semibold">Postal Code:</span>{" "}
                {activeJob.postalCode}
              </p>
              <p className="mb-4">
                <span className="font-semibold">Status:</span>{" "}
                {activeJob.status}
              </p>
              <div className="flex gap-2">
                {activeJob.status === "WAITING_FOR_DRIVER" && (
                  <button
                    className="bg-claundry-blue text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                    onClick={() =>
                      handleAdvanceClick(activeJob.id, activeJob.type)
                    }
                  >
                    {activeJob.type === "pickup"
                      ? "Head to Outlet"
                      : "Start Delivery"}
                  </button>
                )}

                {(activeJob.status === "OTW_TO_OUTLET" ||
                  activeJob.status === "OTW_TO_CUSTOMER") && (
                  <button
                    className="bg-claundry-blue text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                    onClick={() =>
                      handleMarkCompleteClick(activeJob.id, activeJob.type)
                    }
                  >
                    Mark as Complete
                  </button>
                )}

                <button
                  className="border-2 border-red-500 text-red-500 px-4 py-2 rounded hover:bg-red-500 hover:text-white transition"
                  onClick={() =>
                    handleCancelClick(activeJob.id, activeJob.type)
                  }
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>

          <div className="w-1/2 bg-gray-200 shadow rounded-lg border border-gray-300 flex items-center justify-center">
            <DriverActiveMap
              fromLongitude={getFromCoords(activeJob).longitude}
              fromLatitude={getFromCoords(activeJob).latitude}
              toLongitude={getDestinationCoords(activeJob).longitude}
              toLatitude={getDestinationCoords(activeJob).latitude}
            />
          </div>
        </div>
      ) : (
        <div className="w-full bg-white shadow rounded-lg border border-[#BAD6F5] pb-4">
          <h1 className="text-2xl font-semibold text-claundry-blue mb-6 p-4">
            Pickup & Delivery Requests
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
                <th className="p-4">Action</th>
              </tr>
            </thead>
            <tbody>
              {(activeTab === "pickup" ? pickups?.data : deliveries?.data)?.map(
                (item) => {
                  const isExpanded = expandedRow === item.id;
                  return (
                    <>
                      <tr
                        key={item.id}
                        className="border-t hover:bg-[#F3F8FE] transition-colors"
                      >
                        <td className="p-4 font-medium text-claundry-blue">
                          {item.id}
                        </td>
                        <td className="p-4 text-sm text-gray-600">
                          {item.distance} km
                        </td>
                        <td className="p-4 text-sm text-gray-600">
                          {formatDateTime(item.createdAt)}
                        </td>
                        <td className="p-4 flex gap-2 items-center">
                          <button
                            className="bg-claundry-blue text-white px-3 py-1 rounded hover:bg-blue-700 transition"
                            onClick={() => handleAcceptClick(item.id)}
                          >
                            Accept
                          </button>
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
                              <span className="font-semibold">
                                Postal Code:
                              </span>{" "}
                              {item.postalCode || "N/A"}
                            </p>
                          </td>
                        </tr>
                      )}
                    </>
                  );
                },
              )}
            </tbody>
          </table>

          {pickups && pickups.data.length > 0 && activeTab === "pickup" && (
            <Pagination
              currentPage={pickups.meta.page}
              totalPages={Math.ceil(pickups.meta.total / pickups.meta.take)}
              onPageChange={(pg) => setPickupPage(pg)}
            />
          )}

          {deliveries &&
            deliveries.data.length > 0 &&
            activeTab === "delivery" && (
              <Pagination
                currentPage={deliveries.meta.page}
                totalPages={Math.ceil(
                  deliveries.meta.total / deliveries.meta.take,
                )}
                onPageChange={(pg) => setDeliveryPage(pg)}
              />
            )}
        </div>
      )}
    </div>
  );
}
