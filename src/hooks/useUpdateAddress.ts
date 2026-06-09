import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";
import { useNavigate } from "react-router";
import type { addressform } from "../lib/types";

export default function useUpdateAddress() {
  const navigate = useNavigate();

  const updateAddress = async (payload: addressform) => {
    try {
      await toast.promise(axiosInstance.patch("/address/update", payload), {
        loading: "Saving...",
        success: "Address updated",
        error: (err) => err.response?.data?.message || "Failed to update address",
      });
      navigate(0);
    } catch {}
  };

  return updateAddress;
}
