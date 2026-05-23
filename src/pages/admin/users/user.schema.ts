import { z } from "zod";

const ROLES = [
  "CUSTOMER",
  "SUPER_ADMIN",
  "OUTLET_ADMIN",
  "WORKER",
  "DRIVER",
] as const;

const STATIONS = ["WASHING", "IRONING", "PACKING"] as const;

export const userSchema = z
  .object({
    name: z
      .string()
      .min(2, "Nama minimal 2 karakter")
      .max(100, "Nama maksimal 100 karakter"),
    email: z.string().email("Format email tidak valid"),
    phone: z
      .string()
      .regex(/^(\+62|62|0)[0-9\s-]{8,}$/, "Format phone tidak valid")
      .or(z.literal(""))
      .optional(),
    role: z.enum(ROLES, { error: () => ({ message: "Role harus dipilih" }) }),
    outletId: z.string().optional(),
    workerStation: z.enum(STATIONS).optional(),
    isActive: z.boolean(),
  })
  .superRefine((data, ctx) => {
    // Outlet wajib untuk semua role kecuali SUPER_ADMIN dan CUSTOMER
    const needsOutlet = ["OUTLET_ADMIN", "WORKER", "DRIVER"].includes(data.role);
    if (needsOutlet && !data.outletId) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Outlet wajib dipilih untuk role ini",
        path: ["outletId"],
      });
    }

    // Worker station wajib HANYA untuk role WORKER
    if (data.role === "WORKER" && !data.workerStation) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Station wajib dipilih untuk Worker",
        path: ["workerStation"],
      });
    }
  });

export type UserFormData = z.infer<typeof userSchema>;
