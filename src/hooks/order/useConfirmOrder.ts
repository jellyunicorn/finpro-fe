import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import { axiosInstance } from "../../lib/axios";



export default function useConfirmOrder() {
  const navigate = useNavigate();

  const confirmOrder = async (orderId: string) => {
    try {
      await toast.promise(
        axiosInstance.patch(`/order/confirm/${orderId}`),
        {
          loading: "Confirming...",
          success: "Successfuly confirmed Order",
          error: (err) =>
            err.response?.data?.message || "Failed to Confirm Order",
        },
      );
      navigate(0)
    } catch {}
  };

  return confirmOrder;
}
