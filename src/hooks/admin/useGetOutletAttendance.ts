import { useQuery } from '@tanstack/react-query';
import { axiosInstance } from '../../lib/axios';
import type { PageableResponse } from '../../types/pagination';
import type { EmployeeAttendance } from '../../types/employeeAttendance';

export default function useGetOutletAttendance(page: number, take?: number) {
  return useQuery({
    queryKey: ["outletWorkerAttendnace", page, take],
    queryFn: async () => {
      const { data } = await axiosInstance.get<PageableResponse<EmployeeAttendance>>(
        "/attendance/outlet",
        { params: { page: page, take: take } },
      );
      return data;
    },
  });
}
