import React, { useEffect, useState } from "react";
import DeletePopUp from "./DeletePopUp";
import AddressMap from "./AddressMap";
import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../lib/axios";
import type {
  addressform,
  districtquery,
  regencyquery,
  villagequery,
} from "../../lib/types";

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

  useEffect(() => {
    if (addressForm) {
      setRegCode(addressForm.regencyCode ?? "");
      setDisCode(addressForm.districtCode ?? "");
    }
  }, [addressForm]);

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
    queryKey: ["district", discode],
    enabled: !!discode,
    queryFn: async () => {
      const res = await axiosInstance.get(`/address/village/${discode}`);
      return res.data;
    },
  });

  useEffect(() => {
    console.log(addressForm);
  }, [addressForm]);

  return (
    <>
      {/* //---------> backdrop */}
      {isEditing && (
        <div className="w-screen h-dvh bg-black/20 backdrop-blur-[2px] fixed inset-0 z-0">
          {" "}
        </div>
      )}

      {/* //---------> sliding panel */}
      <div
        className={`bg-white border-l ${!isEditing && "translate-x-full"} transition-all ease-in shadow-[-19px_0px_28px_0px_rgba(0,0,0,0.1)] border-blue-300 w-[50%] h-dvh overflow-y-auto p-10 right-0 top-0 z-10 flex flex-col gap-6 fixed`}
      >
        {confirmDelete && (
          <DeletePopUp
            onConfirm={() => addressForm?.id !== undefined && deleteAddress(addressForm.id)}
            onCancel={() => setConfirmDelete(false)}
          />
        )}

        <div className="flex justify-between items-start">
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
          <button
            onClick={() => setFormMode(null)}
            className="text-neutral-400 hover:text-black text-xl font-medium"
          >
            ✕
          </button>
        </div>

        <form className="flex flex-col gap-4 flex-1">
          <div className="flex flex-col gap-1">
            <label className="text-sm text-neutral-600">Label</label>
            <input
              type="text"
              value={addressForm?.label || ""}
              onChange={(e) =>
                setAddressForm(
                  (prev) => prev && { ...prev, label: e.target.value },
                )
              }
              className="border border-neutral-300 rounded-lg px-3 py-2"
              placeholder="e.g. Home, Office"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm text-neutral-600">Address</label>
            <input
              type="text"
              value={addressForm?.address || ""}
              onChange={(e) =>
                setAddressForm(
                  (prev) => prev && { ...prev, address: e.target.value },
                )
              }
              className="border border-neutral-300 rounded-lg px-3 py-2"
              placeholder="e.g. Jl. MH Thamrin No.1 "
            />
          </div>
          <div className="flex gap-5">
            <div className="flex w-full flex-col gap-1">
              <label className="text-sm text-neutral-600">
                City / Regency{" "}
              </label>
              <div className="border border-neutral-300 rounded-lg px-3 py-2">
                <select
                  value={regcode || "-"}
                  onChange={(e) => {
                    setRegCode(e.target.value);
                    setDisCode("");
                    setAddressForm(
                      (prev) =>
                        prev && {
                          ...prev,
                          regencyCode: e.target.value,
                          districtCode: "",
                          villageCode: "",
                        },
                    );
                  }}
                  name="regency"
                  id="regency"
                  className="w-full"
                >
                  <option value="-" disabled>
                    -
                  </option>
                  {(regencydata ?? []).map((regency) => (
                    <option value={regency.code}>{regency.name}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="flex  w-full flex-col gap-1">
              <label className="text-sm text-neutral-600">District</label>
              <div className="border border-neutral-300 rounded-lg px-3 py-2">
                <select
                  value={discode || "-"}
                  onChange={(e) => {
                    setDisCode(e.target.value);
                    setAddressForm(
                      (prev) =>
                        prev && {
                          ...prev,
                          districtCode: e.target.value,
                          villageCode: "",
                        },
                    );
                  }}
                  name="district"
                  id="district"
                  className="w-full"
                >
                  <option value="-" disabled>
                    -
                  </option>
                  {(districtdata ?? []).map((district) => (
                    <option value={district.code}>{district.name}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="flex gap-5">
            <div className="flex w-full flex-col gap-1">
              <label className="text-sm text-neutral-600">Village</label>
              <div className="border border-neutral-300 rounded-lg px-3 py-2">
                <select
                  value={addressForm?.villageCode || "-"}
                  onChange={(e) =>
                    setAddressForm(
                      (prev) => prev && { ...prev, villageCode: e.target.value },
                    )
                  }
                  name="district"
                  id="district"
                  className="w-full"
                >
                  <option value="-" disabled>
                    -
                  </option>
                  {(villagedata ?? []).map((village) => (
                    <option value={village.code}>{village.name}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="flex w-full flex-col gap-1">
              <label className="text-sm text-neutral-600">Postal Code</label>
              <input
                type="text"
                value={addressForm?.postalCode || ""}
                onChange={(e) =>
                  setAddressForm(
                    (prev) => prev && { ...prev, postalCode: e.target.value },
                  )
                }
                className="border border-neutral-300 rounded-lg px-3 py-2"
                placeholder=""
              />
            </div>
          </div>

          {/* //---->map" */}
          <div className="border w-full h-100">
            <AddressMap
              longitude={addressForm?.longitude ?? ""}
              latitude={addressForm?.latitude ?? ""}
              addressForm={addressForm}
              setAddressForm={setAddressForm}
            />
          </div>
          <button
            type="submit"
            onClick={(e) => {
              e.preventDefault();
              if (addressForm)
                formMode === "create"
                  ? createAddress(addressForm)
                  : updateAddress(addressForm);
            }}
            className="mt-auto bg-claundry-blue text-white rounded-full py-2 hover:bg-blue-700"
          >
            {formMode === "create" ? "Add New Address" : "Save Changes"}
          </button>
          {formMode === "edit" && (
            <button
              type="button"
              onClick={() => setConfirmDelete(true)}
              className="border rounded-full py-2 border-red-500 text-red-500 hover:bg-red-100"
            >
              Delete Address
            </button>
          )}
        </form>
      </div>
    </>
  );
}
