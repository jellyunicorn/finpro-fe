import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../lib/axios";
import type { PageableResponse } from "../../types/pagination";
import type { Attendance } from "../../types/attendance";

export default function useGetAttendanceLog(
  page: number,
  startDate?: string,
  endDate?: string,
  take?: number,
) {
  return useQuery({
    queryKey: ["attendanceLog", page, take, startDate, endDate],
    queryFn: async () => {
      const { data } = await axiosInstance.get<PageableResponse<Attendance>>(
        "/attendance",
        { params: { page, take, startDate, endDate } },
      );
      return data;
    },
  });
}
