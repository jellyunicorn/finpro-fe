import { useEffect, useState } from "react";
import JobFilterTabs from "../../components/driver-dashboard/JobFilterTabs";
import JobHistoryCards from "../../components/driver-dashboard/jobs-history/JobHistoryCards";
import JobHistoryTable from "../../components/driver-dashboard/jobs-history/JobHistoryTable";
import LoadingSpinner from "../../components/LoadingSpinner";
import Pagination from "../../components/Pagination";
import useGetDeliveryHistory from "../../hooks/driver/useGetDeliveryHistory";
import useGetPickupHistory from "../../hooks/driver/useGetPickupHistory";
import type { DriverJob } from "../../types/driverJob";

export default function DriverDashboardDeliveryHistory() {
  const [pickupsPage, setPickupsPage] = useState(1);
  const [deliveriesPage, setDeliveriesPage] = useState(1);
  const [activeTab, setActiveTab] = useState<"pickup" | "delivery">("pickup");
  const [expandedRow, setExpandedRow] = useState<string | null>(null);

  const { data: pickups, isLoading: pickupsLoading } =
    useGetPickupHistory(pickupsPage);
  const { data: deliveries, isLoading: deliveriesLoading } =
    useGetDeliveryHistory(deliveriesPage);

  const isLoading = pickupsLoading || deliveriesLoading;

  const pickupJobs: DriverJob[] =
    pickups?.data.map((p) => ({ ...p, type: "pickup" })) ?? [];
  const deliveryJobs: DriverJob[] =
    deliveries?.data.map((d) => ({ ...d, type: "delivery" })) ?? [];

  const hasPickups = pickupJobs.length > 0;
  const hasDeliveries = deliveryJobs.length > 0;

  useEffect(() => {
    if (!hasPickups && hasDeliveries) {
      setActiveTab("delivery");
    } else if (!hasDeliveries && hasPickups) {
      setActiveTab("pickup");
    }
  }, [hasPickups, hasDeliveries]);

  const toggleRow = (id: string) => {
    setExpandedRow(expandedRow === id ? null : id);
  };

  let emptyMessage: string | null = null;
  if (!hasPickups && !hasDeliveries && !isLoading) {
    emptyMessage = "No pickup or delivery history found.";
  } else if (activeTab === "pickup" && !hasPickups && hasDeliveries) {
    emptyMessage = "No pickup history available.";
  } else if (activeTab === "delivery" && !hasDeliveries && hasPickups) {
    emptyMessage = "No delivery history available.";
  }

  return (
    <div className="p-6 sm:p-8 font-dmsans">
      <h1 className="text-2xl font-semibold text-claundry-blue mb-6">
        Pickup & Delivery History
      </h1>

      {isLoading ? (
        <div className="flex justify-center items-center">
          <LoadingSpinner />
        </div>
      ) : (
        <>
          <JobFilterTabs activeTab={activeTab} setActiveTab={setActiveTab} />

          {emptyMessage ? (
            <div className="p-6 text-center text-gray-600">{emptyMessage}</div>
          ) : (
            <div className="w-full bg-white shadow rounded-lg border border-[#BAD6F5] pb-4">
              <JobHistoryCards
                data={activeTab === "pickup" ? pickupJobs : deliveryJobs}
              />

              <JobHistoryTable
                data={activeTab === "pickup" ? pickupJobs : deliveryJobs}
                expandedRow={expandedRow}
                toggleRow={toggleRow}
              />

              {activeTab === "pickup" && hasPickups && pickups?.meta && (
                <Pagination
                  currentPage={pickups.meta.page}
                  totalPages={Math.ceil(pickups.meta.total / pickups.meta.take)}
                  onPageChange={(pg) => setPickupsPage(pg)}
                />
              )}
              {activeTab === "delivery" &&
                hasDeliveries &&
                deliveries?.meta && (
                  <Pagination
                    currentPage={deliveries.meta.page}
                    totalPages={Math.ceil(
                      deliveries.meta.total / deliveries.meta.take,
                    )}
                    onPageChange={(pg) => setDeliveriesPage(pg)}
                  />
                )}
            </div>
          )}
        </>
      )}
    </div>
  );
}
