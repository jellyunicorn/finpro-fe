import { Link } from "react-router";
import {
  User,
  MapPin,
  Shirt,
  Receipt,
  Users,
  CreditCard,
  AlertCircle,
} from "lucide-react";
import Card from "../../../components/admin/ui/Card";
import StatusBadge from "../../../components/admin/ui/StatusBadge";
import { formatCurrency, formatDateTime, formatWeight } from "../../../lib/format";
import type { OrderDetail } from "../../../types/order.types";

interface SectionProps {
  detail: OrderDetail;
}

// ── Customer Info Card ──────────────────────────────────
export function CustomerCard({ detail }: SectionProps) {
  const { customer } = detail;
  return (
    <Card variant="bordered">
      <h3 className="text-sm font-medium text-[#296FDA] mb-3 flex items-center gap-2">
        <User className="size-4" />
        Customer
      </h3>
      <p className="font-medium text-sm text-neutral-800">{customer.name}</p>
      <p className="text-xs text-neutral-500 mt-1">{customer.email}</p>
      {customer.phone && (
        <p className="text-xs text-neutral-500 mt-0.5">{customer.phone}</p>
      )}
    </Card>
  );
}

// ── Pickup Address Card ─────────────────────────────────
export function PickupAddressCard({ detail }: SectionProps) {
  const { pickupAddressSnapshot, pickupScheduledAt } = detail;
  return (
    <Card variant="bordered">
      <h3 className="text-sm font-medium text-[#296FDA] mb-3 flex items-center gap-2">
        <MapPin className="size-4" />
        Pickup Address
      </h3>
      {pickupAddressSnapshot.label && (
        <StatusBadge variant="mint" className="mb-2">
          {pickupAddressSnapshot.label}
        </StatusBadge>
      )}
      <p className="text-sm text-neutral-700">{pickupAddressSnapshot.fullAddress}</p>
      <p className="text-xs text-neutral-500 mt-1">
        {pickupAddressSnapshot.city}, {pickupAddressSnapshot.province}
        {pickupAddressSnapshot.postalCode && `, ${pickupAddressSnapshot.postalCode}`}
      </p>
      <div className="mt-3 pt-3 border-t border-[#BAD6F5]/60">
        <p className="text-xs text-neutral-500">Pickup Schedule</p>
        <p className="text-sm font-medium text-neutral-700 mt-0.5">
          {formatDateTime(pickupScheduledAt)}
        </p>
      </div>
    </Card>
  );
}

// ── Order Items Card ────────────────────────────────────
export function OrderItemsCard({ detail }: SectionProps) {
  const { orderItems } = detail;
  const totalQty = orderItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <Card variant="bordered">
      <h3 className="text-sm font-medium text-[#296FDA] mb-3 flex items-center gap-2">
        <Shirt className="size-4" />
        Order Items ({orderItems.length} jenis, {totalQty} pcs)
      </h3>
      {orderItems.length === 0 ? (
        <p className="text-xs text-neutral-400 italic">
          Belum input items (menunggu admin process order)
        </p>
      ) : (
        <table className="w-full text-sm">
          <tbody>
            {orderItems.map((item) => (
              <tr key={item.id} className="border-b border-neutral-100 last:border-0">
                <td className="py-2 text-neutral-700">{item.laundryItemName}</td>
                <td className="py-2 text-right text-neutral-500">
                  {item.quantity} pcs
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </Card>
  );
}

// ── Pricing Breakdown Card ──────────────────────────────
export function PricingCard({ detail }: SectionProps) {
  const { totalWeightKg, totalAmount } = detail;
  // Estimasi breakdown (real implementation harusnya dari backend)
  const pricePerKg = totalWeightKg && totalAmount ? totalAmount * 0.85 / totalWeightKg : 0;
  const subtotal = (totalWeightKg ?? 0) * pricePerKg;
  const deliveryFee = totalAmount ? totalAmount - subtotal : 0;

  return (
    <Card className="bg-[#E6F1FB] border border-[#BAD6F5]">
      <h3 className="text-sm font-medium text-[#185FA5] mb-3 flex items-center gap-2">
        <Receipt className="size-4" />
        Pricing Breakdown
      </h3>
      <table className="w-full text-sm">
        <tbody>
          <tr>
            <td className="py-1 text-neutral-600">Total Weight</td>
            <td className="py-1 text-right">{formatWeight(totalWeightKg)}</td>
          </tr>
          <tr>
            <td className="py-1 text-neutral-600">Price / kg</td>
            <td className="py-1 text-right">{formatCurrency(Math.round(pricePerKg))}</td>
          </tr>
          <tr>
            <td className="py-1 text-neutral-600">Delivery Fee</td>
            <td className="py-1 text-right">{formatCurrency(Math.round(deliveryFee))}</td>
          </tr>
          <tr className="border-t border-[#BAD6F5]">
            <td className="pt-3 font-medium text-[#185FA5]">Total</td>
            <td className="pt-3 text-right font-semibold text-[#185FA5] text-base">
              {formatCurrency(totalAmount)}
            </td>
          </tr>
        </tbody>
      </table>
    </Card>
  );
}

// ── Workers Assigned Card ───────────────────────────────
export function WorkersCard({ detail }: SectionProps) {
  const workerList = [
    { label: "Washing", worker: detail.washingWorker, timestamp: detail.washingCompletedAt },
    { label: "Ironing", worker: detail.ironingWorker, timestamp: detail.ironingCompletedAt },
    { label: "Packing", worker: detail.packingWorker, timestamp: detail.packingCompletedAt },
  ];

  return (
    <Card variant="bordered">
      <h3 className="text-sm font-medium text-[#296FDA] mb-3 flex items-center gap-2">
        <Users className="size-4" />
        Workers Assigned
      </h3>
      <div className="space-y-3">
        {workerList.map(({ label, worker, timestamp }) => (
          <div key={label} className="flex items-center justify-between">
            <div>
              <p className="text-xs text-neutral-500">{label}</p>
              <p className="text-sm font-medium text-neutral-800">
                {worker?.name ?? <span className="text-neutral-400 italic">Belum di-assign</span>}
              </p>
            </div>
            {timestamp && (
              <span className="text-xs text-neutral-500">
                {formatDateTime(timestamp)}
              </span>
            )}
          </div>
        ))}
        {detail.pickupDriver && (
          <div className="pt-3 border-t border-[#BAD6F5]/60">
            <p className="text-xs text-neutral-500">Pickup Driver</p>
            <p className="text-sm font-medium text-neutral-800">{detail.pickupDriver.name}</p>
          </div>
        )}
        {detail.deliveryDriver && (
          <div>
            <p className="text-xs text-neutral-500">Delivery Driver</p>
            <p className="text-sm font-medium text-neutral-800">{detail.deliveryDriver.name}</p>
          </div>
        )}
      </div>
    </Card>
  );
}

// ── Payment Status Card ─────────────────────────────────
export function PaymentCard({ detail }: SectionProps) {
  const isPaid = !!detail.paidAt;
  return (
    <Card variant="bordered">
      <h3 className="text-sm font-medium text-[#296FDA] mb-3 flex items-center gap-2">
        <CreditCard className="size-4" />
        Payment Status
      </h3>
      <div className="flex items-center justify-between">
        <span className="text-sm text-neutral-600">Status</span>
        {isPaid ? (
          <StatusBadge variant="mint">Paid</StatusBadge>
        ) : detail.totalAmount ? (
          <StatusBadge variant="peach">Unpaid</StatusBadge>
        ) : (
          <StatusBadge variant="neutral">Pending Process</StatusBadge>
        )}
      </div>
      {detail.paidAt && (
        <div className="flex items-center justify-between mt-3 pt-3 border-t border-[#BAD6F5]/60">
          <span className="text-sm text-neutral-600">Paid At</span>
          <span className="text-sm font-medium text-neutral-800">
            {formatDateTime(detail.paidAt)}
          </span>
        </div>
      )}
    </Card>
  );
}

// ── Bypass Requests Preview ─────────────────────────────
export function BypassPreviewCard({ detail }: SectionProps) {
  // Mock: 30% kemungkinan ada bypass request buat order yang udah masuk processing
  const hasBypass =
    ["SEDANG_DICUCI", "SEDANG_DISETRIKA", "SEDANG_DIPACKING"].includes(
      detail.status
    ) && parseInt(detail.id.split("-")[1]) % 3 === 0;

  if (!hasBypass) return null;

  return (
    <Card className="border-2 border-[#FED7AA] bg-[#FFFBEB]">
      <h3 className="text-sm font-medium text-[#B45309] mb-3 flex items-center gap-2">
        <AlertCircle className="size-4" />
        Bypass Request Pending
      </h3>
      <p className="text-sm text-neutral-700">
        Ada 1 request bypass dari worker pas quantity tidak match.
      </p>
      <Link
        to="/admin/bypass-requests"
        className="inline-block mt-3 text-sm font-medium text-[#B45309] hover:underline"
      >
        Review Bypass →
      </Link>
    </Card>
  );
}
