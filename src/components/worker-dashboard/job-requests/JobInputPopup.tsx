import type { AvailableJob } from "../../../types/availableJob";
import type { OrderItem } from "../../../types/orderItem";
import Popup from "../../Popup";
import ConfirmItemsForm from "../ConfirmItemsForm";

interface JobInputPopupProps {
  open: boolean;
  job: AvailableJob;
  onClose: () => void;
  onSubmit: (values: { items: OrderItem[] }) => void;
}

export default function JobInputPopup({
  open,
  job,
  onClose,
  onSubmit,
}: JobInputPopupProps) {
  return (
    <Popup open={open} onClose={onClose}>
      <div className="p-4">
        <h2 className="text-lg font-semibold mb-2">
          Input Items for Job #{job.jobId}
        </h2>
        <ConfirmItemsForm
          orderItems={{ items: job.orderItems }}
          onSubmit={onSubmit}
        />
      </div>
    </Popup>
  );
}
