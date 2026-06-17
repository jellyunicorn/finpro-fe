import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../../lib/axios";
import toast from "react-hot-toast";

interface BeginDriverJobPayload {
  jobId: string;
  type: "pickup" | "delivery";
}

export function useBeginDriverJob() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ jobId, type }: BeginDriverJobPayload) => {
      if (type !== "pickup" && type != "delivery") {
        toast.error("Something went wrong!");
        return;
      }
      const response = await axiosInstance.patch(
        `/driver/${type}/${jobId}/assign`,
      );
      return response.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["activeDriverJob"] });
      queryClient.invalidateQueries({ queryKey: ["availablePickups"] });
      queryClient.invalidateQueries({ queryKey: ["availableDeliveries"] });
      toast.success(data.message || "Pickup accepted!");
    },
    onError: () => {
      toast.error("Something went wrong!");
    },
  });
}
