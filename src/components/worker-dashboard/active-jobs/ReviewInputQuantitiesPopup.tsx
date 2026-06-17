import type { Job } from "../../../types/job";
import type { OrderItem } from "../../../types/orderItem";
import Popup from "../../Popup";

interface ReviewInputQuantitiesPopup {
  isOpen: boolean;
  onClose: () => void;
  onBack: () => void;
  onConfirm: () => void;
  nextJob: Job | null;
  pendingItems: OrderItem[];
  isPending: boolean;
}

export default function ReviewInputQuantitiesPopup({
  isOpen,
  onClose,
  onBack,
  onConfirm,
  nextJob,
  pendingItems,
  isPending,
}: ReviewInputQuantitiesPopup) {
  return (
    <Popup open={isOpen} onClose={onClose}>
      <div className="p-4">
        <h2 className="text-lg font-semibold mb-2">
          Confirm Items for Job #{nextJob?.jobId}
        </h2>
        <ul className="mb-4 text-sm text-gray-700 space-y-1">
          {pendingItems.map((item) => (
            <li key={item.id}>
              {item.name}: {item.quantity}
            </li>
          ))}
        </ul>
        <div className="flex justify-end gap-2">
          <button
            onClick={onConfirm}
            disabled={isPending}
            className="px-3 py-1 rounded bg-claundry-blue text-white hover:bg-blue-700 disabled:opacity-50"
          >
            {isPending ? "Loading..." : "Confirm"}
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