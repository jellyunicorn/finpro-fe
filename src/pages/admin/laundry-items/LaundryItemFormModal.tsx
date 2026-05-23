import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Check } from "lucide-react";
import Modal from "../../../components/admin/ui/Modal";
import Input from "../../../components/admin/ui/Input";
import Textarea from "../../../components/admin/ui/Textarea";
import Checkbox from "../../../components/admin/ui/Checkbox";
import Button from "../../../components/admin/ui/Button";
import {
  laundryItemSchema,
  type LaundryItemFormData,
} from "./laundry-item.schema";
import type { LaundryItem } from "../../../types/laundry-item.types";

interface LaundryItemFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (data: LaundryItem) => void;
  editingItem: LaundryItem | null;
}

export default function LaundryItemFormModal({
  isOpen,
  onClose,
  onSuccess,
  editingItem,
}: LaundryItemFormModalProps) {
  const isEdit = !!editingItem;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<LaundryItemFormData>({
    resolver: zodResolver(laundryItemSchema),
    defaultValues: { name: "", description: "", isActive: true },
  });

  // Reset form pas modal dibuka (sync dengan editingItem)
  useEffect(() => {
    if (isOpen) {
      reset(
        editingItem
          ? {
              name: editingItem.name,
              description: editingItem.description ?? "",
              isActive: editingItem.isActive,
            }
          : { name: "", description: "", isActive: true }
      );
    }
  }, [isOpen, editingItem, reset]);

  const onSubmit = async (data: LaundryItemFormData) => {
    try {
      // TODO: ganti ke real API
      // const result = isEdit
      //   ? await laundryItemApi.update(editingItem.id, data)
      //   : await laundryItemApi.create(data);
      await new Promise((resolve) => setTimeout(resolve, 800));

      const result: LaundryItem = {
        id: editingItem?.id ?? `item-${Date.now()}`,
        name: data.name,
        description: data.description || null,
        isActive: data.isActive,
        createdAt: editingItem?.createdAt ?? new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      toast.success(
        isEdit
          ? `Item "${data.name}" berhasil diupdate!`
          : `Item "${data.name}" berhasil dibuat!`
      );
      onSuccess(result);
      onClose();
    } catch {
      toast.error("Gagal menyimpan item. Coba lagi.");
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isEdit ? "Edit Laundry Item" : "Tambah Laundry Item"}
      size="sm"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input
          id="li-name"
          label="Nama Item *"
          placeholder="contoh: Kaos, Celana Panjang"
          {...register("name")}
          error={errors.name?.message}
          autoFocus
        />
        <Textarea
          id="li-description"
          label="Deskripsi (opsional)"
          placeholder="Info tambahan tentang item ini..."
          {...register("description")}
          error={errors.description?.message}
        />
        <div className="pt-1">
          <Checkbox id="li-isActive" label="Item Aktif" {...register("isActive")} />
          <p className="text-xs text-neutral-500 mt-1 ml-6">
            Item yang non-aktif tidak akan muncul di form Process Order.
          </p>
        </div>

        <div className="flex gap-2 justify-end pt-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={onClose}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button type="submit" size="sm" isLoading={isSubmitting}>
            <Check className="size-4" />
            {isEdit ? "Update" : "Simpan"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
