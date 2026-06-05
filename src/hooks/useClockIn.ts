import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import type { AxiosError } from "axios";

export default function useClockIn() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const response = await axiosInstance.put("/attendance/clock-in");
      return response.data;
    },
    onSuccess: () => {
      toast.success("Clocked in!");
      queryClient.invalidateQueries({ queryKey: ["attendanceLog"] });
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast.error(error.response?.data.message || "Something went wrong!");
    },
  });
}
