import type { OrderItem } from "../types/orderItem";

export const formatOrderItems = (items: OrderItem[]) => {
  return items.map((item) => `${item.quantity}x ${item.name}`).join(", ");
};
