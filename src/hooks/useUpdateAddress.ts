import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";
import { useNavigate } from "react-router";

type AddressPayload = {
  id: number;
  address: string;
  city: string;
  postalCode: string;
  latitude: string;
  longitude: string;
  isPrimary: boolean;
  label: string;
};

export default function useUpdateAddress() {
  const navigate = useNavigate();

  const updateAddress = async (payload: AddressPayload) => {
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
