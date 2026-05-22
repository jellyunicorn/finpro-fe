import { useGoogleLogin } from "@react-oauth/google";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import { useLoginStore } from "../store/useAppStore";
import { axiosInstance } from "../lib/axios";

export default function useRegisterGoogle() {
  const navigate = useNavigate();

  return useGoogleLogin({
    onSuccess: async ({ access_token }) => {
      try {
        const response = await axiosInstance.post("/auth/register/google", {
          accessToken: access_token,
        });
        toast.success("Register by Google successful, you may login now");
        navigate("/login");
      } catch (error: any) {
        toast.error(error.response?.data?.message);
      }
    },
    onError: () => toast.error("Google login failed."),
  });
}
