import Popup from "../../Popup";

interface BeginNextJobPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function BeginNextJobPopup({
  isOpen,
  onClose,
  onConfirm,
}: BeginNextJobPopupProps) {
  return (
    <Popup open={isOpen} onClose={onClose}>
      <div className="p-2">
        <p className="mb-4 text-lg font-medium">
          Do you want to immediately begin the next job?
        </p>
        <div className="flex justify-end gap-3">
          <button
            onClick={onConfirm}
            className="px-4 py-1 bg-claundry-blue text-white rounded"
          >
            Yes
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