import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

interface NextDriverJobStatusPayload {
  jobId: string;
  type: "pickup" | "delivery";
}

export function useNextDriverJobStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ jobId, type }: NextDriverJobStatusPayload) => {
      if (type !== "pickup" && type != "delivery") {
        toast.error("Something went wrong!");
        return;
      }
      const response = await axiosInstance.patch(
        `/driver/${type}/${jobId}/next`,
      );
      return response.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["activeDriverJob"] });
      toast.success(data.message || "You have arrived at your destination!");
    },
    onError: () => {
      toast.error("Something went wrong!");
    },
  });
}
