import React from "react";
import addressicon from "../../../img/svg/address_blue.svg";
import { useLoaderData } from "react-router";
import type { addressdata } from "../../../lib/types";

export default function CreatePickup() {
  const addresses = useLoaderData();
  const primaryAddress = addresses.useraddress.find(
    (e: addressdata) => e.isPrimary === true,
  );

  // const map = new

  return (
    <main className="flex-1 h-full flex">
      <div className="flex min-w-[50%] px-10 gap-5 py-10 h-full  flex-col">
        <div className="flex flex-col">
          <h1 className="text-2xl font-medium text-[#296FDA]">
            Schedule a Pick Up
          </h1>
          <p className="text-sm text-neutral-400">Create a pickup schedule</p>
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex gap-2 items-center text-blue-700 font-medium">
            <img src={addressicon} alt="" />
            <p>Primary Address</p>
          </div>
          <div className="flex gap-2">
            <h2 className="px-2 bg-[#BEE6E1] text-blue-800 w-fit rounded-full">
              {" "}
              {primaryAddress.label}
            </h2>
            <p>
              {primaryAddress.address}, {primaryAddress.city},{" "}
              {primaryAddress.postalCode}
            </p>
          </div>
        </div>
        <div className=" w-full border rounded-xl h-full border-[#BEE6E1] bg-white p-5  "> test </div>
      </div>
    
      {/* //------> map */}
      <div className="border h-full w-full "> map </div>
    </main>
  );
}
