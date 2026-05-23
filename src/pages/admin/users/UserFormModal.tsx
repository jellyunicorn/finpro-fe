import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Check, Info } from "lucide-react";
import Modal from "../../../components/admin/ui/Modal";
import Input from "../../../components/admin/ui/Input";
import Select from "../../../components/admin/ui/Select";
import Checkbox from "../../../components/admin/ui/Checkbox";
import Button from "../../../components/admin/ui/Button";
import { userSchema, type UserFormData } from "./user.schema";
import {
  generateTempPassword,
  MOCK_OUTLETS_DROPDOWN,
} from "../../../lib/mock-users";
import {
  ROLE_LABELS,
  STATION_LABELS,
  type AppUser,
} from "../../../types/user.types";

const ROLE_OPTIONS = Object.entries(ROLE_LABELS)
  .filter(([role]) => role !== "CUSTOMER") // Admin gak bisa create customer
  .map(([value, label]) => ({ value, label }));

const STATION_OPTIONS = Object.entries(STATION_LABELS).map(([value, label]) => ({
  value,
  label,
}));

const OUTLET_OPTIONS = MOCK_OUTLETS_DROPDOWN.map((o) => ({
  value: o.id,
  label: o.name,
}));

interface UserFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (user: AppUser, tempPassword?: string) => void;
  editingUser: AppUser | null;
}

export default function UserFormModal({
  isOpen,
  onClose,
  onSuccess,
  editingUser,
}: UserFormModalProps) {
  const isEdit = !!editingUser;

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<UserFormData>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      role: "OUTLET_ADMIN",
      outletId: "",
      workerStation: undefined,
      isActive: true,
    },
  });

  // Watch role - this is THE KEY for conditional fields
  const watchedRole = watch("role");

  const needsOutlet = ["OUTLET_ADMIN", "WORKER", "DRIVER"].includes(watchedRole);
  const needsStation = watchedRole === "WORKER";

  // Auto-clear conditional fields kalo role berubah
  useEffect(() => {
    if (!needsOutlet) setValue("outletId", "");
    if (!needsStation) setValue("workerStation", undefined);
  }, [watchedRole, needsOutlet, needsStation, setValue]);

  // Reset form pas modal dibuka
  useEffect(() => {
    if (isOpen) {
      reset(
        editingUser
          ? {
              name: editingUser.name,
              email: editingUser.email,
              phone: editingUser.phone ?? "",
              role: editingUser.role,
              outletId: editingUser.outletId ?? "",
              workerStation: editingUser.workerStation ?? undefined,
              isActive: editingUser.isActive,
            }
          : {
              name: "",
              email: "",
              phone: "",
              role: "OUTLET_ADMIN",
              outletId: "",
              workerStation: undefined,
              isActive: true,
            }
      );
    }
  }, [isOpen, editingUser, reset]);

  const onSubmit = async (data: UserFormData) => {
    try {
      // TODO: ganti ke real API
      // const result = isEdit
      //   ? await userApi.update(editingUser.id, data)
      //   : await userApi.create(data);
      await new Promise((resolve) => setTimeout(resolve, 900));

      const outletName = data.outletId
        ? MOCK_OUTLETS_DROPDOWN.find((o) => o.id === data.outletId)?.name ?? null
        : null;

      const savedUser: AppUser = {
        id: editingUser?.id ?? `user-${Date.now()}`,
        name: data.name,
        email: data.email,
        phone: data.phone || null,
        role: data.role,
        outletId: data.outletId || null,
        outletName,
        workerStation: data.workerStation ?? null,
        isVerified: editingUser?.isVerified ?? false,
        isActive: data.isActive,
        profilePhoto: editingUser?.profilePhoto ?? null,
        createdAt: editingUser?.createdAt ?? new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      if (isEdit) {
        toast.success(`User "${data.name}" berhasil diupdate!`);
        onSuccess(savedUser);
      } else {
        // Create flow: trigger temp password modal
        const tempPassword = generateTempPassword();
        onSuccess(savedUser, tempPassword);
      }
      onClose();
    } catch {
      toast.error("Gagal menyimpan user. Coba lagi.");
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isEdit ? "Edit User" : "Tambah User Baru"}
      size="md"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        {/* Basic fields */}
        <Input
          id="user-name"
          label="Nama Lengkap *"
          placeholder="Budi Hartono"
          {...register("name")}
          error={errors.name?.message}
          autoFocus
        />
        <Input
          id="user-email"
          type="email"
          label="Email *"
          placeholder="user@claundry.com"
          {...register("email")}
          error={errors.email?.message}
          disabled={isEdit} // Email gak boleh diubah pas edit (harus verify ulang)
        />
        {isEdit && (
          <p className="-mt-2 text-xs text-neutral-500 italic">
            Email tidak dapat diubah dari sini (user harus pakai fitur "update email" sendiri)
          </p>
        )}
        <Input
          id="user-phone"
          type="tel"
          label="Phone"
          placeholder="+62 812 3456 7890"
          {...register("phone")}
          error={errors.phone?.message}
        />

        {/* Role - critical untuk conditional fields */}
        <div>
          <label
            htmlFor="user-role"
            className="text-neutral-500 text-sm font-medium block mb-1"
          >
            Role *
          </label>
          <Select
            id="user-role"
            options={ROLE_OPTIONS}
            placeholder="Pilih role..."
            className="w-full"
            {...register("role")}
          />
          {errors.role && (
            <p className="text-xs text-[#F87171] mt-1">{errors.role.message}</p>
          )}
        </div>

        {/* CONDITIONAL FIELDS - muncul/hilang based on role */}
        {(needsOutlet || needsStation) && (
          <div className="bg-[#E6F1FB] border-l-4 border-[#185FA5] px-3 py-2 mb-1">
            <p className="text-xs text-[#185FA5] flex items-center gap-1">
              <Info className="size-3" />
              Field tambahan untuk role {ROLE_LABELS[watchedRole]}:
            </p>
          </div>
        )}

        {needsOutlet && (
          <div>
            <label
              htmlFor="user-outletId"
              className="text-neutral-500 text-sm font-medium block mb-1"
            >
              Outlet *
            </label>
            <Select
              id="user-outletId"
              options={OUTLET_OPTIONS}
              placeholder="Pilih outlet..."
              className="w-full"
              {...register("outletId")}
            />
            {errors.outletId && (
              <p className="text-xs text-[#F87171] mt-1">
                {errors.outletId.message}
              </p>
            )}
          </div>
        )}

        {needsStation && (
          <div>
            <label
              htmlFor="user-workerStation"
              className="text-neutral-500 text-sm font-medium block mb-1"
            >
              Worker Station *
            </label>
            <Select
              id="user-workerStation"
              options={STATION_OPTIONS}
              placeholder="Pilih station..."
              className="w-full"
              {...register("workerStation")}
            />
            {errors.workerStation && (
              <p className="text-xs text-[#F87171] mt-1">
                {errors.workerStation.message}
              </p>
            )}
          </div>
        )}

        {/* Is active toggle */}
        <div className="pt-1">
          <Checkbox
            id="user-isActive"
            label="User Aktif"
            {...register("isActive")}
          />
          <p className="text-xs text-neutral-500 mt-1 ml-6">
            User non-aktif tidak dapat login ke aplikasi.
          </p>
        </div>

        {/* Action buttons */}
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
