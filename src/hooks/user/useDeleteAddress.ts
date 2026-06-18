import toast from "react-hot-toast";
import { axiosInstance } from "../../lib/axios";
import { useNavigate } from "react-router";



export default function useDeleteAddress() {
  const navigate = useNavigate();

  const deleteAddress = async (payload: number) => {
    try {
      await toast.promise(
        axiosInstance.patch("/address/delete", {id:payload}),
        {
          loading: "Creating...",
          success: "Address deleted",
          error: (err) =>
            err.response?.data?.message || "Failed to delete address",
        },
      );
      navigate(0);
    } catch {}
  };

  return deleteAddress;
}
