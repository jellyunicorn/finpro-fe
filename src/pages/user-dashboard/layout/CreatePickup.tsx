import { useState, useEffect } from "react";
import { useLoaderData } from "react-router";
import MapComponent from "../../../components/schedule-pickup/MapComponent";
import addressicon from "../../../img/svg/address_blue.svg";
import { timetable } from "../../../lib/timeLookup";
import type {
  addressdata,
  closestoutletinfo,
  pickupform,
} from "../../../lib/types";
import { axiosInstance } from "../../../lib/axios";
import { useQuery } from "@tanstack/react-query";
import useCreateOrder from "../../../hooks/useCreateOrder";

export default function CreatePickup() {
  const { data: addressdata } = useQuery({
    queryKey: ["useraddress"],
    queryFn: async () => {
      const result = await axiosInstance.get("/address/");
      console.log(result.data);
      return result.data.useraddress;
    },
  });
  const [selectedTime, setSelectedTime] = useState<number | null>(null);

  const [outlet, setOutlet] = useState<closestoutletinfo>({
    outletname: "",
    outletid: null,
    distance: 0,
  });
  const addresses = useLoaderData();
  const handleCreateOrder = useCreateOrder();

  const primaryAddress = addresses.useraddress.find(
    (e: addressdata) => e.isPrimary === true,
  );
  const [selectedAddress, setSelectedAddress] = useState<
    addressdata | undefined
  >(primaryAddress);

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const [PickUpForm, setPickUpForm] = useState<pickupform>({
    pickupaddressid: primaryAddress.id,
    outletid: outlet.outletid,
    pickupDate: null,
    pickupTime: null,
    distance: null,
  });
  useEffect(() => {
    if (addressdata?.length) setSelectedAddress(primaryAddress);
    console.log(PickUpForm)
  }, [addressdata]);


  return (
    <main className="flex-1 h-full relative  flex">
      <div className="flex min-w-[30%] h-fit overflow-hidden  border-[#BEE6E1] border shadow-md px-10 gap-5 py-10 flex-1 rounded-lg  m-10 absolute z-1 bg-white  flex-col">
        <div className="flex flex-col ">
          <h1 className="text-2xl font-medium text-claundry-blue">
            Schedule a Pick Up
          </h1>
          <p className="text-sm text-neutral-400">Create a pickup schedule</p>
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex gap-2 p-2 items-center text-blue-700 font-medium">
            <img src={addressicon} alt="" />
            <p>Selected Address</p>
          </div>
          <div className="flex gap-2 border border-[#BEE6E1] p-2 rounded-lg flex-col">
            <select
              name="address"
              id=""
              value={selectedAddress?.id}
              onChange={(e) => {
                const address = addressdata?.find(
                  (a: typeof addressdata) => a.id === Number(e.target.value),
                );
                setSelectedAddress(address);
              }}
            >
              {addressdata?.map((adrs: typeof addressdata, idx: number) => (
                <option key={idx} value={adrs.id}>
                  {adrs.label}
                </option>
              ))}
            </select>
            <p className="font-sm text-neutral-400">
              {selectedAddress?.address}
            </p>
          </div>
        </div>
        <div className=" w-full border rounded-xl flex flex-col gap-2 h-full flex-1 border-[#BEE6E1] bg-white p-5  ">
          <div className="flex gap-2 w-full items-center">
            <p className="font-bold">Date</p>
            <div className="border rounded-md border-neutral-200 px-2 py-2 w-full">
              <input
                type="date"
                min={tomorrow.toISOString().slice(0, 10)}
                className="w-full"
                onChange={(e) => setPickUpForm((prev) => ({ ...prev, pickupDate: e.target.value }))}
              />
            </div>
          </div>
          <div className="flex gap-2 w-full items-center">
            <p className="font-bold">Time</p>
            <div className="border rounded-md grid grid-cols-3 gap-2 border-neutral-200 px-2 py-2 w-full">
              {timetable.map((e, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setSelectedTime(idx);
                    setPickUpForm((prev) => ({ ...prev, pickupTime: e.value }));
                  }}
                  className={`p-1 hover:bg-blue-50 border rounded-md border-neutral-200 ${selectedTime === idx && "bg-claundry-blue text-white hover:bg-claundry-blue"}`}
                >
                  {e.label}
                </button>
              ))}
            </div>
          </div>
          <div className="flex gap-2 w-full items-center">
            <p className="font-bold whitespace-nowrap">Nearest Outlet</p>
            <div className="border rounded-md h-10 items-center justify-between flex border-neutral-200 px-2 py-2 w-full">
              <p>{outlet.outletname || "test "}</p>
              <p className="text-neutral-400 text-[12px] ml-5">
                {outlet.distance || 0} km
              </p>
            </div>
          </div>
        </div>
        <button 
        onClick={()=>handleCreateOrder(PickUpForm)}
        className="bg-claundry-blue text-white rounded-full py-2 hover:bg-blue-700">
          Request Pickup
        </button>
      </div>

      {/* //------> map */}
      <div className=" h-full w-full absolute inset-0 ">
        {selectedAddress && (
          <MapComponent
            initialcoordinate={{
              longitude: Number(primaryAddress.longitude),
              latitude: Number(primaryAddress.latitude),
            }}
            selectedAddress={selectedAddress}
            setOutlet={(outlet) => {
              setOutlet(outlet);
              setPickUpForm((prev) => ({ ...prev, outletid: outlet.outletid, distance:outlet.distance }));
            }}
          />
        )}
      </div>
    </main>
  );
}
