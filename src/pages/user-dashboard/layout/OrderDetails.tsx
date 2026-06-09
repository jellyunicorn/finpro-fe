import { useNavigate, useParams } from "react-router";
import type { orderdata, orderitems } from "../../../lib/types";
import { STATUS } from "../../../lib/statusLookup";
import {
  dateConverter,
  toReadableDateTime,
} from "../../../utils/dateconverUtils";
import location_icon from "../../../img/svg/address_blue.svg";
import DetailRow from "../../../components/order-details/DetailRow";
import TimelineRow from "../../../components/order-details/TimelineRow";
import StatusProgress from "../../../components/order-details/StatusProgress";
import { toRupiah } from "../../../utils/toRupiah";
import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../../lib/axios";
import ItemRow from "../../../components/order-details/ItemRow";
import usePaymentSession from "../../../hooks/usePaymentSession";
import useConfirmOrder from "../../../hooks/useConfirmOrder";

export default function OrderDetails() {
  const navigate = useNavigate();
  const handleConfirmOrder = useConfirmOrder();
  const { orderId } = useParams();
  const { createPaymentSession, isPending } = usePaymentSession();
  const { data: order, isLoading } = useQuery<orderdata>({
    queryKey: ["orderdetails", orderId],
    queryFn: async () => {
      const result = await axiosInstance.get(`/order/${orderId}`);
      return result.data;
    },
  });

  const { data: items } = useQuery({
    queryKey: ["orderitems", orderId],
    queryFn: async () => {
      const result = await axiosInstance.get(`/order/${orderId}/items`);
      return result.data;
    },
  });
  const { data: total } = useQuery({
    queryKey: ["pricetotal", orderId],
    queryFn: async () => {
      const result = await axiosInstance.get(`/order/${orderId}/total`);
      return result.data.total;
    },
  });
  if (isLoading)
    return <p className="px-10 py-10 text-neutral-400">Loading Data...</p>;
  if (!order)
    return <p className="px-10 py-10 text-neutral-400">Order not found.</p>;

  return (
    <main className=" flex-1 flex px-10 py-10  lg:w-[70%]  flex-col gap-5">
      <div className="flex items-start justify-between">
        <div className="flex flex-col ">
          <h1 className="text-2xl font-medium text-claundry-blue">
            Order Details
          </h1>
          <p className="text-sm text-neutral-400">
            Inspect and Manage your order here
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => navigate(-1)}
            className="text-md bg-claundry-blue  px-5 py-2 rounded-md text-white hover:bg-claundry-blue/60"
          >
            ← Back
          </button>
        </div>
      </div>

      <div className="w-full rounded-2xl border-claundry-accent border p-5 flex flex-col gap-3">
        <div className="flex justify-between items-center">
          <p className="font-medium text-lg text-claundry-blue">
            {dateConverter(order.createdAt)}
          </p>
          <div className="flex gap-2">
            <div
              className={`text-sm px-3 py-1 border rounded-full ${STATUS[order.orderStatus]?.color}`}
            >
              {STATUS[order.orderStatus]?.label ?? order.orderStatus}
            </div>
          </div>
        </div>
        <p className="text-[12px] text-neutral-400">
          Order ID: <span className="font-medium">{order.orderId}</span>
        </p>

        <hr className="border-neutral-200" />

        <div className="flex w-full justify-between items-center">
          <div className="flex gap-2 items-center">
            <img src={location_icon} alt="" className="h-5" />
            <p className="font-medium text-claundry-blue">From:</p>
            <p>{order.address?.label ?? "-"}</p>
          </div>
          <div className="flex relative items-center flex-1 mx-10">
            <p className="absolute w-full flex justify-center text-sm text-neutral-400 [-webkit-text-stroke:5px_white] [paint-order:stroke_fill] z-5">
              {order.distance} KM
            </p>
            <div className="flex-1 h-px z-1 bg-neutral-300 relative" />
            <div className="w-0 h-0 border-y-4 border-y-transparent border-l-8 relative border-l-neutral-300" />
          </div>
          <div className="flex gap-2 items-center">
            <p className="font-medium text-claundry-blue">Outlet:</p>
            <p>{order.outlet?.name ?? "-"}</p>
          </div>
        </div>
        <div className="flex text-sm justify-between">
          <p className="text-neutral-400">
            {order.address?.address ?? "-"}, {order.address?.city}{" "}
            {order.address?.postalCode}
          </p>
          <p className="text-neutral-400">
            {order.outlet?.address ?? "-"}, {order.outlet?.city}{" "}
            {order.outlet?.postalCode}
          </p>
        </div>
      </div>

      {/* //-----> items details */}
      <div className="border border-claundry-accent rounded-2xl h-fit p-5 flex flex-col ">
        <h2 className="font-medium text-claundry-blue mb-5">Items Details</h2>
        <hr className="border-neutral-200 mb-2" />

        <div>
          <div className="w-full grid grid-cols-7 h-fit items-center text-sm px-5  text-claundry-blue ">
            <div className="col-span-3">item name</div>
            <div>Qty</div>
            <div>Weight</div>
            <div>Price/Pcs</div>
            <div>Sub-Total</div>
          </div>
        </div>
        <hr className="border-neutral-200 mt-2" />
        {items?.length > 0 ? (
          <div>
            {items?.map((e: orderitems, idx: number) => {
              return (
                <div
                  key={idx}
                  className={`${idx % 2 !== 0 && "bg-neutral-100"}`}
                >
                  <ItemRow {...e} />
                </div>
              );
            })}
          </div>
        ) : (
          <div className="w-full h-30 flex items-center justify-center text-neutral-400">
            {" "}
            Waiting for worker to input items...{" "}
          </div>
        )}
        <hr className="border-neutral-200 mb-2" />
        <div className="w-full flex justify-between  px-5">
          <p className="font-medium">Total</p>
          <p className="lg:mr-10 text-right">{toRupiah(total)}</p>
        </div>
        <hr className="border-neutral-200 mt-2" />
      </div>
      {/* //----> status progress */}
      <StatusProgress status={order.orderStatus} />
      {order.orderStatus === "ARRIVED_AT_CUSTOMER" && (
        <button 
        onClick={()=>handleConfirmOrder(order.orderId)}
        className="bg-claundry-blue text-white text-md px-5 py-2 rounded-full">
          {" "}
          Confirm Delivery{" "}
        </button>
      )}
      {items?.length > 0 && order.paymentStatus !== "SUCCESS" && (
        <button
          disabled={isPending}
          onClick={() => createPaymentSession(order.orderId)}
          className="bg-claundry-blue text-white rounded-full py-2 disabled:opacity-50"
        >
          {isPending ? "Processing..." : "Make Payment"}
        </button>
      )}
      {/* //------> TimelinePayment */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Timeline */}
        <div className="rounded-2xl border-claundry-accent border p-5 flex flex-col gap-3">
          <h2 className="font-medium text-claundry-blue">Order Timeline</h2>
          <hr className="border-neutral-200" />
          <TimelineRow label="Scheduled" value={order.scheduledTime} />
          <TimelineRow label="Picked Up" value={order.pickupTime} />
          <TimelineRow label="Delivered" value={order.deliveredAt} />
          <TimelineRow label="Confirmed" value={order.confirmedAt} />
        </div>

        {/* Payment */}
        <div className="rounded-2xl border-claundry-accent border p-5 flex flex-col gap-3">
          <h2 className="font-medium text-claundry-blue">Payment</h2>
          <hr className="border-neutral-200" />
          <DetailRow label="Method" value={order.paymentMethod} />
          <DetailRow
            label="Status"
            value={
              <span
                className={`px-2 py-0.5 text-sm border rounded-full ${
                  order.paymentStatus === "SUCCESS"
                    ? "border-green-400 text-green-600 bg-green-50"
                    : "border-orange-400 text-orange-600 bg-orange-50"
                }`}
              >
                {order.paymentStatus}
              </span>
            }
          />
          <DetailRow
            label="Paid At"
            value={toReadableDateTime(order.paymentTime)}
          />
        </div>
      </div>
      {/* //----->itemsdetails */}
    </main>
  );
}
