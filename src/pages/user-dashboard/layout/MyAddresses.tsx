import React, { useState } from "react";
import { useLoaderData } from "react-router";
import useSwitchPrimary from "../../../hooks/useSwitchPrimary";
import useUpdateAddress from "../../../hooks/useUpdateAddress";
import useCreateAddress from "../../../hooks/useCreateAddress";
import useDeleteAddress from "../../../hooks/useDeleteAddress";

type addressdata = {
  address: string;
  city: string;
  id: number;
  isPrimary: boolean;
  label: string;
  latitude: string;
  longitude: string;
  postalCode: string;
  userId: number;
};

export default function MyAddresses() {
  const switchPrimary = useSwitchPrimary();
  const updateAddress = useUpdateAddress();
  const createAddress = useCreateAddress();
  const deleteAddress = useDeleteAddress();
  const { userdata, addresses } = useLoaderData();
  const [hoveredId, setHoveredId] = useState<number | null>();
  const [formMode, setFormMode] = useState<"edit" | "create" | null>(null);
  const isEditing = formMode !== null;
  const [primaryId, setPrimaryId] = useState<number>(
    addresses.useraddress.find((e: addressdata) => e.isPrimary)?.id,
  );
  const [addressForm, setAddressForm] = useState<addressdata>();
  const [confirmDelete, setConfirmDelete] = useState<boolean>();
  const primaryAddress = addresses.useraddress.find(
    (e: addressdata) => e.id === primaryId,
  );
  const otherAddress = addresses.useraddress.filter(
    (e: addressdata) => e.id !== primaryId,
  );

  const handleSwitch = async (id: number) => {
    const prev = primaryId;
    setPrimaryId(id);
    try {
      await switchPrimary(id);
    } catch {
      setPrimaryId(prev);
    }
  };

  const handleAddressForm = async (adrs: addressdata) => {
    setAddressForm({
      address: adrs.address,
      city: adrs.city,
      id: adrs.id,
      isPrimary: adrs.isPrimary,
      label: adrs.label,
      latitude: adrs.latitude,
      longitude: adrs.longitude,
      postalCode: adrs.postalCode,
      userId: adrs.userId,
    });
  };

  return (
    <main className="relative flex-1 flex px-10 py-10 flex-col gap-5">
      {/* //---------> edit menu */}
      {isEditing && (
        <div className="w-screen h-dvh bg-black/20 backdrop-blur-[2px] fixed inset-0 z-0">
          {" "}
        </div>
      )}

      <div
        className={`bg-white border-l ${!isEditing && "translate-x-full"} transition-all ease-in shadow-[-19px_0px_28px_0px_rgba(0,0,0,0.1)] border-blue-300 w-[50%] h-dvh p-10 right-0 top-0 z-1 flex flex-col gap-6 fixed`}
      >
        {confirmDelete && (
          <div className="w-full h-full fixed z-3  inset-0 flex justify-center items-center bg-black/20 backdrop-blur-[1px] ">
            {" "}
            <div className="w-100 h-40 flex flex-col justify-between p-5 text-center items-start bg-white rounded-lg ">
              <h1 className="text-xl text-red-500">Delete Address</h1>
              <p className="text-neutral-600">This action cannot be undone</p>
              <div className="flex gap-2 w-full">
                <button
                  type="button"
                  onClick={() => addressForm && deleteAddress(addressForm.id)}
                  className="rounded-full border py-2 w-full hover:bg-red-100 border-red-500 text-red-500"
                >
                  Yes, Delete
                </button>
                <button
                  type="button"
                  onClick={() => setConfirmDelete(false)}
                  className="rounded-full border py-2 w-full bg-blue-500 text-white"
                >
                  Keep Address
                </button>
              </div>
            </div>{" "}
          </div>
        )}
        <div className="flex justify-between items-start">
          <div className="flex flex-col">
            <h1 className="text-2xl font-medium text-[#296FDA]">
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

        <form className="flex flex-col gap-4 flex-1 overflow-y-auto">
          <div className="flex flex-col gap-1">
            <label className="text-sm text-neutral-600">Label</label>
            <input
              type="text"
              value={addressForm?.label || ""}
              onChange={(e) =>
                setAddressForm(
                  (prev) => ({ ...prev, label: e.target.value }) as addressdata,
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
                  (prev) =>
                    ({ ...prev, address: e.target.value }) as addressdata,
                )
              }
              className="border border-neutral-300 rounded-lg px-3 py-2"
              placeholder="Street address"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm text-neutral-600">City</label>
            <input
              type="text"
              value={addressForm?.city || ""}
              onChange={(e) =>
                setAddressForm(
                  (prev) => ({ ...prev, city: e.target.value }) as addressdata,
                )
              }
              className="border border-neutral-300 rounded-lg px-3 py-2"
              placeholder="City"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm text-neutral-600">Postal Code</label>
            <input
              type="text"
              value={addressForm?.postalCode || ""}
              onChange={(e) =>
                setAddressForm(
                  (prev) =>
                    ({ ...prev, postalCode: e.target.value }) as addressdata,
                )
              }
              className="border border-neutral-300 rounded-lg px-3 py-2"
              placeholder="Postal code"
            />
          </div>

          <div className="flex gap-4">
            <div className="flex flex-col gap-1 flex-1">
              <label className="text-sm text-neutral-600">Latitude</label>
              <input
                type="text"
                value={addressForm?.latitude || ""}
                onChange={(e) =>
                  setAddressForm(
                    (prev) =>
                      ({ ...prev, latitude: e.target.value }) as addressdata,
                  )
                }
                className="border border-neutral-300 rounded-lg px-3 py-2"
                placeholder="Latitude"
              />
            </div>
            <div className="flex flex-col gap-1 flex-1">
              <label className="text-sm text-neutral-600">Longitude</label>
              <input
                type="text"
                value={addressForm?.longitude || ""}
                onChange={(e) =>
                  setAddressForm(
                    (prev) =>
                      ({ ...prev, longitude: e.target.value }) as addressdata,
                  )
                }
                className="border border-neutral-300 rounded-lg px-3 py-2"
                placeholder="Longitude"
              />
            </div>
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
            className="mt-auto bg-[#296FDA] text-white rounded-full py-2 hover:bg-blue-700"
          >
            Save Changes
          </button>
          <button
            type="button"
            onClick={() => setConfirmDelete(true)}
            className="border rounded-full py-2 border-red-500 text-red-500 hover:bg-red-100"
          >
            Delete Address
          </button>
        </form>
      </div>

      {/* //---------> edit menu END */}

      <div>
        <h1 className="text-2xl font-medium text-[#296FDA]">My Addresses</h1>
        <p className="text-sm text-neutral-400">
          Manage your saved and default addresses here
        </p>
      </div>
      <div className=" p-4 w-full lg:max-w-[50%] flex gap-5 h-fit border border-blue-300 rounded-lg">
        <h2 className="text-[#296FDA]">Primary Address</h2>
        <div className="flex flex-col gap-2">
          <p className="px-2 bg-[#BEE6E1] text-blue-800 w-fit rounded-full">
            {primaryAddress.label}
          </p>
          <p>
            {primaryAddress.address} , {primaryAddress.postalCode}
          </p>
          <p> {primaryAddress.city}</p>
        </div>
      </div>
      <h2 className="text-[#296FDA]">Other Addresses</h2>
      <div className="  w-full lg:max-w-[50%] flex flex-col gap-2 h-fit ">
        <div className="grid grid-cols-3 gap-5  ">
          {otherAddress.map((adrs: addressdata, idx: number) => (
            <div
              key={idx}
              onMouseEnter={() => setHoveredId(adrs.id)}
              onMouseLeave={() => setHoveredId(null)}
              className="flex gap-2 justify-between border border-blue-300 rounded-lg p-5 flex-col w-full h-70 hover:outline-2 outline-blue-500 transition-all ease-in"
            >
              <div>
                <p className="px-2 bg-[#BEE6E1] text-blue-800 w-fit rounded-full">
                  {adrs.label}
                </p>
                <div>
                  <p>{adrs.address}</p>
                  <p className="text-neutral-400"> {adrs.city}</p>
                  <p className="text-neutral-400"> {adrs.postalCode}</p>
                </div>
              </div>
              {hoveredId === adrs.id && (
                <div className="flex flex-col gap-2">
                  {" "}
                  <button
                    onClick={() => {
                      handleAddressForm(adrs);
                      setFormMode("edit");
                    }}
                    className="border rounded-full py-1 border-blue-500 hover:bg-blue-500 hover:text-white text-blue-800"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleSwitch(adrs.id)}
                    className="border rounded-full py-1 border-blue-500 hover:bg-blue-500 hover:text-white text-blue-800"
                  >
                    Set as Primary
                  </button>
                </div>
              )}
            </div>
          ))}
          <div
            onClick={() => {
              setAddressForm(undefined);
              setFormMode("create");
            }}
            className="flex gap-2 border border-neutral-300 border-dashed rounded-lg p-5 flex-col justify-center items-center w-full h-70 hover:outline-2 outline-blue-300 cursor-pointer"
          >
            <div className="rounded-full border-2 w-15 h-15 flex items-center justify-center border-neutral-300 text-neutral-300">
              <span className="text-2xl">+</span>
            </div>
            <p className="italic text-neutral-300">Add new address</p>
          </div>
        </div>
      </div>
    </main>
  );
}
