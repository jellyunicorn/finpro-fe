import Popup from "../../Popup";
import type { DriverJob } from "../../../types/driverJob";

type ActionType = "accept" | "cancel" | "complete" | "advance";

interface ConfirmPopupProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isPending?: boolean;
  action: ActionType;
  jobType?: DriverJob["type"];
}

const actionMessages: Record<ActionType, string> = {
  accept: "Do you want to accept this job?",
  cancel: "Are you sure you want to cancel this job?",
  complete: "Mark this job as complete?",
  advance: "Advance this job to the next status?",
};

export default function ConfirmPopup({
  open,
  onClose,
  onConfirm,
  isPending = false,
  action,
  jobType,
}: ConfirmPopupProps) {
  const message = jobType
    ? `${actionMessages[action].replace("this job", `this ${jobType} job`)}`
    : actionMessages[action];

  return (
    <Popup open={open} onClose={onClose}>
      <div className="p-4">
        <p className="mb-4 text-lg font-medium">{message}</p>
        <div className="flex justify-end gap-3">
          <button
            onClick={onConfirm}
            disabled={isPending}
            className="px-4 py-1 bg-claundry-blue hover:bg-blue-700 text-white rounded disabled:opacity-50"
          >
            {isPending ? "Loading..." : "Yes"}
          </button>
          <button
            onClick={onClose}
            className="px-4 py-1 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 transition"
          >
            No
          </button>
        </div>
      </div>
    </Popup>
  );
}
