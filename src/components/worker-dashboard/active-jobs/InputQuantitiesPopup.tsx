import type { Job } from "../../../types/job";
import type { OrderItem } from "../../../types/orderItem";
import Popup from "../../Popup";
import ConfirmItemsForm from "../ConfirmItemsForm";

interface InputQuantitiesPopupProps {
  isOpen: boolean;
  onClose: () => void;
  selectedJob: Job | null;
  onSubmit: (values: { items: OrderItem[] }) => void;
}

export default function InputQuantitiesPopup({
  isOpen,
  onClose,
  selectedJob,
  onSubmit,
}: InputQuantitiesPopupProps) {
  if (!selectedJob) return null;

  return (
    <Popup open={isOpen} onClose={onClose}>
      <p className="absolute top-1 left-1 p-2">Please input item quantities</p>
      <ConfirmItemsForm
        orderItems={{ items: selectedJob.orderItems }}
        onSubmit={onSubmit}
      />
    </Popup>
  );
}