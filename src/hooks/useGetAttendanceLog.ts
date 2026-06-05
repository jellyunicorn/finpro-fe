import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../lib/axios";
import type { PageableResponse } from "../types/pagination";
import type { Attendance } from "../types/attendance";

export default function useGetAttendanceLog(page: number, take?: number) {
  return useQuery({
    queryKey: ["attendanceLog", page, take],
    queryFn: async () => {
      const { data } = await axiosInstance.get<PageableResponse<Attendance>>(
        "/attendance",
        { params: { page: page, take: take } },
      );
      console.log(data);
      return data;
    },
  });
}
