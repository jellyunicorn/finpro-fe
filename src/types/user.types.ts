export type Role =
  | "CUSTOMER"
  | "SUPER_ADMIN"
  | "OUTLET_ADMIN"
  | "WORKER"
  | "DRIVER";

export type WorkerStation = "WASHING" | "IRONING" | "PACKING";

export interface AppUser {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  role: Role;
  outletId: string | null;
  outletName: string | null;
  workerStation: WorkerStation | null;
  isVerified: boolean;
  isActive: boolean;
  profilePhoto: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface UserListQuery {
  page?: number;
  perPage?: number;
  search?: string;
  role?: Role;
  outletId?: string;
  isActive?: boolean;
}

export interface UserPayload {
  name: string;
  email: string;
  phone?: string;
  role: Role;
  outletId?: string;
  workerStation?: WorkerStation;
  isActive: boolean;
}

// Response pas Create user - includes temporary password (sekali tampil)
export interface CreateUserResponse {
  user: AppUser;
  temporaryPassword: string;
}

export const ROLE_LABELS: Record<Role, string> = {
  CUSTOMER: "Customer",
  SUPER_ADMIN: "Super Admin",
  OUTLET_ADMIN: "Outlet Admin",
  WORKER: "Worker",
  DRIVER: "Driver",
};

export const STATION_LABELS: Record<WorkerStation, string> = {
  WASHING: "Washing",
  IRONING: "Ironing",
  PACKING: "Packing",
};
