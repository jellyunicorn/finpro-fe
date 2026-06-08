import type { OrderItem } from "./orderItem";


export interface AvailableJob {
  jobId: string;
  station: string;
  createdAt: string;
  orderItems: OrderItem[];
}
