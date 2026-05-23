import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Info, MapPin, Coins, Check } from "lucide-react";
import Card from "../../../components/admin/ui/Card";
import Button from "../../../components/admin/ui/Button";
import Input from "../../../components/admin/ui/Input";
import Textarea from "../../../components/admin/ui/Textarea";
import Checkbox from "../../../components/admin/ui/Checkbox";
import MapPicker from "../../../components/admin/common/MapPicker";
import { outletSchema, type OutletFormData } from "./outlet.schema";
import { DEFAULT_JAKARTA_COORDS } from "../../../lib/mock-outlets";
import type { Outlet } from "../../../types/outlet.types";

interface OutletFormProps {
  initialData?: Outlet;
  onSubmit: (data: OutletFormData) => void | Promise<void>;
  onCancel: () => void;
  isSubmitting?: boolean;
  submitLabel?: string;
}

export default function OutletForm({
  initialData,
  onSubmit,
  onCancel,
  isSubmitting,
  submitLabel = "Create Outlet",
}: OutletFormProps) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<OutletFormData>({
    resolver: zodResolver(outletSchema),
    defaultValues: initialData ?? {
      name: "",
      fullAddress: "",
      city: "",
      province: "",
      postalCode: "",
      latitude: DEFAULT_JAKARTA_COORDS.latitude,
      longitude: DEFAULT_JAKARTA_COORDS.longitude,
      serviceRadiusKm: 5,
      pricePerKg: 12000,
      deliveryFeePerKm: 2000,
      isActive: true,
    },
    mode: "onChange",
  });

  const lat = watch("latitude");
  const lng = watch("longitude");

  const handleMapChange = (newLat: number, newLng: number) => {
    setValue("latitude", parseFloat(newLat.toFixed(6)), { shouldValidate: true });
    setValue("longitude", parseFloat(newLng.toFixed(6)), { shouldValidate: true });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 font-dmsans">
      {/* 2-column: Outlet Info + Map */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Outlet Info */}
        <Card variant="bordered">
          <h3 className="text-base font-medium text-[#296FDA] mb-4 flex items-center gap-2">
            <Info className="size-4" />
            Outlet Info
          </h3>
          <div className="space-y-3">
            <Input
              id="name"
              label="Nama Outlet *"
              placeholder="Outlet Kemang"
              {...register("name")}
              error={errors.name?.message}
            />
            <Textarea
              id="fullAddress"
              label="Alamat Lengkap *"
              placeholder="Jl. ..."
              {...register("fullAddress")}
              error={errors.fullAddress?.message}
            />
            <div className="grid grid-cols-2 gap-2">
              <Input
                id="city"
                label="City *"
                placeholder="Jakarta Selatan"
                {...register("city")}
                error={errors.city?.message}
              />
              <Input
                id="province"
                label="Province *"
                placeholder="DKI Jakarta"
                {...register("province")}
                error={errors.province?.message}
              />
            </div>
            <Input
              id="postalCode"
              label="Postal Code"
              placeholder="12730"
              {...register("postalCode")}
              error={errors.postalCode?.message}
            />
            <div className="pt-2">
              <Checkbox id="isActive" label="Outlet Aktif" {...register("isActive")} />
            </div>
          </div>
        </Card>

        {/* Map Picker */}
        <Card variant="bordered">
          <h3 className="text-base font-medium text-[#296FDA] mb-3 flex items-center gap-2">
            <MapPin className="size-4" />
            Lokasi
          </h3>
          <MapPicker
            latitude={lat}
            longitude={lng}
            onChange={handleMapChange}
            height="240px"
          />
          <div className="grid grid-cols-2 gap-2 mt-3">
            <Input
              id="latitude"
              type="number"
              step="0.000001"
              label="Latitude"
              {...register("latitude", { valueAsNumber: true })}
              error={errors.latitude?.message}
              className="font-mono text-xs"
            />
            <Input
              id="longitude"
              type="number"
              step="0.000001"
              label="Longitude"
              {...register("longitude", { valueAsNumber: true })}
              error={errors.longitude?.message}
              className="font-mono text-xs"
            />
          </div>
          <p className="text-xs text-neutral-500 mt-2 flex items-start gap-1">
            <Info className="size-3 mt-0.5 shrink-0" />
            <span>Click di peta atau drag marker untuk pilih lokasi.</span>
          </p>
        </Card>
      </div>

      {/* Pricing & Service */}
      <Card variant="bordered">
        <h3 className="text-base font-medium text-[#296FDA] mb-4 flex items-center gap-2">
          <Coins className="size-4" />
          Pricing & Service
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <Input
            id="serviceRadiusKm"
            type="number"
            step="0.1"
            label="Service Radius (km) *"
            placeholder="5"
            {...register("serviceRadiusKm", { valueAsNumber: true })}
            error={errors.serviceRadiusKm?.message}
          />
          <Input
            id="pricePerKg"
            type="number"
            label="Price per kg (Rp) *"
            placeholder="12000"
            {...register("pricePerKg", { valueAsNumber: true })}
            error={errors.pricePerKg?.message}
          />
          <Input
            id="deliveryFeePerKm"
            type="number"
            label="Delivery Fee per km (Rp) *"
            placeholder="2000"
            {...register("deliveryFeePerKm", { valueAsNumber: true })}
            error={errors.deliveryFeePerKm?.message}
          />
        </div>
      </Card>

      {/* Action buttons */}
      <div className="flex gap-3 justify-end">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={isSubmitting}
        >
          Cancel
        </Button>
        <Button type="submit" isLoading={isSubmitting}>
          <Check className="size-4" />
          {submitLabel}
        </Button>
      </div>
    </form>
  );
}
