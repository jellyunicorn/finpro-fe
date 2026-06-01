import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";
import { useNavigate } from "react-router";

type CreateAddressPayload = {
  address: string;
  city: string;
  postalCode: string;
  latitude: string;
  longitude: string;
  label: string;
};

export default function useCreateAddress() {
  const navigate = useNavigate();

  const createAddress = async (payload: CreateAddressPayload) => {
    try {
      await toast.promise(axiosInstance.post("/address/create", payload), {
        loading: "Creating...",
        success: "Address created",
        error: (err) => err.response?.data?.message || "Failed to create address",
      });
      navigate(0);
    } catch {}
  };

  return createAddress;
}
