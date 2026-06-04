import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../../lib/axios";
import {
  dateConverter,
  toReadableDateTime,
} from "../../../utils/dateconverUtils";
import type { orderdata } from "../../../lib/types";
import location_icon from "../../../img/svg/address_blue.svg";
import { STATUS } from "../../../lib/statusLookup";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";

export default function OrderHistory() {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [dateQuery, setDateQuery] = useState<string>("-");
  const [monthQuery, setMonthQuery] = useState<string>("-");
  const [debouncedSearch , setDebouncedSearch] = useState<string>("")
  const navigate = useNavigate();

  const { data: userorders, isLoading } = useQuery({
    queryKey: ["orders", debouncedSearch, monthQuery, dateQuery],
    queryFn: async () => {
      const result = await axiosInstance.get("/order/", {
        params: {
          search: debouncedSearch || undefined,
          month: monthQuery !== "-" ? monthQuery : undefined,
          date: dateQuery !== "-" ? dateQuery : undefined,
        },
      });
      return result.data;
    },
  });

  useEffect(() => {
    const debouncedelay = setTimeout(() => setDebouncedSearch(searchQuery), 1000);
    return () => clearTimeout(debouncedelay);
  }, [searchQuery]);

  return (
    <main className=" flex-1 flex px-10 py-10 flex-col gap-5">
      <div className="flex flex-col ">
        <h1 className="text-2xl font-medium text-claundry-blue">
          Order History
        </h1>
        <p className="text-sm text-neutral-400">
          Inspect and Manage your order here
        </p>
      </div>
      <div className="flex max-w-[70%] justify-between">
        <div className="flex gap-2">
          <button
            onClick={() => {
              setDateQuery("-");
              setMonthQuery("-");
              setSearchQuery("");
            }}
            className={`${searchQuery === "" && dateQuery === "-" && monthQuery === "-" ? "bg-claundry-blue" : "bg-neutral-300"} px-5 py-1 text-white rounded-full`}
          >
            All
          </button>
          <div
            className={`${dateQuery !== "-" || monthQuery !== "-" ? "bg-claundry-blue" : "bg-neutral-400"} px-5 py-1 text-white rounded-full`}
          >
            Filter By Date:
            <select
              className="text-center"
              value={monthQuery}
              onChange={(e) => setMonthQuery(e.target.value)}
            >
              <option key={0} value={"-"}>
                -
              </option>
              {Array.from({ length: 12 }, (_, i) => (
                <option key={i} value={i + 1}>
                  {new Date(0, i).toLocaleString("default", { month: "long" })}
                </option>
              ))}
            </select>
            <select
              className="text-center"
              value={dateQuery}
              onChange={(e) => setDateQuery(e.target.value)}
            >
              <option key={0} value={"-"}>
                -
              </option>
              {Array.from({ length: 31 }, (_, i) => (
                <option key={i} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div
          className={`${searchQuery ? "bg-claundry-blue" : "bg-neutral-400"} text-white items-center felx rounded-full px-2 py-1`}
        >
          {" "}
          Search By ID :{" "}
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="text-right  px-2"
          />
        </div>
      </div>
      {isLoading && <p>Loading Data...</p>}
      {userorders?.map((order: orderdata, idx: number) => (
        <div
          key={idx}
          className="w-[70%] h-fit rounded-2xl border-[#BEE6E1] border p-5 "
        >
          <div className="h-10  w-full flex justify-between items-center">
            <p className="font-medium text-lg text-claundry-blue">
              {dateConverter(order.createdAt)}
            </p>

            <p className="text-[12px] text-neutral-400 px-2 py-1 border rounded-full">
              ID:{order.orderId}
            </p>
          </div>
          <hr className="border-neutral-200 my-2" />
          <div className="flex w-full justify-between items-center">
            <div className="flex gap-2">
              <img src={location_icon} alt="" className="h-5" />
              <p className="font-medium text-claundry-blue">From:</p>
              <p>{order.address?.label ?? "-"}</p>
            </div>
            <div className="flex  flex-1 ">
              <div className="flex relative items-center flex-1 mx-10">
                <p className="absolute  w-full flex justify-center text-sm text-neutral-400 [-webkit-text-stroke:5px_white] [paint-order:stroke_fill] z-5">
                  {order.distance} KM
                </p>
                {order.orderStatus === "OTW_TO_CUSTOMER" && (
                  <div className="w-0 h-0 border-y-4 border-y-transparent border-r-8 relative border-r-neutral-300" />
                )}
                <div className="flex-1 h-px z-1 bg-neutral-300 relative" />
                {order.orderStatus === "OTW_TO_OUTLET" && (
                  <div className="w-0 h-0 border-y-4 border-y-transparent border-l-8 relative border-l-neutral-300" />
                )}
              </div>
            </div>
            <div className="flex gap-2 ">
              <p className="font-medium text-claundry-blue">Outlet:</p>
              <p>{order.outlet?.name ?? "-"}</p>
            </div>
          </div>
          <div className="flex text-sm justify-between">
            <p className="text-neutral-400">{order.address?.address ?? "-"}</p>
            <p className="text-neutral-400">{order.outlet?.address ?? "-"}</p>
          </div>
          <hr className="border-neutral-200 my-2" />

          <div className="grid grid-cols-3 my-2">
            <div className="border w-fit p-4 rounded-2xl border-claundry-accent">
              <p className="font-medium text-claundry-blue">Scheduled :</p>{" "}
              <p>{toReadableDateTime(order.scheduledTime)}</p>
            </div>
            <div className="flex justify-center items-center"></div>
            <div className="font-md">Total KG : -</div>
          </div>
          <div className="flex justify-between items-center">
            <div
              className={`font-md ${STATUS[order.orderStatus]?.color} w-fit h-fit px-2 border rounded-full `}
            >
              {" "}
              {STATUS[order.orderStatus]?.label ?? order.orderStatus}
            </div>
            <button
              onClick={() => navigate(`/dashboard/orders/${order.orderId}`)}
              className="bg-claundry-blue text-white px-2 py-1 rounded-full"
            >
              View Details
            </button>
          </div>
        </div>
      ))}
    </main>
  );
}
