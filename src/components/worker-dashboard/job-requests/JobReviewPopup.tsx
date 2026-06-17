import type { AvailableJob } from "../../../types/availableJob";
import type { OrderItem } from "../../../types/orderItem";
import Popup from "../../Popup";

interface JobReviewPopupProps {
  open: boolean;
  job: AvailableJob;
  items: OrderItem[];
  onClose: () => void;
  onConfirm: () => void;
  onBack: () => void;
}

export default function JobReviewPopup({
  open,
  job,
  items,
  onClose,
  onConfirm,
  onBack,
}: JobReviewPopupProps) {
  return (
    <Popup open={open} onClose={onClose}>
      <div className="p-4">
        <h2 className="text-lg font-semibold mb-2">
          Confirm Items for Job #{job.jobId}
        </h2>
        <ul className="mb-4 text-sm text-gray-700 space-y-1">
          {items.map((item) => (
            <li key={item.id}>
              {item.name}: {item.quantity}
            </li>
          ))}
        </ul>
        <div className="flex justify-end gap-2">
          <button
            onClick={onConfirm}
            className="px-3 py-1 rounded bg-claundry-blue text-white hover:bg-blue-700"
          >
            Confirm
          </button>
          <button
            onClick={onBack}
            className="px-3 py-1 rounded border border-gray-400 text-gray-600 hover:bg-gray-100"
          >
            Back
          </button>
        </div>
      </div>
    </Popup>
  );
}
