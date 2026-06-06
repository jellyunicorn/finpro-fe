import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";
import { useNavigate } from "react-router";
import type { addressform } from "../lib/types";

export default function useCreateAddress() {
  const navigate = useNavigate();

  const createAddress = async (payload: addressform) => {
    try {
      await toast.promise(axiosInstance.post("/address/create", payload), {
        loading: "Creating...",
        success: "Address created",
        error: (err) =>
          err.response?.data?.message || "Failed to create address",
      });
      navigate(0);
    } catch {}
  };

  return createAddress;
}
