import type { OrderItem } from "./orderItem";

export interface Job {
  jobId: string;
  station: string;
  createdAt: string;
  startTime: string;
  endTime: string;
  orderItems: OrderItem[];
}