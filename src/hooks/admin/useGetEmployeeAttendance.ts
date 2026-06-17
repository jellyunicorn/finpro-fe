import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../lib/axios";

export default function useGetEmployeeAttendance(
  id: number,
  page: number,
  take?: number,
) {
  return useQuery({
    queryKey: ["employeeAttendanceLog", id, page, take],
    queryFn: async () => {
      const { data } = await axiosInstance.get(
        `/attendance/employee/${id}`,
        { params: { page: page, take: take } },
      );
      return data;
    },
  });
}
