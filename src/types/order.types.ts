import type { OrderStatus } from "../constants/order-status";

// Re-export OrderStatus biar gampang import
export type { OrderStatus };

export interface OrderItem {
  id: string;
  orderId: string;
  laundryItemId: string;
  laundryItemName: string; // denormalized buat display
  quantity: number;
}

export interface Worker {
  id: string;
  name: string;
  workerStation?: "WASHING" | "IRONING" | "PACKING";
}

export interface Driver {
  id: string;
  name: string;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone?: string;
}

export interface PickupAddressSnapshot {
  label?: string;
  recipientName: string;
  recipientPhone: string;
  fullAddress: string;
  city: string;
  province: string;
  postalCode?: string;
  latitude: number;
  longitude: number;
}

export interface OrderListItem {
  id: string;
  orderNumber: string;
  customerId: string;
  customerName: string;
  outletId: string;
  outletName: string;
  status: OrderStatus;
  totalWeightKg: number | null;
  totalAmount: number | null;
  paidAt: string | null;
  pickupScheduledAt: string;
  createdAt: string;
  updatedAt: string;
}

export interface OrderDetail extends OrderListItem {
  pickupAddressSnapshot: PickupAddressSnapshot;
  pickupLatitude: number;
  pickupLongitude: number;
  notes: string | null;
  customer: Customer;
  pickupDriver: Driver | null;
  deliveryDriver: Driver | null;
  washingWorker: Worker | null;
  ironingWorker: Worker | null;
  packingWorker: Worker | null;
  orderItems: OrderItem[];
  // Lifecycle timestamps
  pickedUpAt: string | null;
  arrivedAtOutletAt: string | null;
  processedByAdminAt: string | null;
  washingCompletedAt: string | null;
  ironingCompletedAt: string | null;
  packingCompletedAt: string | null;
  deliveryStartedAt: string | null;
  deliveredAt: string | null;
  confirmedAt: string | null;
  cancelledAt: string | null;
}

// Query params untuk List Orders
export interface OrderListQuery {
  page?: number;
  perPage?: number;
  search?: string; // search by order number / customer name
  status?: OrderStatus;
  outletId?: string;
  startDate?: string; // ISO date
  endDate?: string;
  sortBy?: "createdAt" | "pickupScheduledAt" | "totalAmount";
  sortOrder?: "asc" | "desc";
}

// Process order payload
export interface ProcessOrderPayload {
  totalWeightKg: number;
  items: Array<{
    laundryItemId: string;
    quantity: number;
  }>;
  notes?: string;
}
