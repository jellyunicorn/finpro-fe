import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../lib/axios";
import type { PageableResponse } from "../../types/pagination";
import type { Job } from "../../types/job";

export default function useGetActiveJobs(page: number, take?: number) {
  return useQuery({
    queryKey: ["activeJobs", page, take],
    queryFn: async () => {
      const { data } = await axiosInstance.get<PageableResponse<Job>>(
        "/worker/active-jobs",
        { params: { page: page, take: take } },
      );
      return data;
    },
  });
}
