import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../lib/axios";

export default function useGetEmployeeAttendance(
  id: number,
  page: number,
  startDate?: string,
  endDate?: string,
  take?: number,
) {
  return useQuery({
    queryKey: ["employeeAttendanceLog", id, page, take],
    queryFn: async () => {
      const { data } = await axiosInstance.get(`/attendance/employee/${id}`, {
        params: { page, take, startDate, endDate },
      });
      return data;
    },
  });
}
