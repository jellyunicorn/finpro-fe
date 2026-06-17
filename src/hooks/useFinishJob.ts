import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import type { Job } from "../types/job";

interface FinishJobPayload {
  jobId: string;
}

interface FinishJobResponse {
  message: string;
  job: Job | null;
}

export function useFinishJob() {
  const queryClient = useQueryClient();

  return useMutation<FinishJobResponse, Error, FinishJobPayload>({
    mutationFn: async ({ jobId }: FinishJobPayload) => {
      const response = await axiosInstance.patch(`/worker/finish-job/${jobId}`);
      return response.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["activeJobs"] });
      toast.success(data.message || "Job finished!");
    },
    onError: () => {
      toast.error("Something went wrong!");
    },
  });
}
