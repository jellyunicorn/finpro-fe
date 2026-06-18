import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";

export default function useAddressForm() {

  const addressForm = async (id: number) => {
    const payload = { id };
    try {
      await toast.promise(axiosInstance.patch("/address/switch", payload), {
        loading: "Updating...",
        success: "Default address updated",
        error: (err) => err.response?.data?.message || "Failed to update address",
      });
    } catch {}
  };

  return addressForm;
}
