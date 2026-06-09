export type OrderStatus =
  | "PENDING"
  | "WAITING_FOR_DRIVER"
  | "OTW_TO_OUTLET"
  | "ARRIVED_AT_OUTLET"
  | "WASHING"
  | "IRONING"
  | "PACKING"
  | "WAITING_FOR_PAYMENT"
  | "READY_TO_DELIVER"
  | "OTW_TO_CUSTOMER"
  | "ARRIVED_AT_CUSTOMER"
  | "CANCELLED"
  |"CONFIRMED";

export type StatusConfig = {
  label: string;
  color: string;
};

export const STATUS: Record<OrderStatus, StatusConfig> = {
  PENDING: {
    label: "Pending",
    color: "border-gray-400 text-gray-600 bg-gray-50",
  },
  WAITING_FOR_DRIVER: {
    label: "To Pickup",
    color: "border-yellow-400 text-yellow-600 bg-yellow-50",
  },
  OTW_TO_OUTLET: {
    label: "OTW",
    color: "border-blue-400 text-blue-600 bg-blue-50",
  },
  ARRIVED_AT_OUTLET: {
    label: "@Outlet",
    color: "border-blue-400 text-blue-600 bg-blue-50",
  },
  WASHING: {
    label: "Washing",
    color: "border-cyan-400 text-cyan-600 bg-cyan-50",
  },
  IRONING: {
    label: "Ironing",
    color: "border-cyan-400 text-cyan-600 bg-cyan-50",
  },
  PACKING: {
    label: "Packing",
    color: "border-cyan-400 text-cyan-600 bg-cyan-50",
  },
  WAITING_FOR_PAYMENT: {
    label: "Pending Payment",
    color: "border-orange-400 text-orange-600 bg-orange-50",
  },
  READY_TO_DELIVER: {
    label: "To Deliver",
    color: "border-green-400 text-green-600 bg-green-50",
  },
  OTW_TO_CUSTOMER: {
    label: "On Delivery",
    color: "border-blue-400 text-blue-600 bg-blue-50",
  },
  ARRIVED_AT_CUSTOMER: {
    label: "Delivered",
    color: "border-green-400 text-green-600 bg-green-50",
  },
  CANCELLED: {
    label: "Cancelled",
    color: "border-red-400 text-red-600 bg-red-50",
  },
    CONFIRMED: {
    label: "Confirmed",
    color: "border-green-400 text-green-600 bg-green-50",
  },
};
