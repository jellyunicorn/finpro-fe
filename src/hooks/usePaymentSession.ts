import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";
import { useMutation } from "@tanstack/react-query";

type xenditresponse = {
  url: string;
  sessionId: number;
};

export default function usePaymentSession() {
  const { mutate: createPaymentSession, isPending } = useMutation({
    mutationFn: async (orderid: string) => {
      const res = await axiosInstance.post<xenditresponse>(
        `/payment/${orderid}`,
      );
      return res.data;
    },
    onSuccess: (data) => {
      // redirect to Xendit hosted checkout
      window.location.href = data.url;
    },
    onError: () => {
      toast.error("Failed to start payment. Please try again.");
    },
  });

  return { createPaymentSession, isPending };
}
