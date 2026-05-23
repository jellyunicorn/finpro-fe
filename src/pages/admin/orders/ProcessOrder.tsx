import { useState } from "react";
import { Link, useParams, useNavigate } from "react-router";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import {
  ArrowLeft,
  Info,
  Weight,
  Shirt,
  Plus,
  Trash2,
  Receipt,
  Check,
  Package,
} from "lucide-react";
import Card from "../../../components/admin/ui/Card";
import Button from "../../../components/admin/ui/Button";
import Input from "../../../components/admin/ui/Input";
import Select from "../../../components/admin/ui/Select";
import Textarea from "../../../components/admin/ui/Textarea";
import ConfirmDialog from "../../../components/admin/ui/ConfirmDialog";
import Alert from "../../../components/admin/ui/Alert";
import OrderStatusBadge from "../../../components/admin/common/OrderStatusBadge";
import EmptyState from "../../../components/admin/common/EmptyState";
import { getMockOrderDetail } from "../../../lib/mock-orders";
import {
  MOCK_LAUNDRY_ITEMS,
  PRICE_PER_KG,
  DELIVERY_FEE,
} from "../../../lib/mock-laundry-items";
import { formatCurrency } from "../../../lib/format";
import {
  processOrderSchema,
  type ProcessOrderFormData,
} from "./process-order.schema";

const ITEM_OPTIONS = MOCK_LAUNDRY_ITEMS.filter((i) => i.isActive).map((i) => ({
  value: i.id,
  label: i.name,
}));

export default function ProcessOrder() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const detail = id ? getMockOrderDetail(id) : null;

  const [showConfirm, setShowConfirm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ProcessOrderFormData>({
    resolver: zodResolver(processOrderSchema),
    defaultValues: {
      totalWeightKg: 0,
      items: [{ laundryItemId: "", quantity: 1 }],
      notes: "",
    },
    mode: "onChange",
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "items",
  });

  // Watch values untuk real-time pricing preview
  const watchedWeight = watch("totalWeightKg") || 0;
  const subtotal = watchedWeight * PRICE_PER_KG;
  const total = subtotal + DELIVERY_FEE;

  const onSubmit = (data: ProcessOrderFormData) => {
    // Tampilkan confirm dialog sebelum submit beneran
    console.log("Form data ready to submit:", data);
    setShowConfirm(true);
  };

  const handleConfirmSubmit = async () => {
    setIsSubmitting(true);
    try {
      // TODO: ganti ke real API call
      // await orderApi.process(id!, formData);
      await new Promise((resolve) => setTimeout(resolve, 1500)); // simulate

      toast.success("Order berhasil di-process! Sedang diteruskan ke washing worker.");
      navigate(`/admin/orders/${id}`);
    } catch {
      toast.error("Gagal process order. Coba lagi.");
      setIsSubmitting(false);
      setShowConfirm(false);
    }
  };

  // 404 atau wrong status guard
  if (!detail) {
    return (
      <div className="font-dmsans">
        <Card>
          <EmptyState
            icon={Package}
            title="Order tidak ditemukan"
            action={<Button onClick={() => navigate("/admin/orders")}>Kembali</Button>}
          />
        </Card>
      </div>
    );
  }

  if (detail.status !== "SAMPAI_OUTLET") {
    return (
      <div className="font-dmsans space-y-4">
        <BackLink to={`/admin/orders/${id}`} label="Back to Order Detail" />
        <Card>
          <Alert variant="warning">
            Order ini tidak dapat di-process. Status saat ini:{" "}
            <strong>{detail.status}</strong>. Process hanya bisa dilakukan pas status "Sampai Outlet".
          </Alert>
          <div className="mt-4 flex justify-end">
            <Button onClick={() => navigate(`/admin/orders/${id}`)}>
              Lihat Detail Order
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="font-dmsans space-y-4">
      <BackLink to={`/admin/orders/${id}`} label="Back to Order Detail" />

      {/* Order header recap */}
      <Card variant="bordered">
        <div className="flex justify-between items-start gap-4 flex-wrap">
          <div>
            <p className="font-mono text-xs font-semibold text-[#185FA5]">
              {detail.orderNumber}
            </p>
            <h1 className="text-2xl font-medium text-[#296FDA] mt-1">Process Order</h1>
            <p className="text-xs text-neutral-500 mt-1">
              {detail.customer.name} · {detail.outletName}
            </p>
          </div>
          <OrderStatusBadge status={detail.status} />
        </div>
      </Card>

      {/* Info banner */}
      <Alert variant="warning">
        Pastikan jumlah item sesuai dengan yang dibawa driver. Setelah submit,
        order akan diteruskan ke washing worker.
      </Alert>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Total Weight */}
        <Card variant="bordered">
          <h3 className="text-base font-medium text-[#296FDA] mb-3 flex items-center gap-2">
            <Weight className="size-4" />
            Total Weight
          </h3>
          <div className="flex items-center gap-3">
            <Input
              type="number"
              step="0.1"
              placeholder="3.5"
              {...register("totalWeightKg", { valueAsNumber: true })}
              error={errors.totalWeightKg?.message}
              className="w-40"
            />
            <span className="text-sm text-neutral-500">kilogram</span>
          </div>
        </Card>

        {/* Items repeater */}
        <Card variant="bordered">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-base font-medium text-[#296FDA] flex items-center gap-2">
              <Shirt className="size-4" />
              Items ({fields.length})
            </h3>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => append({ laundryItemId: "", quantity: 1 })}
            >
              <Plus className="size-4" />
              Tambah Item
            </Button>
          </div>

          {/* Error global untuk items array */}
          {errors.items?.root && (
            <p className="text-xs text-[#F87171] mb-3">
              {errors.items.root.message}
            </p>
          )}
          {typeof errors.items?.message === "string" && (
            <p className="text-xs text-[#F87171] mb-3">{errors.items.message}</p>
          )}

          <div className="space-y-3">
            {fields.map((field, index) => (
              <ItemRow
                key={field.id}
                index={index}
                control={control}
                register={register}
                onRemove={() => remove(index)}
                canRemove={fields.length > 1}
                error={errors.items?.[index]}
              />
            ))}
          </div>
        </Card>

        {/* Real-time pricing preview */}
        <Card className="bg-[#E6F1FB] border border-[#BAD6F5]">
          <h3 className="text-sm font-medium text-[#185FA5] mb-3 flex items-center gap-2">
            <Receipt className="size-4" />
            Pricing Preview
          </h3>
          <table className="w-full text-sm">
            <tbody>
              <tr>
                <td className="py-1 text-neutral-600">Weight × Price/kg</td>
                <td className="py-1 text-right">
                  {watchedWeight || 0} × {formatCurrency(PRICE_PER_KG)}
                </td>
              </tr>
              <tr>
                <td className="py-1 text-neutral-600">Subtotal</td>
                <td className="py-1 text-right">{formatCurrency(subtotal)}</td>
              </tr>
              <tr>
                <td className="py-1 text-neutral-600">Delivery Fee</td>
                <td className="py-1 text-right">{formatCurrency(DELIVERY_FEE)}</td>
              </tr>
              <tr className="border-t border-[#BAD6F5]">
                <td className="pt-3 font-medium text-[#185FA5]">Total</td>
                <td className="pt-3 text-right font-semibold text-[#185FA5] text-lg">
                  {formatCurrency(total)}
                </td>
              </tr>
            </tbody>
          </table>
        </Card>

        {/* Notes */}
        <Card variant="bordered">
          <h3 className="text-base font-medium text-[#296FDA] mb-3">
            Notes (Opsional)
          </h3>
          <Textarea
            id="notes"
            placeholder="Catatan tambahan untuk worker (misal: ada noda di kemeja putih)"
            {...register("notes")}
            error={errors.notes?.message}
          />
        </Card>

        {/* Action buttons */}
        <div className="flex gap-3 justify-end">
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate(`/admin/orders/${id}`)}
          >
            Cancel
          </Button>
          <Button type="submit">
            <Check className="size-4" />
            Submit &amp; Send to Washing
          </Button>
        </div>
      </form>

      {/* Confirm dialog */}
      <ConfirmDialog
        isOpen={showConfirm}
        onClose={() => setShowConfirm(false)}
        onConfirm={handleConfirmSubmit}
        title="Konfirmasi Process Order"
        message={`Apakah data sudah benar? Setelah submit, order akan diteruskan ke washing worker dan status berubah menjadi "Sedang Dicuci".`}
        confirmLabel="Ya, Submit"
        isLoading={isSubmitting}
      />
    </div>
  );
}

// ── Sub-components ──────────────────────────────────────

function BackLink({ to, label }: { to: string; label: string }) {
  return (
    <Link
      to={to}
      className="inline-flex items-center gap-1 text-sm text-[#296FDA] hover:underline"
    >
      <ArrowLeft className="size-4" />
      {label}
    </Link>
  );
}

interface ItemRowProps {
  index: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register: any;
  onRemove: () => void;
  canRemove: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error?: any;
}

function ItemRow({ index, control, register, onRemove, canRemove, error }: ItemRowProps) {
  return (
    <div className="flex gap-2 items-start pb-3 border-b border-neutral-100 last:border-0 last:pb-0">
      <div className="flex-1">
        <Controller
          control={control}
          name={`items.${index}.laundryItemId`}
          render={({ field }) => (
            <Select
              {...field}
              placeholder="Pilih jenis pakaian"
              options={ITEM_OPTIONS}
              className="w-full"
            />
          )}
        />
        {error?.laundryItemId && (
          <p className="text-xs text-[#F87171] mt-1">{error.laundryItemId.message}</p>
        )}
      </div>
      <div className="w-24">
        <Input
          type="number"
          min={1}
          placeholder="Qty"
          {...register(`items.${index}.quantity`, { valueAsNumber: true })}
          error={error?.quantity?.message}
        />
      </div>
      <span className="text-xs text-neutral-500 self-center pt-2 w-8">pcs</span>
      <button
        type="button"
        onClick={onRemove}
        disabled={!canRemove}
        className="size-10 mt-0 flex items-center justify-center rounded-lg border border-red-200 text-[#F87171] hover:bg-red-50 hover:cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        aria-label="Hapus item"
      >
        <Trash2 className="size-4" />
      </button>
    </div>
  );
}

// Hint helper - dropped Info import unused
void Info;
