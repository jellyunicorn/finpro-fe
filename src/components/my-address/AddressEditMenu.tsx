import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../lib/axios";
import type {
  addressform,
  districtquery,
  regencyquery,
  villagequery,
} from "../../lib/types";
import DeletePopUp from "./DeletePopUp";
import AddressMap from "./AddressMap";
import { addressSchema } from "../../types/zodSchemas";

export type addressdata = {
  address: string;
  city: string;
  id: number;
  isPrimary: boolean;
  label: string;
  latitude: string;
  longitude: string;
  postalCode: string;
  regency: { code: string; name: string; provinceCode: string };
  district: { code: string; name: string; regencyCode: string };
  village: { code: string; name: string; districtCode: string };
  userId: number;
};

type FormMode = "edit" | "create" | null;

type AddressEditMenuProps = {
  formMode: FormMode;
  setFormMode: React.Dispatch<React.SetStateAction<FormMode>>;
  addressForm: addressform | undefined;
  setAddressForm: React.Dispatch<React.SetStateAction<addressform | undefined>>;
  confirmDelete: boolean | undefined;
  setConfirmDelete: React.Dispatch<React.SetStateAction<boolean | undefined>>;
  createAddress: (data: addressform) => void;
  updateAddress: (data: addressform) => void;
  deleteAddress: (id: number) => void;
};

type AddressFormValues = z.infer<typeof addressSchema>;

export default function AddressEditMenu({
  formMode,
  setFormMode,
  addressForm,
  setAddressForm,
  confirmDelete,
  setConfirmDelete,
  createAddress,
  updateAddress,
  deleteAddress,
}: AddressEditMenuProps) {
  const isEditing = formMode !== null;

  const [regcode, setRegCode] = useState<string>("");
  const [discode, setDisCode] = useState<string>("");

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm<AddressFormValues>({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      label: "",
      address: "",
      regencyCode: "",
      districtCode: "",
      villageCode: "",
      postalCode: "",
    },
  });

  useEffect(() => {
    if (addressForm) {
      reset({
        label: addressForm.label ?? "",
        address: addressForm.address ?? "",
        regencyCode: addressForm.regencyCode ?? "",
        districtCode: addressForm.districtCode ?? "",
        villageCode: addressForm.villageCode ?? "",
        postalCode: addressForm.postalCode ?? "",
      });
      setRegCode(addressForm.regencyCode ?? "");
      setDisCode(addressForm.districtCode ?? "");
    }
  }, [addressForm, reset]);

  const { data: regencydata } = useQuery<regencyquery[]>({
    queryKey: ["regency"],
    queryFn: async () => {
      const res = await axiosInstance.get("/address/regency");
      return res.data;
    },
  });
  const { data: districtdata } = useQuery<districtquery[]>({
    queryKey: ["district", regcode],
    enabled: !!regcode,
    queryFn: async () => {
      const res = await axiosInstance.get(`/address/district/${regcode}`);
      return res.data;
    },
  });
  const { data: villagedata } = useQuery<villagequery[]>({
    queryKey: ["village", discode],
    enabled: !!discode,
    queryFn: async () => {
      const res = await axiosInstance.get(`/address/village/${discode}`);
      return res.data;
    },
  });

  const regencyCode = watch("regencyCode");
  const districtCode = watch("districtCode");

  const onSubmit = (data: AddressFormValues) => {
    const merged: addressform = {
      ...(addressForm as addressform),
      ...data,
      city: data.regencyCode,
    };
    formMode === "create" ? createAddress(merged) : updateAddress(merged);
  };

  return (
    <>
      {isEditing && (
        <div className="w-screen h-dvh bg-black/20 backdrop-blur-[2px] fixed inset-0 z-0" />
      )}

      <div
        className={`bg-white border-l ${!isEditing && "translate-x-full"} transition-all ease-in shadow-[-19px_0px_28px_0px_rgba(0,0,0,0.1)] border-blue-300 w-[50%] h-dvh overflow-y-auto p-10 right-0 top-0 z-10 flex flex-col gap-6 fixed`}
      >
        {confirmDelete && (
          <DeletePopUp
            onConfirm={() =>
              addressForm?.id !== undefined && deleteAddress(addressForm.id)
            }
            onCancel={() => setConfirmDelete(false)}
          />
        )}

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4 flex-1"
        >
          <div className="flex justify-between   items-center">
            <div className="flex flex-col">
              <h1 className="text-2xl font-medium text-claundry-blue">
                {formMode === "create" ? "Add New Address" : "Edit Address"}
              </h1>
              <p className="text-sm text-neutral-400">
                {formMode === "create"
                  ? "Fill in the details for your new address"
                  : "Edit selected address"}
              </p>
            </div>
            <div className="flex gap-4">
              <button
                type="submit"
                className=" bg-claundry-blue text-white rounded-md px-2 py-2 hover:bg-blue-700"
              >
                {formMode === "create" ? "Add New Address" : "Save Changes"}
              </button>
              {formMode === "edit" && (
                <button
                  type="button"
                  onClick={() => setConfirmDelete(true)}
                  className="border rounded-md px-2 py-1.5 border-red-500 text-red-500 hover:bg-red-100"
                >
                  Delete Address
                </button>
              )}
              <button
              type="button"
                onClick={() => setFormMode(null)}
                className="text-neutral-400 hover:text-black text-xl font-medium"
              >
                ✕
              </button>
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm text-neutral-600">Label</label>
            <input
              type="text"
              {...register("label")}
              className="border border-neutral-300 rounded-lg px-3 py-2"
              placeholder="e.g. Home, Office"
            />
            {errors.label && (
              <p className="text-red-500 text-sm">{errors.label.message}</p>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm text-neutral-600">Address</label>
            <input
              type="text"
              {...register("address")}
              className="border border-neutral-300 rounded-lg px-3 py-2"
              placeholder="e.g. Jl. MH Thamrin No.1"
            />
            {errors.address && (
              <p className="text-red-500 text-sm">{errors.address.message}</p>
            )}
          </div>

          <div className="flex gap-5">
            <div className="flex w-full flex-col gap-1">
              <label className="text-sm text-neutral-600">City / Regency</label>
              <div className="border border-neutral-300 rounded-lg px-3 py-2">
                <select
                  value={regencyCode || ""}
                  onChange={(e) => {
                    setValue("regencyCode", e.target.value, {
                      shouldValidate: true,
                    });
                    setValue("districtCode", "", { shouldValidate: false });
                    setValue("villageCode", "", { shouldValidate: false });
                    setRegCode(e.target.value);
                    setDisCode("");
                  }}
                  className="w-full"
                >
                  <option value="" disabled>
                    -
                  </option>
                  {(regencydata ?? []).map((regency) => (
                    <option key={regency.code} value={regency.code}>
                      {regency.name}
                    </option>
                  ))}
                </select>
              </div>
              {errors.regencyCode && (
                <p className="text-red-500 text-sm">
                  {errors.regencyCode.message}
                </p>
              )}
            </div>

            <div className="flex w-full flex-col gap-1">
              <label className="text-sm text-neutral-600">District</label>
              <div className="border border-neutral-300 rounded-lg px-3 py-2">
                <select
                  value={districtCode || ""}
                  onChange={(e) => {
                    setValue("districtCode", e.target.value, {
                      shouldValidate: true,
                    });
                    setValue("villageCode", "", { shouldValidate: false });
                    setDisCode(e.target.value);
                  }}
                  className="w-full"
                >
                  <option value="" disabled>
                    -
                  </option>
                  {(districtdata ?? []).map((district) => (
                    <option key={district.code} value={district.code}>
                      {district.name}
                    </option>
                  ))}
                </select>
              </div>
              {errors.districtCode && (
                <p className="text-red-500 text-sm">
                  {errors.districtCode.message}
                </p>
              )}
            </div>
          </div>

          <div className="flex gap-5">
            <div className="flex w-full flex-col gap-1">
              <label className="text-sm text-neutral-600">Village</label>
              <div className="border border-neutral-300 rounded-lg px-3 py-2">
                <select
                  {...register("villageCode")}
                  onChange={(e) => {
                    setValue("villageCode", e.target.value, {
                      shouldValidate: true,
                    });
                  }}
                  className="w-full"
                >
                  <option value="" disabled>
                    -
                  </option>
                  {(villagedata ?? []).map((village) => (
                    <option key={village.code} value={village.code}>
                      {village.name}
                    </option>
                  ))}
                </select>
              </div>
              {errors.villageCode && (
                <p className="text-red-500 text-sm">
                  {errors.villageCode.message}
                </p>
              )}
            </div>

            <div className="flex w-full flex-col gap-1">
              <label className="text-sm text-neutral-600">Postal Code</label>
              <input
                type="text"
                {...register("postalCode")}
                maxLength={5}
                className="border border-neutral-300 rounded-lg px-3 py-2"
                placeholder="12345"
              />
              {errors.postalCode && (
                <p className="text-red-500 text-sm">
                  {errors.postalCode.message}
                </p>
              )}
            </div>
          </div>

          <div className="border w-full h-100">
            <AddressMap
              longitude={addressForm?.longitude ?? ""}
              latitude={addressForm?.latitude ?? ""}
              addressForm={addressForm}
              setAddressForm={setAddressForm}
            />
          </div>
        </form>
      </div>
    </>
  );
}
