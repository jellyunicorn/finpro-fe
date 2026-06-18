import { z } from "zod";

export const attendanceFilterSchema = z
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

export type AttendanceFilterSchema = z.infer<typeof attendanceFilterSchema>;
