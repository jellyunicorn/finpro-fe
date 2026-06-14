import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

interface FinishDriverJobPayload {
  jobId: string;
  type: "pickup" | "delivery";
}

export function useFinishDriverJob() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ jobId, type }: FinishDriverJobPayload) => {
      if (type !== "pickup" && type != "delivery") {
        toast.error("Something went wrong!");
        return;
      }
      const response = await axiosInstance.patch(
        `/driver/${type}/${jobId}/finish`,
      );
      return response.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["activeDriverJob"] });
      queryClient.invalidateQueries({ queryKey: ["availablePickups"] });
      queryClient.invalidateQueries({ queryKey: ["availableDeliveries"] });
      toast.success(data.message || "Delivery finished!");
    },
    onError: () => {
      toast.error("Something went wrong!");
    },
  });
}
