import { useState } from "react";
import type { DriverJob } from "../../types/driverJob";
import useGetAvailablePickups from "../../hooks/useGetAvailablePickups";
import useGetAvailableDeliveries from "../../hooks/useGetAvailableDeliveries";
import useGetActiveDriverJob from "../../hooks/useGetActiveDriverJob";
import { useBeginDriverJob } from "../../hooks/useBeginDriverJob";
import { useNextDriverJobStatus } from "../../hooks/useNextDriverJobStatus";
import { useFinishDriverJob } from "../../hooks/useFinishDriverJob";
import { useCancelDriverJob } from "../../hooks/useCancelDriverJob";
import { ActiveJobCard } from "../../components/driver-dashboard/jobs-page/ActiveJobCard";
import DriverActiveMap from "../../components/driver-dashboard/DriverActiveMap";
import Pagination from "../../components/Pagination";
import { JobRequestsTable } from "../../components/driver-dashboard/jobs-page/JobRequestsTable";
import {
  getDestinationCoords,
  getFromCoords,
} from "../../utils/driverDashboardHelpers";

export default function DriverDashboardDeliveries() {
  const [pickupPage, setPickupPage] = useState<number>(1);
  const [deliveryPage, setDeliveryPage] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<DriverJob["type"]>("pickup");
  const [expandedRow, setExpandedRow] = useState<string | null>(null);

  const { data: pickups } = useGetAvailablePickups(pickupPage);
  const { data: deliveries } = useGetAvailableDeliveries(deliveryPage);
  const { data: activeJob } = useGetActiveDriverJob();

  const pickupJobs: DriverJob[] | undefined = pickups?.data.map((pickup) => ({
    ...pickup,
    type: "pickup" as const,
  }));

  const deliveryJobs: DriverJob[] | undefined = deliveries?.data.map(
    (delivery) => ({
      ...delivery,
      type: "delivery" as const,
    }),
  );

  const { mutateAsync: beginJob } = useBeginDriverJob();
  const { mutateAsync: nextJobStatus } = useNextDriverJobStatus();
  const { mutateAsync: finishJob } = useFinishDriverJob();
  const { mutateAsync: cancelJob } = useCancelDriverJob();

  const handleAcceptClick = async (jobId: string) => {
    await beginJob({ jobId, type: activeTab });
  };

  const handleAdvanceClick = async (jobId: string, type: DriverJob["type"]) => {
    await nextJobStatus({ jobId, type });
  };

  const handleMarkCompleteClick = async (
    jobId: string,
    type: DriverJob["type"],
  ) => {
    await finishJob({ jobId, type });
  };

  const handleCancelClick = async (jobId: string, type: DriverJob["type"]) => {
    await cancelJob({ jobId, type });
  };

  const toggleRow = (id: string) => {
    setExpandedRow(expandedRow === id ? null : id);
  };

  return (
    <div className="p-8 font-dmsans">
      {activeJob ? (
        <div className="w-full flex gap-6">
          <ActiveJobCard
            activeJob={activeJob}
            onAdvance={handleAdvanceClick}
            onComplete={handleMarkCompleteClick}
            onCancel={handleCancelClick}
          />
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

          <JobRequestsTable
            data={activeTab === "pickup" ? pickupJobs : deliveryJobs}
            expandedRow={expandedRow}
            onAccept={handleAcceptClick}
            onToggle={toggleRow}
          />

          {activeTab === "pickup" && pickups && pickups.data.length > 0 && (
            <Pagination
              currentPage={pickups.meta.page}
              totalPages={Math.ceil(pickups.meta.total / pickups.meta.take)}
              onPageChange={(pg) => setPickupPage(pg)}
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
                onPageChange={(pg) => setDeliveryPage(pg)}
              />
            )}
        </div>
      )}
    </div>
  );
}
