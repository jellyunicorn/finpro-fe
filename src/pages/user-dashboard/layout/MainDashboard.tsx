import { Link, useLoaderData } from "react-router";
import { cloudimages } from "../../../lib/cloudinary";
import Greetings from "../../../components/user-dashboard/Greetings";
import addressicon from "../../../img/svg/address_blue.svg";
import OrderSummaryData from "../../../components/user-dashboard/OrderSummaryData";
import type { addressdata, orderdata } from "../../../lib/types";
import { todaysdate } from "../../../utils/todaysdateUtils";
import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../../lib/axios";

export default function MainDashboard() {
  const { userdata: loaderdata, addresses } = useLoaderData();
  const primaryAddress = addresses.useraddress.find(
    (e: addressdata) => e.isPrimary === true,
  );

  const { data: userorder, isLoading } = useQuery<orderdata[]>({
    queryKey: ["orders"],
    queryFn: async () => {
      const result = await axiosInstance.get("/order/");
      return result.data;
    },
  });

  const OngoingOrders = userorder?.filter(
    (e: orderdata) => e.confirmedAt === null || e.confirmedAt === "",
  );
  const PendingPayment = userorder?.filter(
    (e: orderdata) => e.paymentStatus === "PENDING",
  );

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
      <div className="h-50  w-full z-2 relative flex flex-col gap-1  p-10 items-center justify-center">
        <p>{todaysdate}</p>
        <h1 className="text-4xl z-2 text-claundry-blue max-w-150 text-center ">
          {" "}
          <Greetings />
        </h1>
        <img
          src={cloudimages.dashboard_img}
          alt=""
          className="h-full absolute right-0 mr-10 "
        />
      </div>
      <div className=" w-full flex flex-col gap-2">
        <div className="flex gap-1 items-center text-blue-700 font-medium">
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
      <div className=" w-full flex gap-5 h-150">
        <div className="w-[25%] h-full rounded-xl gap-5 flex flex-col">
          <Link
            to="/dashboard/pickup"
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
          <div className="flex flex-col justify-between bg-white border rounded-xl h-40 border-[#BEE6E1] p-5">
            <h3 className="text-xl font-medium">Ongoing Laundry</h3>
            <span className="text-4xl font-bold text-claundry-blue">
              {OngoingOrders?.length}
            </span>
          </div>
          <div className="flex flex-col justify-between bg-white border rounded-xl h-40 border-[#BEE6E1] p-5">
            <h3 className="text-xl font-medium">Pending Payments</h3>
            <span className="text-4xl font-bold text-claundry-blue">
              {PendingPayment?.length}
            </span>
          </div>
        </div>
        <div className="rounded-xl bg-white flex-1 flex flex-col h-full border py-5 px-10 border-blue-200">
          <h2 className="text-xl">Order Summary</h2>
          <div className="w-full  text-claundry-blue font-medium h-full">
            <div className=" w-full h-10 border-b border-neutral-200 grid grid-cols-6">
              <div className=" flex items-center justify-center">Order ID</div>
              <div className=" flex items-center justify-start">Status</div>
              <div className=" flex items-center justify-start">
                Scheduled At
              </div>
              <div className=" flex items-center justify-start">
                Picked Up At
              </div>
              <div className=" flex items-center justify-start">
                Delivery At
              </div>
              <div className=" flex items-center justify-start">
                Completed At
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
          </div>
        </div>
      </div>
    </main>
  );
}
