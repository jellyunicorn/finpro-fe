import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Link, useLoaderData } from "react-router";
import MapComponent from "../../../components/schedule-pickup/MapComponent";
import useCreateOrder from "../../../hooks/order/useCreateOrder";
import useFindClosest from "../../../hooks/user/useFindClosest";
import addressicon from "../../../img/svg/address_blue.svg";
import { axiosInstance } from "../../../lib/axios";
import { cloudimages } from "../../../lib/cloudinary";
import { timetable } from "../../../lib/timeLookup";
import type {
  addressdata,
  closestoutletinfo,
  outletdata,
  pickupform,
} from "../../../lib/types";
import { haversineDistance } from "../../../utils/haversine";

export default function CreatePickup() {
  const { data: addressdata } = useQuery({
    queryKey: ["useraddress"],
    queryFn: async () => {
      const result = await axiosInstance.get("/address/user");
      return result.data.useraddress;
    },
  });
  const [selectedTime, setSelectedTime] = useState<number | null>(null);
  const [notClosest, setNotClosest] = useState<boolean>(false);
  const [outlet, setOutlet] = useState<closestoutletinfo>({
    outletname: "",
    outletid: null,
    lng: "",
    lat: "",
    distance: 0,
  });

  const { data: outletdata } = useQuery({
    queryKey: ["outlets"],
    queryFn: async () => {
      const result = await axiosInstance.get("/address/outlets");
      return result.data.outlets;
    },
  });

  const addresses = useLoaderData();
  const handleCreateOrder = useCreateOrder();
  const closestOutlet = useFindClosest();

  const primaryAddress = addresses.useraddress.find(
    (e: addressdata) => e.isPrimary === true,
  );
  const [selectedAddress, setSelectedAddress] = useState<
    addressdata | undefined
  >(primaryAddress);

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const [PickUpForm, setPickUpForm] = useState<pickupform>({
    pickupAddressId: primaryAddress?.id,
    outletId: outlet.outletid,
    pickupDate: null,
    pickupTime: null,
    distance: null,
  });
  useEffect(() => {
    if (addressdata?.length) setSelectedAddress(primaryAddress);
  }, [addressdata]);


  const isFormValid = Object.values(PickUpForm).every(
    (value) => value !== null,
  );

  return (
    <main className="flex-1 h-fit md:h-full relative flex flex-col lg:flex-row">
      {!primaryAddress  && (
        <div className="w-full h-full absolute inset-0 bg-white/10 backdrop-blur-[1px] z-99 flex justify-center items-center">
          <div className="w-fit border flex-col relative inset-0 h-fit p-10  z-100 bg-white border-claundry-accent flex items-center justify-center rounded-2xl">
            <p className="text-xl text-claundry-blue">
              You haven't set a primary address
            </p>
            <p className="text-neutral-400 w-75 text-center">
              {" "}
              we wouldn't know where to pickup your clothes , let's set it up
              fist!
            </p>
            <img src={cloudimages.noorderworker} alt="" className="w-75" />
            <Link to="/dashboard/user/my-addresses" className="w-full">
              {" "}
              <button className="bg-claundry-blue text-white w-full rounded-full py-2 hover:bg-blue-400 hover:text-white border ">
                Set Up My Address
              </button>
            </Link>
          </div>
        </div>
      )}
      <div className="h-70 md:h-[50%] lg:h-full w-full lg:absolute relative lg:inset-0 ">
        {/* //------> map */}
        {selectedAddress && (
          <MapComponent
            initialcoordinate={{
              longitude: Number(primaryAddress.longitude),
              latitude: Number(primaryAddress.latitude),
            }}
            selectedAddress={selectedAddress}
            outletdata={outletdata}
            chosenoutlet={outlet}
            setOutlet={(outlet) => {
              setOutlet(outlet);
              setPickUpForm((prev) => ({
                ...prev,
                outletId: outlet.outletid,
                distance: outlet.distance,
              }));
            }}
          />
        )}
      </div>
      <div className="flex min-w-[30%] h-fit lg:overflow-hidden  border-[#BEE6E1] border shadow-lg px-4 lg:px-8 gap-2 py-5 flex-1 lg:rounded-lg  lg:m-5 lg:absolute z-1 bg-white  flex-col">
        <div className="flex flex-col ">
          <h1 className="text-2xl font-medium text-claundry-blue">
            Schedule a Pick Up
          </h1>
          <p className="text-sm text-neutral-400">Create a pickup schedule</p>
        </div>
        <hr className="border-neutral-200" />
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
                setNotClosest(false);
                setPickUpForm((prev) => ({
                  ...prev,
                  pickupAddressId: Number(e.target.value),
                }));
              }}
            >
              {addressdata?.map((adrs: typeof addressdata, idx: number) => (
                <option key={idx} value={adrs.id}>
                  {adrs.label}
                </option>
              ))}
            </select>
            <p className="font-sm text-neutral-400">
              {selectedAddress?.address ?? "-"}
            </p>
          </div>
          <div className="flex gap-2 w-full items-center">
            <p className="font-bold whitespace-nowrap">Outlet</p>
            <div className="border rounded-lg h-10 items-center justify-between flex border-claundry-accent px-2 py-2 w-full">
              <select
                className="w-full"
                value={outlet.outletid ?? ""}
                onChange={(e) => {
                  const o = outletdata?.find(
                    (o: outletdata) => o.id === Number(e.target.value),
                  );
                  if (!o || !selectedAddress) return;
                  const distance = haversineDistance(
                    Number(selectedAddress.longitude),
                    Number(selectedAddress.latitude),
                    Number(o.longitude),
                    Number(o.latitude),
                  );
                  setOutlet({
                    outletname: o.name,
                    outletid: o.id,
                    lng: o.longitude,
                    lat: o.latitude,
                    distance: parseFloat(distance.toFixed(2)),
                  });
                  setPickUpForm((prev) => ({
                    ...prev,
                    outletId: o.id,
                    distance: parseFloat(distance.toFixed(2)),
                  }));
                  const { closestoutletId } = closestOutlet(
                    selectedAddress,
                    outletdata,
                  );
                  setNotClosest(o.id !== closestoutletId);
                }}
              >
                <option>{outlet.outletname || "-"}</option>
                <option value="" disabled>
                  ------------
                </option>
                {outletdata?.map((o: outletdata) => (
                  <option key={o.id} value={o.id}>
                    {o.name}
                  </option>
                ))}
              </select>
              <p className="text-neutral-400 text-[12px] ml-5 whitespace-nowrap">
                {outlet.distance || 0} km
              </p>
            </div>
          </div>
          {notClosest && (
            <small className="bg-red-100 text-red-500 py-2 rounded-lg flex justify-center">
              This outlet is not the most efficient distance
            </small>
          )}
        </div>
        <div className=" w-full border rounded-xl flex flex-col gap-2 h-full flex-1 border-[#BEE6E1] bg-white p-5  ">
          <div className="flex gap-2 w-full items-center">
            <p className="font-bold">Date</p>
            <div className="border rounded-lg border-neutral-200 px-2 py-2 w-full">
              <input
                type="date"
                min={tomorrow.toISOString().slice(0, 10)}
                className="w-full"
                onChange={(e) =>
                  setPickUpForm((prev) => ({
                    ...prev,
                    pickupDate: e.target.value,
                  }))
                }
              />
            </div>
          </div>
          <div className="flex gap-2 w-full items-center">
            <p className="font-bold">Time</p>
            <div className="border rounded-lg grid grid-cols-3 gap-2 border-neutral-200 px-2 py-2 w-full">
              {timetable.map((e, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setSelectedTime(idx);
                    setPickUpForm((prev) => ({ ...prev, pickupTime: e.value }));
                  }}
                  className={`p-1 hover:bg-blue-50 border rounded-lg text-sm border-neutral-200 ${selectedTime === idx && "bg-claundry-blue text-white hover:bg-claundry-blue"}`}
                >
                  {e.label}
                </button>
              ))}
            </div>
          </div>
        </div>
        <button
          disabled={!isFormValid}
          onClick={() => handleCreateOrder(PickUpForm)}
          className="bg-claundry-blue text-white rounded-full py-2 hover:bg-blue-700 disabled:bg-neutral-300 disabled:cursor-not-allowed disabled:hover:bg-neutral-300"
        >
          Request Pickup
        </button>
      </div>
    </main>
  );
}
