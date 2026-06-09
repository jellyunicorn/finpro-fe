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
    <div className="px-5 py-2 text-sm">
      <div className="w-full grid grid-cols-7 h-fit items-center  ">
        <div className="col-span-3">{name}</div>
        <div>{quantity} {quantity>1 ? "pcs" : "piece"}</div>
        <div>{weight} kg</div>
        <div className="text-neutral-400">{toRupiah(price)}</div>
        <div>{toRupiah(price*quantity)}</div>
      </div>
      <div className="text-neutral-400">{description || "-"}</div>
    </div>
  );
}
