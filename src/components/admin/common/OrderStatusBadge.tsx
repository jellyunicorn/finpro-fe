import StatusBadge from "../ui/StatusBadge";
import {
  ORDER_STATUS_LABELS,
  ORDER_STATUS_VARIANTS,
  type OrderStatus,
} from "../../../constants/order-status";

interface Props {
  status: OrderStatus;
}

export default function OrderStatusBadge({ status }: Props) {
  return (
    <StatusBadge variant={ORDER_STATUS_VARIANTS[status]}>
      {ORDER_STATUS_LABELS[status]}
    </StatusBadge>
  );
}
