import { useState, useEffect } from "react";
import DriverActiveMap from "../../components/driver-dashboard/DriverActiveMap";
import { ActiveJobCard } from "../../components/driver-dashboard/jobs-page/ActiveJobCard";
import { JobRequestsTable } from "../../components/driver-dashboard/jobs-page/JobRequestsTable";
import LoadingSpinner from "../../components/LoadingSpinner";
import Pagination from "../../components/Pagination";
import { useBeginDriverJob } from "../../hooks/driver/useBeginDriverJob";
import { useCancelDriverJob } from "../../hooks/driver/useCancelDriverJob";
import { useFinishDriverJob } from "../../hooks/driver/useFinishDriverJob";
import useGetActiveDriverJob from "../../hooks/driver/useGetActiveDriverJob";
import useGetAvailableDeliveries from "../../hooks/driver/useGetAvailableDeliveries";
import useGetAvailablePickups from "../../hooks/driver/useGetAvailablePickups";
import { useNextDriverJobStatus } from "../../hooks/driver/useNextDriverJobStatus";
import type { DriverJob } from "../../types/driverJob";
import {
  getDestinationCoords,
  getFromCoords,
} from "../../utils/driverDashboardHelpers";
import JobFilterTabs from "../../components/driver-dashboard/JobFilterTabs";
import ConfirmPopup from "../../components/driver-dashboard/jobs-page/ConfirmPopup";
import JobRequestsCardsList from "../../components/driver-dashboard/jobs-page/JobRequestsCardList";

export default function DriverDashboardDeliveries() {
  const [pickupPage, setPickupPage] = useState(1);
  const [deliveryPage, setDeliveryPage] = useState(1);
  const [activeTab, setActiveTab] = useState<DriverJob["type"]>("pickup");
  const [expandedRow, setExpandedRow] = useState<string | null>(null);

  const [popupOpen, setPopupOpen] = useState(false);
  const [popupAction, setPopupAction] = useState<
    "accept" | "cancel" | "complete" | "advance" | null
  >(null);
  const [selectedJob, setSelectedJob] = useState<{
    id: string;
    type: DriverJob["type"];
  } | null>(null);

  const { data: pickups, isLoading: pickupsLoading } =
    useGetAvailablePickups(pickupPage);
  const { data: deliveries, isLoading: deliveriesLoading } =
    useGetAvailableDeliveries(deliveryPage);
  const { data: activeJob } = useGetActiveDriverJob();

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

  const openConfirm = (
    jobId: string,
    type: DriverJob["type"],
    action: "accept" | "cancel" | "complete" | "advance",
  ) => {
    setSelectedJob({ id: jobId, type });
    setPopupAction(action);
    setPopupOpen(true);
  };

  const { mutateAsync: beginJob, isPending: isPendingBegin } =
    useBeginDriverJob();
  const { mutateAsync: nextJobStatus, isPending: isPendingAdvance } =
    useNextDriverJobStatus();
  const { mutateAsync: finishJob, isPending: isPendingComplete } =
    useFinishDriverJob();
  const { mutateAsync: cancelJob, isPending: isPendingCancel } =
    useCancelDriverJob();

  const handleAcceptConfirm = async () => {
    if (!selectedJob) return;
    await beginJob({ jobId: selectedJob.id, type: selectedJob.type });
    setPopupOpen(false);
  };

  const handleAdvanceConfirm = async () => {
    if (!selectedJob) return;
    await nextJobStatus({ jobId: selectedJob.id, type: selectedJob.type });
    setPopupOpen(false);
  };

  const handleCompleteConfirm = async () => {
    if (!selectedJob) return;
    await finishJob({ jobId: selectedJob.id, type: selectedJob.type });
    setPopupOpen(false);
  };

  const handleCancelConfirm = async () => {
    if (!selectedJob) return;
    await cancelJob({ jobId: selectedJob.id, type: selectedJob.type });
    setPopupOpen(false);
  };

  const isPending =
    isPendingBegin || isPendingAdvance || isPendingComplete || isPendingCancel;

  let emptyMessage: string | null = null;
  if (!hasPickups && !hasDeliveries && !isLoading && !activeJob) {
    emptyMessage = "No pickup or delivery requests available.";
  } else if (activeTab === "pickup" && !hasPickups && hasDeliveries) {
    emptyMessage = "No pickup requests available.";
  } else if (activeTab === "delivery" && !hasDeliveries && hasPickups) {
    emptyMessage = "No delivery requests available.";
  }

  return (
    <div className="p-6 sm:p-8 font-dmsans">
      <h1 className="text-2xl font-semibold text-claundry-blue mb-6">
        Pickup & Delivery Requests
      </h1>

      {activeJob ? (
        <div className="w-full flex gap-6">
          <ActiveJobCard
            activeJob={activeJob}
            onAdvance={(id, type) => openConfirm(id, type, "advance")}
            onComplete={(id, type) => openConfirm(id, type, "complete")}
            onCancel={(id, type) => openConfirm(id, type, "cancel")}
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
        <>
          {isLoading ? (
            <div className="flex justify-center items-center">
              <LoadingSpinner />
            </div>
          ) : (
            <>
              {(hasPickups || hasDeliveries) && (
                <JobFilterTabs
                  activeTab={activeTab}
                  setActiveTab={setActiveTab}
                />
              )}

              {emptyMessage ? (
                <div className="p-6 text-center text-gray-600">
                  {emptyMessage}
                </div>
              ) : (
                <div className="bg-white shadow rounded-lg border border-[#BAD6F5] pb-3">
                  <JobRequestsCardsList
                    jobs={activeTab === "pickup" ? pickupJobs : deliveryJobs}
                    onAccept={(id) => openConfirm(id, activeTab, "accept")}
                  />
                  
                  <JobRequestsTable
                    data={activeTab === "pickup" ? pickupJobs : deliveryJobs}
                    expandedRow={expandedRow}
                    onAccept={(id) => openConfirm(id, activeTab, "accept")}
                    onToggle={toggleRow}
                  />

                  {activeTab === "pickup" && hasPickups && pickups?.meta && (
                    <Pagination
                      currentPage={pickups.meta.page}
                      totalPages={Math.ceil(
                        pickups.meta.total / pickups.meta.take,
                      )}
                      onPageChange={setPickupPage}
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
                        onPageChange={setDeliveryPage}
                      />
                    )}
                </div>
              )}
            </>
          )}
        </>
      )}

      {popupAction === "accept" && (
        <ConfirmPopup
          open={popupOpen}
          onClose={() => setPopupOpen(false)}
          onConfirm={handleAcceptConfirm}
          isPending={isPending}
          action="accept"
          jobType={selectedJob?.type}
        />
      )}
      {popupAction === "advance" && (
        <ConfirmPopup
          open={popupOpen}
          onClose={() => setPopupOpen(false)}
          onConfirm={handleAdvanceConfirm}
          isPending={isPending}
          action="advance"
          jobType={selectedJob?.type}
        />
      )}
      {popupAction === "complete" && (
        <ConfirmPopup
          open={popupOpen}
          onClose={() => setPopupOpen(false)}
          onConfirm={handleCompleteConfirm}
          isPending={isPending}
          action="complete"
          jobType={selectedJob?.type}
        />
      )}
      {popupAction === "cancel" && (
        <ConfirmPopup
          open={popupOpen}
          onClose={() => setPopupOpen(false)}
          onConfirm={handleCancelConfirm}
          isPending={isPending}
          action="cancel"
          jobType={selectedJob?.type}
        />
      )}

      {popupAction === "cancel" && (
        <ConfirmPopup
          open={popupOpen}
          onClose={() => setPopupOpen(false)}
          onConfirm={handleCancelConfirm}
          isPending={isPending}
          action="cancel"
          jobType={selectedJob?.type}
        />
      )}
    </div>
  );
}
