import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Check, X, Lock, MessageCircle, Loader2 } from "lucide-react";
import Modal from "../../../components/admin/ui/Modal";
import Input from "../../../components/admin/ui/Input";
import Textarea from "../../../components/admin/ui/Textarea";
import Button from "../../../components/admin/ui/Button";
import BypassStatusBadge from "./BypassStatusBadge";
import { formatDateTime } from "../../../lib/format";
import { getMockBypassDetail } from "../../../lib/mock-bypass";
import {
  bypassReviewSchema,
  type BypassReviewFormData,
} from "./bypass-review.schema";
import type { BypassItem } from "../../../types/bypass.types";

interface BypassReviewModalProps {
  bypassId: string | null;
  onClose: () => void;
  onReviewed: () => void;
}

export default function BypassReviewModal({
  bypassId,
  onClose,
  onReviewed,
}: BypassReviewModalProps) {
  const detail = bypassId ? getMockBypassDetail(bypassId) : null;
  const [decision, setDecision] = useState<"APPROVE" | "REJECT" | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<BypassReviewFormData>({
    resolver: zodResolver(bypassReviewSchema),
    defaultValues: { password: "", adminNotes: "" },
  });

  const handleClose = () => {
    reset();
    setDecision(null);
    onClose();
  };

  const onSubmit = async (_data: BypassReviewFormData) => {
    if (!decision) return;
    setIsSubmitting(true);
    try {
      // TODO: ganti ke real API
      // await bypassApi.review(bypassId!, {
      //   decision,
      //   password: _data.password,
      //   adminNotes: _data.adminNotes,
      // });
      await new Promise((resolve) => setTimeout(resolve, 1200));

      toast.success(
        decision === "APPROVE"
          ? "Bypass disetujui. Order lanjut ke station berikutnya."
          : "Bypass ditolak. Worker harus input ulang quantity."
      );
      onReviewed();
      handleClose();
    } catch {
      toast.error("Gagal review bypass. Cek password Anda.");
      setIsSubmitting(false);
    }
  };

  if (!detail) return null;

  const isReadOnly = detail.status !== "PENDING";

  return (
    <Modal
      isOpen={!!bypassId}
      onClose={handleClose}
      title="Review Bypass Request"
      size="lg"
    >
      {/* Header order info */}
      <div className="mb-4">
        <p className="font-mono text-xs font-semibold text-[#185FA5]">
          {detail.orderNumber}
        </p>
        <p className="text-sm mt-1">
          <span className="text-neutral-500">Worker:</span>{" "}
          <span className="font-medium">{detail.workerName}</span>{" "}
          <span className="text-neutral-500">·</span>{" "}
          <span className="text-neutral-600">{detail.workerStation} Station</span>
        </p>
        <p className="text-xs text-neutral-500 mt-1">
          Submitted {formatDateTime(detail.createdAt)}
        </p>
      </div>

      {/* Worker notes */}
      <div className="bg-[#FAEEDA] rounded-lg p-3 mb-4">
        <p className="text-xs font-medium text-[#854F0B] flex items-center gap-1 mb-1">
          <MessageCircle className="size-3" />
          Worker Notes:
        </p>
        <p className="text-sm text-[#854F0B]">"{detail.workerNotes}"</p>
      </div>

      {/* Side-by-side comparison */}
      <p className="text-sm font-medium text-neutral-700 mb-2">
        Quantity Comparison
      </p>
      <ComparisonTable items={detail.items} />

      {/* If already reviewed, show admin notes (read-only) */}
      {isReadOnly && (
        <div className="mt-4 p-3 bg-neutral-50 rounded-lg border border-neutral-200">
          <div className="flex justify-between items-center mb-2">
            <p className="text-xs text-neutral-500">
              Reviewed by{" "}
              <span className="font-medium">{detail.reviewedByAdminName}</span>{" "}
              · {detail.reviewedAt && formatDateTime(detail.reviewedAt)}
            </p>
            <BypassStatusBadge status={detail.status} />
          </div>
          {detail.adminNotes && (
            <p className="text-sm text-neutral-700">"{detail.adminNotes}"</p>
          )}
        </div>
      )}

      {/* Review form (cuma kalo masih pending) */}
      {!isReadOnly && (
        <form onSubmit={handleSubmit(onSubmit)} className="mt-4">
          {/* Re-auth warning */}
          <div className="bg-red-50 border-l-4 border-red-600 p-3 mb-4">
            <p className="text-xs text-red-700 flex items-start gap-1">
              <Lock className="size-3 mt-0.5 shrink-0" />
              <span>
                Bypass memerlukan autentikasi admin. Masukkan password Anda
                untuk konfirmasi sebelum approve/reject.
              </span>
            </p>
          </div>

          {/* Password input */}
          <Input
            id="bypass-password"
            type="password"
            label="Password Admin *"
            placeholder="••••••••"
            autoComplete="current-password"
            {...register("password")}
            error={errors.password?.message}
          />

          {/* Admin notes */}
          <div className="mt-3">
            <Textarea
              id="bypass-admin-notes"
              label="Catatan Approval (opsional)"
              placeholder="Alasan approve/reject..."
              {...register("adminNotes")}
              error={errors.adminNotes?.message}
            />
          </div>

          {/* Action buttons */}
          <div className="flex gap-2 justify-end mt-4">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleClose}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="danger"
              size="sm"
              onClick={() => setDecision("REJECT")}
              isLoading={isSubmitting && decision === "REJECT"}
              disabled={isSubmitting}
            >
              {isSubmitting && decision === "REJECT" ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                <X className="size-4" />
              )}
              Reject
            </Button>
            <Button
              type="submit"
              size="sm"
              onClick={() => setDecision("APPROVE")}
              isLoading={isSubmitting && decision === "APPROVE"}
              disabled={isSubmitting}
              className="!bg-[#047857] hover:!bg-[#065f46] !border-[#047857]"
            >
              <Check className="size-4" />
              Approve
            </Button>
          </div>
        </form>
      )}

      {/* Close button kalo udah read-only */}
      {isReadOnly && (
        <div className="flex justify-end mt-4">
          <Button variant="outline" size="sm" onClick={handleClose}>
            Close
          </Button>
        </div>
      )}
    </Modal>
  );
}

// Sub-component: Comparison table dengan highlight mismatch
function ComparisonTable({ items }: { items: BypassItem[] }) {
  return (
    <table className="w-full text-sm border border-neutral-200 rounded-lg overflow-hidden">
      <thead className="bg-neutral-50">
        <tr>
          <Th>Item</Th>
          <Th align="center">Expected</Th>
          <Th align="center">Actual</Th>
          <Th align="center">Diff</Th>
        </tr>
      </thead>
      <tbody>
        {items.map((item) => {
          const diff = item.actualQty - item.expectedQty;
          const isMismatch = diff !== 0;
          return (
            <tr
              key={item.laundryItemId}
              className={`border-t border-neutral-100 ${
                isMismatch ? "bg-red-50" : ""
              }`}
            >
              <td
                className={`px-3 py-2 ${
                  isMismatch ? "text-red-900 font-medium" : "text-neutral-700"
                }`}
              >
                {item.laundryItemName}
              </td>
              <td
                className={`px-3 py-2 text-center ${
                  isMismatch ? "text-red-900" : "text-neutral-700"
                }`}
              >
                {item.expectedQty}
              </td>
              <td
                className={`px-3 py-2 text-center ${
                  isMismatch ? "text-red-900 font-semibold" : "text-neutral-700"
                }`}
              >
                {item.actualQty}
              </td>
              <td
                className={`px-3 py-2 text-center font-medium ${
                  isMismatch ? "text-red-900" : "text-[#047857]"
                }`}
              >
                {isMismatch
                  ? diff > 0
                    ? `+${diff}`
                    : `${diff}`
                  : "✓"}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

function Th({
  children,
  align = "left",
}: {
  children: React.ReactNode;
  align?: "left" | "center";
}) {
  return (
    <th
      className={`px-3 py-2 text-xs font-medium text-neutral-500 uppercase tracking-wide text-${align}`}
    >
      {children}
    </th>
  );
}
