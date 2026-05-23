import { z } from "zod";

export const outletSchema = z.object({
  name: z
    .string()
    .min(3, "Nama outlet minimal 3 karakter")
    .max(100, "Nama outlet maksimal 100 karakter"),
  fullAddress: z
    .string()
    .min(10, "Alamat lengkap minimal 10 karakter")
    .max(500, "Alamat maksimal 500 karakter"),
  city: z.string().min(2, "City wajib diisi").max(100),
  province: z.string().min(2, "Province wajib diisi").max(100),
  postalCode: z.string().max(10).optional(),
  latitude: z
    .number({ message: "Latitude harus angka" })
    .min(-90, "Latitude tidak valid")
    .max(90, "Latitude tidak valid"),
  longitude: z
    .number({ message: "Longitude harus angka" })
    .min(-180, "Longitude tidak valid")
    .max(180, "Longitude tidak valid"),
  serviceRadiusKm: z
    .number({ message: "Service radius harus angka" })
    .positive("Minimal 1 km")
    .max(50, "Maksimal 50 km"),
  pricePerKg: z
    .number({ message: "Price/kg harus angka" })
    .nonnegative("Tidak boleh negatif"),
  deliveryFeePerKm: z
    .number({ message: "Delivery fee harus angka" })
    .nonnegative("Tidak boleh negatif"),
  isActive: z.boolean(),
});

export type OutletFormData = z.infer<typeof outletSchema>;
