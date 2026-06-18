import { STATUS, type OrderStatus } from "../../lib/statusLookup";
import TimeSummary from "./TimeSummary";

type Props = {
  orderId: string;
  status: OrderStatus;
  schedule: string;
  pick: string;
  delivery: string | null;
  complete: string | null;
  index: number;
};

export default function OrderSummaryData({
  orderId,
  status,
  schedule,
  pick,
  delivery,
  complete,
  index,
}: Props) {
  return (
    <div
      className={` w-full h-fit text-sm py-1   grid grid-cols-6 ${index % 2 == 0 && "bg-neutral-100"}`}
    >
      <div className="col-span-3 md:col-span-1 flex items-center justify-center">
        <div className="w-30 line-clamp-1">{orderId}</div>
      </div>
      <div className="col-span-3 md:col-span-1 flex items-center justify-center ">
        <div
          className={`border px-2 py-1 rounded-full ${STATUS[status]?.color} `}
        >
          {STATUS[status]?.label ?? status}
        </div>
      </div>
      <div className="hidden md:flex items-center justify-start">
        <TimeSummary data={schedule}/>
      </div>
      <div className="hidden md:flex items-center justify-start">
        <TimeSummary data={pick}/>
      </div>
      <div className="hidden md:flex items-center justify-start">
        <TimeSummary data={delivery}/>
      </div>
      <div className="hidden md:flex items-center justify-start">
        <TimeSummary data={complete}/>
      </div>
    </div>
  );
}
