import type { AppUser, Role, WorkerStation } from "../types/user.types";

const outlets = [
  { id: "outlet-1", name: "Outlet Kemang" },
  { id: "outlet-2", name: "Outlet Senopati" },
  { id: "outlet-3", name: "Outlet Sudirman" },
];

interface UserSeed {
  name: string;
  email: string;
  phone: string | null;
  role: Role;
  outletIdx: number | null; // index dari outlets array
  workerStation: WorkerStation | null;
  isVerified: boolean;
  isActive: boolean;
}

const seeds: UserSeed[] = [
  // Super Admin (1)
  {
    name: "Mas Farce",
    email: "superadmin@claundry.com",
    phone: "+62 812 0000 0001",
    role: "SUPER_ADMIN",
    outletIdx: null,
    workerStation: null,
    isVerified: true,
    isActive: true,
  },
  // Outlet Admins (3)
  {
    name: "Sari Wulandari",
    email: "sari.admin@claundry.com",
    phone: "+62 812 1111 2222",
    role: "OUTLET_ADMIN",
    outletIdx: 0,
    workerStation: null,
    isVerified: true,
    isActive: true,
  },
  {
    name: "Reza Pratama",
    email: "reza.admin@claundry.com",
    phone: "+62 813 3333 4444",
    role: "OUTLET_ADMIN",
    outletIdx: 1,
    workerStation: null,
    isVerified: true,
    isActive: true,
  },
  {
    name: "Linda Sari",
    email: "linda.admin@claundry.com",
    phone: "+62 821 5555 6666",
    role: "OUTLET_ADMIN",
    outletIdx: 2,
    workerStation: null,
    isVerified: false,
    isActive: true,
  },
  // Workers (per station)
  {
    name: "Budi Hartono",
    email: "budi.washing@claundry.com",
    phone: "+62 812 7777 8888",
    role: "WORKER",
    outletIdx: 0,
    workerStation: "WASHING",
    isVerified: true,
    isActive: true,
  },
  {
    name: "Dewi Anggraini",
    email: "dewi.ironing@claundry.com",
    phone: "+62 856 9999 0000",
    role: "WORKER",
    outletIdx: 0,
    workerStation: "IRONING",
    isVerified: true,
    isActive: true,
  },
  {
    name: "Rina Lestari",
    email: "rina.packing@claundry.com",
    phone: "+62 877 1111 3333",
    role: "WORKER",
    outletIdx: 0,
    workerStation: "PACKING",
    isVerified: true,
    isActive: true,
  },
  {
    name: "Joko Susilo",
    email: "joko.washing@claundry.com",
    phone: "+62 818 4444 5555",
    role: "WORKER",
    outletIdx: 1,
    workerStation: "WASHING",
    isVerified: true,
    isActive: true,
  },
  // Drivers
  {
    name: "Andi Setiawan",
    email: "andi.driver@claundry.com",
    phone: "+62 819 6666 7777",
    role: "DRIVER",
    outletIdx: 0,
    workerStation: null,
    isVerified: true,
    isActive: true,
  },
  {
    name: "Bayu Pratama",
    email: "bayu.driver@claundry.com",
    phone: "+62 822 8888 9999",
    role: "DRIVER",
    outletIdx: 1,
    workerStation: null,
    isVerified: true,
    isActive: true,
  },
  // Customers
  {
    name: "Jane Smith",
    email: "jane@example.com",
    phone: "+62 812 1234 5678",
    role: "CUSTOMER",
    outletIdx: null,
    workerStation: null,
    isVerified: true,
    isActive: true,
  },
  {
    name: "David Teru",
    email: "daveteru@gmail.com",
    phone: "+62 812 8232 32",
    role: "CUSTOMER",
    outletIdx: null,
    workerStation: null,
    isVerified: false,
    isActive: true,
  },
  // Inactive user (buat test filter)
  {
    name: "Ex-Worker",
    email: "exworker@claundry.com",
    phone: null,
    role: "WORKER",
    outletIdx: 2,
    workerStation: "PACKING",
    isVerified: true,
    isActive: false,
  },
];

export const MOCK_USERS_FULL: AppUser[] = seeds.map((seed, i) => ({
  id: `user-${i + 1}`,
  name: seed.name,
  email: seed.email,
  phone: seed.phone,
  role: seed.role,
  outletId: seed.outletIdx !== null ? outlets[seed.outletIdx].id : null,
  outletName: seed.outletIdx !== null ? outlets[seed.outletIdx].name : null,
  workerStation: seed.workerStation,
  isVerified: seed.isVerified,
  isActive: seed.isActive,
  profilePhoto: null,
  createdAt: new Date(Date.now() - (60 - i * 2) * 86400000).toISOString(),
  updatedAt: new Date(Date.now() - (10 - i) * 86400000).toISOString(),
}));

// Helper: generate random temp password (mimic backend behavior)
export function generateTempPassword(): string {
  const chars =
    "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789";
  const special = "!@#$%&*";
  let pwd = "";
  for (let i = 0; i < 8; i++) {
    pwd += chars[Math.floor(Math.random() * chars.length)];
  }
  pwd += special[Math.floor(Math.random() * special.length)];
  return pwd;
}

export const MOCK_OUTLETS_DROPDOWN = outlets;
