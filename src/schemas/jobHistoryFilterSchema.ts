import { z } from "zod";

export const jobHistoryFilterSchema = z
  .object({
    startDate: z.iso.date().or(z.literal("")).optional(),
    endDate: z.iso.date().or(z.literal("")).optional(),
  })
  .refine(
    (data) =>
      !data.startDate ||
      !data.endDate ||
      new Date(data.startDate) <= new Date(data.endDate),
    {
      message: "Start date must be before end date",
      path: ["endDate"],
    },
  );

export type JobHistoryFilterSchema = z.infer<typeof jobHistoryFilterSchema>;
