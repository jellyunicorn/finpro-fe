import type { orderitems } from "../../lib/types";
import { toRupiah } from "../../utils/toRupiah";

export default function ItemRow({
  name,
  quantity,
  weight,
  price,
  description,
}: orderitems) {
  return (
    <div className="px-2 md:px-5 pr-5 py-2 text-sm">
      <div className="w-full grid grid-cols-7 h-fit items-center  ">
        <div className="col-span-3">{name}</div>
        <div className="whitespace-nowrap">{quantity} {quantity>1 ? "pcs" : "piece"}</div>
        <div><span className="hidden md:block">{weight} kg</span></div>
        <div className="text-neutral-400"><span className="hidden md:block">{toRupiah(price)}</span></div>
        <div>{toRupiah(price*quantity)}</div>
      </div>
      <div className="text-neutral-400">{description || "-"}</div>
    </div>
  );
}
