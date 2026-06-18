import { useQuery } from "@tanstack/react-query";
import type { PageableResponse } from "../../types/pagination";
import { axiosInstance } from "../../lib/axios";
import type { Job } from "../../types/job";

export default function useGetJobHistory(
  page: number,
  startDate?: string,
  endDate?: string,
  take?: number,
) {
  return useQuery({
    queryKey: ["jobHistory", page, take, startDate, endDate],
    queryFn: async () => {
      const { data } = await axiosInstance.get<PageableResponse<Job>>(
        "/worker/job-history",
        { params: { page, take, startDate, endDate } },
      );
      return data;
    },
  });
}
