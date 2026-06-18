import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../lib/axios";
import type { AvailableJob } from "../../types/availableJob";
import type { PageableResponse } from "../../types/pagination";

export default function useGetAvailableJobs(page: number, take?: number) {
  return useQuery({
    queryKey: ["availableJobs", page, take],
    queryFn: async () => {
      const { data } = await axiosInstance.get<PageableResponse<AvailableJob>>(
        "/worker/jobs",
        { params: { page: page, take: take } },
      );
      return data;
    },
  });
}
