export type BypassStatus = "PENDING" | "APPROVED" | "REJECTED";

export type WorkerStation = "WASHING" | "IRONING" | "PACKING";

export interface BypassItem {
  laundryItemId: string;
  laundryItemName: string;
  expectedQty: number;
  actualQty: number;
}

export interface BypassRequestListItem {
  id: string;
  orderId: string;
  orderNumber: string;
  outletId: string;
  outletName: string;
  workerId: string;
  workerName: string;
  workerStation: WorkerStation;
  status: BypassStatus;
  workerNotes: string;
  itemCount: number; // jumlah item yang mismatch
  createdAt: string;
}

export interface BypassRequestDetail extends BypassRequestListItem {
  items: BypassItem[];
  reviewedByAdminId: string | null;
  reviewedByAdminName: string | null;
  adminNotes: string | null;
  reviewedAt: string | null;
}

// Query params
export interface BypassListQuery {
  page?: number;
  perPage?: number;
  search?: string;
  status?: BypassStatus;
  workerStation?: WorkerStation;
  outletId?: string;
}

// Payload buat review (approve/reject)
export interface BypassReviewPayload {
  decision: "APPROVE" | "REJECT";
  password: string; // re-auth
  adminNotes?: string;
}
