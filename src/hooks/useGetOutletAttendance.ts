import { useQuery } from '@tanstack/react-query';
import { axiosInstance } from '../lib/axios';

export default function useGetOutletAttendance(page: number, take?: number) {
  return useQuery({
    queryKey: ["outletWorkerAttendnace", page, take],
    queryFn: async () => {
      const { data } = await axiosInstance.get(
        "/attendance/outlet",
        { params: { page: page, take: take } },
      );
      console.log(data);
      return data;
    },
  });
}
