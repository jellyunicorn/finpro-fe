import Popup from "../../Popup";

interface CompleteJobPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isPending: boolean;
}

export default function CompleteJobPopup({
  isOpen,
  onClose,
  onConfirm,
  isPending,
}: CompleteJobPopupProps) {
  return (
    <Popup open={isOpen} onClose={onClose}>
      <div className="p-2">
        <p className="mb-4 text-lg font-medium">Mark this job as complete?</p>
        <div className="flex justify-end gap-3">
          <button
            onClick={onConfirm}
            disabled={isPending}
            className="px-4 py-1 bg-claundry-blue hover:bg-blue-700 text-white rounded disabled:opacity-50"
          >
            {isPending ? "Loading" : "Yes"}
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