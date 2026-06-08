import { useEffect, useState } from "react";
import { useLoaderData } from "react-router";
import AddressEditMenu, {
  type addressdata,
} from "../../../components/my-address/AddressEditMenu";
import useCreateAddress from "../../../hooks/useCreateAddress";
import useDeleteAddress from "../../../hooks/useDeleteAddress";
import useSwitchPrimary from "../../../hooks/useSwitchPrimary";
import useUpdateAddress from "../../../hooks/useUpdateAddress";
import type { addressform } from "../../../lib/types";

export default function MyAddresses() {
  const switchPrimary = useSwitchPrimary();
  const updateAddress = useUpdateAddress();
  const createAddress = useCreateAddress();
  const deleteAddress = useDeleteAddress();
  const addresses  = useLoaderData();
  const [hoveredId, setHoveredId] = useState<number | null>();
  const [formMode, setFormMode] = useState<"edit" | "create" | null>(null);
  const [primaryId, setPrimaryId] = useState<number>(
    addresses.useraddress.find((e: addressdata) => e.isPrimary)?.id,
  );
  const [addressForm, setAddressForm] = useState<addressform>();
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

  useEffect(() => {
    console.log(addressForm);
  }, [addressForm]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setFormMode(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleAddressForm = (adrs: addressdata) => {
    setAddressForm({
      address: adrs.address,
      city: adrs.city,
      id: adrs.id,
      isPrimary: adrs.isPrimary,
      label: adrs.label,
      latitude: adrs.latitude,
      longitude: adrs.longitude,
      postalCode: adrs.postalCode,
      regencyCode: adrs.regency?.code ?? "",
      districtCode: adrs.district?.code ?? "",
      villageCode: adrs.village?.code ?? "",
    });
  };

  return (
    <main className="relative flex-1 flex px-10 py-10 flex-col gap-5">
      {/* //---------> edit menu */}
      <AddressEditMenu
        formMode={formMode}
        setFormMode={setFormMode}
        addressForm={addressForm}
        setAddressForm={setAddressForm}
        confirmDelete={confirmDelete}
        setConfirmDelete={setConfirmDelete}
        createAddress={createAddress}
        updateAddress={updateAddress}
        deleteAddress={deleteAddress}
      />
      {/* //---------> edit menu END */}

      <div>
        <h1 className="text-2xl font-medium text-claundry-blue">
          My Addresses
        </h1>
        <p className="text-sm text-neutral-400">
          Manage your saved and default addresses here
        </p>
      </div>
      <div className=" p-4 w-full lg:max-w-[70%] flex gap-5 h-fit border border-blue-300 rounded-lg">
        <h2 className="text-claundry-blue">Primary Address</h2>
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
      <h2 className="text-claundry-blue">Other Addresses</h2>
      <div className="  w-full lg:max-w-[70%] flex flex-col gap-2 h-fit ">
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
              setAddressForm({
                address: "",
                city: "",
                isPrimary: false,
                label: "",
                latitude: "",
                longitude: "",
                postalCode: "",
                regencyCode: "",
                districtCode: "",
                villageCode: "",
              });
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
