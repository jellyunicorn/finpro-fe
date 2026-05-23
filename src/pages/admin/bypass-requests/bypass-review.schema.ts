import { z } from "zod";

export const bypassReviewSchema = z.object({
  password: z
    .string()
    .min(1, "Password wajib diisi untuk konfirmasi"),
  adminNotes: z.string().max(500, "Catatan maksimal 500 karakter").optional(),
});

export type BypassReviewFormData = z.infer<typeof bypassReviewSchema>;
