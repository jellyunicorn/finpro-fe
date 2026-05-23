import { Link, useParams, useNavigate } from "react-router";
import { ArrowLeft, Play, X } from "lucide-react";
import Card from "../../../components/admin/ui/Card";
import Button from "../../../components/admin/ui/Button";
import OrderStatusBadge from "../../../components/admin/common/OrderStatusBadge";
import EmptyState from "../../../components/admin/common/EmptyState";
import { Package } from "lucide-react";
import { formatDateTime } from "../../../lib/format";
import { getMockOrderDetail } from "../../../lib/mock-orders";
import OrderTimeline from "./OrderTimeline";
import {
  CustomerCard,
  PickupAddressCard,
  OrderItemsCard,
  PricingCard,
  WorkersCard,
  PaymentCard,
  BypassPreviewCard,
} from "./OrderDetailSections";

export default function OrderDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const detail = id ? getMockOrderDetail(id) : null;

  // 404 state - order tidak ditemukan
  if (!detail) {
    return (
      <div className="font-dmsans">
        <BackLink />
        <Card>
          <EmptyState
            icon={Package}
            title="Order tidak ditemukan"
            description="Order yang Anda cari mungkin sudah dihapus atau Anda tidak punya akses."
            action={<Button onClick={() => navigate("/admin/orders")}>Kembali ke List</Button>}
          />
        </Card>
      </div>
    );
  }

  const canProcess = detail.status === "SAMPAI_OUTLET";
  const canCancel = [
    "MENUNGGU_PENJEMPUTAN",
    "MENUJU_OUTLET",
    "SAMPAI_OUTLET",
  ].includes(detail.status);

  return (
    <div className="font-dmsans space-y-4">
      <BackLink />

      {/* Header card */}
      <Card variant="bordered">
        <div className="flex justify-between items-start gap-4 flex-wrap">
          <div>
            <p className="font-mono text-xs font-semibold text-[#185FA5]">
              {detail.orderNumber}
            </p>
            <h1 className="text-2xl font-medium text-[#296FDA] mt-1">Order Details</h1>
            <p className="text-xs text-neutral-500 mt-1">
              Created {formatDateTime(detail.createdAt)} · {detail.outletName}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <OrderStatusBadge status={detail.status} />
          </div>
        </div>

        {/* Action buttons */}
        {(canProcess || canCancel) && (
          <div className="flex gap-2 mt-4 pt-4 border-t border-[#BAD6F5]/60">
            {canProcess && (
              <Button onClick={() => navigate(`/admin/orders/${detail.id}/process`)}>
                <Play className="size-4" />
                Process Order
              </Button>
            )}
            {canCancel && (
              <Button variant="danger" size="sm">
                <X className="size-4" />
                Cancel Order
              </Button>
            )}
          </div>
        )}
      </Card>

      {/* Bypass preview (kalo ada) */}
      <BypassPreviewCard detail={detail} />

      {/* Timeline - Section utama */}
      <Card variant="bordered">
        <h3 className="text-base font-medium text-[#296FDA] mb-4">Order Timeline</h3>
        <OrderTimeline detail={detail} />
      </Card>

      {/* Grid 2 kolom - Customer + Pickup */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <CustomerCard detail={detail} />
        <PickupAddressCard detail={detail} />
      </div>

      {/* Grid 2 kolom - Items + Pricing */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <OrderItemsCard detail={detail} />
        <PricingCard detail={detail} />
      </div>

      {/* Grid 2 kolom - Workers + Payment */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <WorkersCard detail={detail} />
        <PaymentCard detail={detail} />
      </div>
    </div>
  );
}

function BackLink() {
  return (
    <Link
      to="/admin/orders"
      className="inline-flex items-center gap-1 text-sm text-[#296FDA] hover:underline font-dmsans"
    >
      <ArrowLeft className="size-4" />
      Back to Orders
    </Link>
  );
}
