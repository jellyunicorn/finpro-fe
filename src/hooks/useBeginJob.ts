import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

interface BeginJobPayload {
  jobId: string;
  items: { itemId: number; quantity: number }[];
}

export function useBeginJob() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ jobId, items }: BeginJobPayload) => {
      const response = await axiosInstance.post("/worker/begin-job", { jobId, items });
      return response.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["availableJobs"] });
      toast.success(data.message || "Job accepted!");
    },
    onError: (error) => {
      toast.error("Something went wrong!");
    },
  });
}
