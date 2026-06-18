import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../../lib/axios";
import toast from "react-hot-toast";

interface CancelDriverJobPayload {
  jobId: string;
  type: "pickup" | "delivery";
}

export function useCancelDriverJob() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ jobId, type }: CancelDriverJobPayload) => {
      if (type !== "pickup" && type != "delivery") {
        toast.error("Something went wrong!");
        return;
      }
      const response = await axiosInstance.patch(
        `/driver/${type}/${jobId}/cancel`,
      );
      return response.data;
    },
    onSuccess: (data) => {
      queryClient.resetQueries({ queryKey: ["activeDriverJob"] });
      queryClient.invalidateQueries({ queryKey: ["availablePickups"] });
      queryClient.invalidateQueries({ queryKey: ["availableDeliveries"] });
      toast.success(data.message || "Job cancelled successfuly!");
    },
    onError: () => {
      toast.error("Something went wrong!");
    },
  });
}
