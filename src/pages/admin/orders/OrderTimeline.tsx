import {
  Check,
  Loader2,
  Truck,
  Store,
  WashingMachine,
  Shirt,
  Package,
  Wallet,
  PackageCheck,
  Bike,
  CheckCheck,
  XCircle,
  type LucideIcon,
} from "lucide-react";
import {
  ORDER_STATUS_LABELS,
  type OrderStatus,
} from "../../../constants/order-status";
import type { OrderDetail } from "../../../types/order.types";
import { formatDateTime } from "../../../lib/format";
import { getStatusActor } from "../../../lib/mock-orders";

// Mapping status → icon + step number (urutan kronologis)
const STATUS_FLOW: { status: OrderStatus; icon: LucideIcon }[] = [
  { status: "MENUNGGU_PENJEMPUTAN", icon: Truck },
  { status: "MENUJU_OUTLET", icon: Truck },
  { status: "SAMPAI_OUTLET", icon: Store },
  { status: "SEDANG_DICUCI", icon: WashingMachine },
  { status: "SEDANG_DISETRIKA", icon: Shirt },
  { status: "SEDANG_DIPACKING", icon: Package },
  { status: "MENUNGGU_PEMBAYARAN", icon: Wallet },
  { status: "SIAP_DIANTAR", icon: PackageCheck },
  { status: "SEDANG_DIKIRIM", icon: Bike },
  { status: "DITERIMA_CUSTOMER", icon: CheckCheck },
];

// Mapping status → timestamp field di OrderDetail
const STATUS_TIMESTAMP_MAP: Record<OrderStatus, keyof OrderDetail | null> = {
  MENUNGGU_PENJEMPUTAN: "createdAt",
  MENUJU_OUTLET: "pickedUpAt",
  SAMPAI_OUTLET: "arrivedAtOutletAt",
  SEDANG_DICUCI: "processedByAdminAt",
  SEDANG_DISETRIKA: "washingCompletedAt",
  SEDANG_DIPACKING: "ironingCompletedAt",
  MENUNGGU_PEMBAYARAN: "packingCompletedAt",
  SIAP_DIANTAR: "paidAt",
  SEDANG_DIKIRIM: "deliveryStartedAt",
  DITERIMA_CUSTOMER: "deliveredAt",
  DIBATALKAN: "cancelledAt",
};

interface OrderTimelineProps {
  detail: OrderDetail;
}

export default function OrderTimeline({ detail }: OrderTimelineProps) {
  // Cancelled state — tampilan beda
  if (detail.status === "DIBATALKAN") {
    return <CancelledState detail={detail} />;
  }

  const currentIdx = STATUS_FLOW.findIndex((s) => s.status === detail.status);

  return (
    <ol className="flex flex-col">
      {STATUS_FLOW.map((step, idx) => {
        const isDone = idx < currentIdx;
        const isCurrent = idx === currentIdx;
        const isLast = idx === STATUS_FLOW.length - 1;

        const tsField = STATUS_TIMESTAMP_MAP[step.status];
        const timestamp = tsField ? (detail[tsField] as string | null) : null;

        return (
          <TimelineStep
            key={step.status}
            status={step.status}
            icon={step.icon}
            isDone={isDone}
            isCurrent={isCurrent}
            isLast={isLast}
            timestamp={timestamp}
            actor={
              isDone || isCurrent ? getStatusActor(step.status, detail) : null
            }
          />
        );
      })}
    </ol>
  );
}

interface TimelineStepProps {
  status: OrderStatus;
  icon: LucideIcon;
  isDone: boolean;
  isCurrent: boolean;
  isLast: boolean;
  timestamp: string | null;
  actor: string | null;
}

function TimelineStep({
  status,
  icon: Icon,
  isDone,
  isCurrent,
  isLast,
  timestamp,
  actor,
}: TimelineStepProps) {
  // Color scheme per state
  const circleClass = isDone
    ? "bg-[#047857] text-white"
    : isCurrent
      ? "bg-[#296FDA] text-white ring-4 ring-[#296FDA]/20"
      : "bg-neutral-100 text-neutral-400 border border-neutral-200";

  const lineClass = isDone ? "bg-[#047857]" : "bg-neutral-200";

  const labelClass = isCurrent
    ? "text-[#296FDA] font-semibold"
    : isDone
      ? "text-neutral-800 font-medium"
      : "text-neutral-400";

  return (
    <li className="flex gap-3">
      {/* Left: icon + connecting line */}
      <div className="flex flex-col items-center">
        <div
          className={`flex items-center justify-center w-9 h-9 rounded-full shrink-0 transition-all ${circleClass}`}
        >
          {isDone ? (
            <Check className="size-4" />
          ) : isCurrent ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            <Icon className="size-4" />
          )}
        </div>
        {!isLast && <div className={`w-0.5 flex-1 mt-1 ${lineClass}`} />}
      </div>

      {/* Right: label + timestamp + actor */}
      <div className="flex-1 pb-6">
        <p className={`text-sm ${labelClass}`}>{ORDER_STATUS_LABELS[status]}</p>
        {timestamp && (
          <p className="text-xs text-neutral-500 mt-0.5">
            {formatDateTime(timestamp)}
            {actor && <span className="text-neutral-400"> — {actor}</span>}
          </p>
        )}
        {isCurrent && !timestamp && (
          <p className="text-xs text-[#296FDA] mt-0.5 italic">In progress...</p>
        )}
        {!isDone && !isCurrent && (
          <p className="text-xs text-neutral-400 mt-0.5">Pending</p>
        )}
      </div>
    </li>
  );
}

function CancelledState({ detail }: { detail: OrderDetail }) {
  return (
    <div className="flex items-center gap-3 p-4 bg-red-50 rounded-lg border border-red-100">
      <div className="flex items-center justify-center w-9 h-9 rounded-full bg-[#F87171] text-white shrink-0">
        <XCircle className="size-5" />
      </div>
      <div>
        <p className="text-sm font-semibold text-red-700">Order Dibatalkan</p>
        {detail.cancelledAt && (
          <p className="text-xs text-red-600 mt-0.5">
            {formatDateTime(detail.cancelledAt)}
          </p>
        )}
      </div>
    </div>
  );
}
