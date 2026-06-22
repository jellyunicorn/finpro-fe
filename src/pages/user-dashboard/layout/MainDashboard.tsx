import { Link, useLoaderData } from "react-router";
import { cloudimages } from "../../../lib/cloudinary";
import Greetings from "../../../components/user-dashboard/Greetings";
import addressicon from "../../../img/svg/address_blue.svg";
import OrderSummaryData from "../../../components/user-dashboard/OrderSummaryData";
import type { addressdata, orderdata } from "../../../lib/types";
import { todaysdate } from "../../../utils/todaysdateUtils";
import { Query, useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../../lib/axios";

export default function MainDashboard() {
  const { userdata: loaderdata, addresses } = useLoaderData();
  const primaryAddress = addresses.useraddress.find(
    (e: addressdata) => e.isPrimary === true,
  );

  const { data: userorder, isLoading } = useQuery<orderdata[]>({
    queryKey: ["orders"],
    queryFn: async () => {
      const result = await axiosInstance.get("/order/", {});
      return result.data?.data ?? result.data;
    },
  });

  const { data: recentOrder } = useQuery({
    queryKey: ["countActiveOrder"],
    queryFn: async () => {
      const res = await axiosInstance.get("/order/countactive");
      return res.data;
    },
  });
  const { data: pendingPayment } = useQuery({
    queryKey: ["countPendingPayment"],
    queryFn: async () => {
      const res = await axiosInstance.get("/order/countpendingpayment");
      return res.data;
    },
  });



  return (
    <main className="bg-[#f7fcff] p-5 flex flex-col relative gap-5">
      {loaderdata.userdata.verifiedAt === null && (
        <div className=" h-10 flex items-center px-5 w-full absolute inset-0 z-10 bg-[#F05E5E] text-white">
          <p className="text-sm">
            Your Email has not been verified ! you won't be able to create a
            pickup before you verify your email.
          </p>
        </div>
      )}
      <div className="h-50  w-full z-2 relative flex flex-col gap-1 my-15 md:my-0 lg:p-10 lg:items-center justify-center">
        <img
          src={cloudimages.dashboard_img}
          alt=""
          className="lg:w-50 md:absolute right-0 md:mr-10 w-40 "
        />
        <p>{todaysdate}</p>

        <h1 className="text-4xl z-2 text-claundry-blue max-w-120 lg:text-center ">
          {" "}
          <Greetings />
        </h1>
      </div>
      {primaryAddress && (
        <div className=" w-full flex flex-col gap-2">
          <div className="flex gap-1 items-center text-blue-700 font-medium">
            <img src={addressicon} alt="" />
            <p>Primary Address</p>
          </div>
          <div className="flex flex-col md:flex-row gap-2">
            <h2 className="px-2 bg-[#BEE6E1] text-blue-800 w-fit rounded-full">
              {" "}
              {primaryAddress.label ?? "-"}
            </h2>
            <p>
              {primaryAddress.address ?? "-"},{" "}
              {primaryAddress.regency?.name ?? "-"},{" "}
              {primaryAddress.postalCode ?? "-"}
            </p>
          </div>
        </div>
      )}
      <div className=" w-full flex flex-col lg:flex-row gap-5 h-full">
        <div className="lg:w-[25%] justify-between md:justify-start md:h-full rounded-xl gap-5 flex flex-col">
          <Link
            to="/dashboard/user/pickup"
            onClick={(e) =>
              loaderdata.userdata.verifiedAt === null && e.preventDefault()
            }
            className={
              loaderdata.userdata.verifiedAt === null
                ? "pointer-events-none opacity-50"
                : ""
            }
          >
            <button
              disabled={loaderdata.userdata.verifiedAt === null}
              className={` ${loaderdata.userdata.verifiedAt === null ? "bg-neutral-400 text-neutral-700 pointer-events-none" : "bg-blue-600 hover:bg-blue-500 hover:text-blue-200 text-white"}  w-full rounded-full py-4`}
            >
              Schedule a Pickup{" "}
            </button>
          </Link>
          <div className="flex lg:flex-col gap-2 w-full">
            <div className="flex flex-col w-full justify-between bg-white border rounded-xl h-40 border-[#BEE6E1] p-5">
              <h3 className="text-xl font-medium">Ongoing Laundry</h3>
              <span className="text-4xl font-bold text-claundry-blue">
                {recentOrder}
              </span>
            </div>
            <div className="flex flex-col w-full justify-between bg-white border rounded-xl h-40 border-[#BEE6E1] p-5">
              <h3 className="text-xl font-medium">Pending Payments</h3>
              <span className="text-4xl font-bold text-claundry-blue">
                {pendingPayment}
              </span>
            </div>
          </div>
        </div>
        <div className="rounded-xl bg-white flex-1 flex flex-col h-full  scrollbar-thin scrollbar-thumb-blue-200 overflow-y-auto border py-5 px-10 border-blue-200">
          <h2 className="text-xl">Recent Laundry</h2>
          <div className="w-full  text-claundry-blue shrink-0 overflow-x-auto text-sm font-medium   flex-1 h-full">
            <div className=" w-full h-10 border-b border-neutral-200 grid grid-cols-6">
              <div className="col-span-3 md:col-span-1 flex items-center justify-center">
                Order ID
              </div>
              <div className="col-span-3 md:col-span-1 text-right flex items-center justify-center">
                Status
              </div>
              <div className="hidden md:flex  items-center justify-start ">
                Scheduled
              </div>
              <div className="hidden md:flex items-center justify-start">
                Picked Up
              </div>
              <div className="hidden md:flex items-center justify-start">
                Delivery
              </div>
              <div className="hidden md:flex items-center justify-start">
                Completed
              </div>
            </div>
            {!isLoading ? (
              userorder?.map((data: orderdata, idx: number) => (
                <OrderSummaryData
                  key={idx}
                  index={idx}
                  orderId={data.orderId}
                  status={data?.orderStatus}
                  schedule={data?.scheduledTime}
                  pick={data?.pickupTime}
                  delivery={data?.deliveredAt}
                  complete={data?.confirmedAt}
                />
              ))
            ) : (
              <div className="w-full h-[50%] flex items-center justify-center">
                Loading Data...
              </div>
            )}
            {userorder && userorder?.length <= 0 && (
              <div className=" w-full py-20 flex flex-col items-center text-neutral-400 justify-center">
                {" "}
                <img src={cloudimages.noorderworker} className="w-100" />
                <p>No orders are found</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
