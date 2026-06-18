import { useQuery } from '@tanstack/react-query';
import type { PageableResponse } from '../../types/pagination';
import { axiosInstance } from '../../lib/axios';
import type { Job } from '../../types/job';

export default function useGetJobHistory(page: number, take?: number) {
  return useQuery({
    queryKey: ["jobHistory", page, take],
    queryFn: async () => {
      const { data } = await axiosInstance.get<PageableResponse<Job>>(
        "/worker/job-history",
        { params: { page: page, take: take } },
      );
      return data;
    },
  });
}
