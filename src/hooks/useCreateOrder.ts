import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";
import { useNavigate } from "react-router";
import type { pickupform } from "../lib/types";



export default function useCreateOrder() {
  const navigate = useNavigate();

  const createOrder = async (payload: pickupform) => {
    try {
      await toast.promise(
        axiosInstance.post("/order/new", payload),
        {
          loading: "Creating...",
          success: "New Order Created",
          error: (err) =>
            err.response?.data?.message || "Failed to Create Order",
        },
      );
      navigate("/dashboard");
    } catch {}
  };

  return createOrder;
}
