import { z } from "zod";

export const processOrderItemSchema = z.object({
  laundryItemId: z.string().min(1, "Pilih jenis pakaian"),
  quantity: z
    .number({ message: "Quantity harus angka" })
    .int("Quantity harus bilangan bulat")
    .min(1, "Minimal 1 pcs")
    .max(999, "Quantity terlalu besar"),
});

export const processOrderSchema = z.object({
  totalWeightKg: z
    .number({ message: "Weight harus angka" })
    .positive("Weight harus lebih dari 0")
    .max(100, "Weight tidak boleh lebih dari 100 kg"),
  items: z
    .array(processOrderItemSchema)
    .min(1, "Minimal harus ada 1 item")
    .refine(
      (items) => {
        // Cek duplicate laundryItemId
        const ids = items.map((i) => i.laundryItemId).filter(Boolean);
        return ids.length === new Set(ids).size;
      },
      { message: "Tidak boleh ada item duplikat" }
    ),
  notes: z.string().max(500, "Notes maksimal 500 karakter").optional(),
});

export type ProcessOrderFormData = z.infer<typeof processOrderSchema>;
