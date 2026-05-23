import StatusBadge from "../../../components/admin/ui/StatusBadge";
import type { BypassStatus } from "../../../types/bypass.types";

const STATUS_CONFIG: Record<
  BypassStatus,
  { label: string; variant: "mint" | "peach" | "coral" }
> = {
  PENDING: { label: "Pending", variant: "peach" },
  APPROVED: { label: "Approved", variant: "mint" },
  REJECTED: { label: "Rejected", variant: "coral" },
};

interface BypassStatusBadgeProps {
  status: BypassStatus;
}

export default function BypassStatusBadge({ status }: BypassStatusBadgeProps) {
  const config = STATUS_CONFIG[status];
  return <StatusBadge variant={config.variant}>{config.label}</StatusBadge>;
}
