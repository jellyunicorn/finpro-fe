import { useGoogleLogin } from "@react-oauth/google";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";
import { useLoginStore } from "../store/useAppStore";
import { goToDashboard } from "../utils/goToDashboard";

export default function useLoginGoogle() {
  const setUser = useLoginStore((state) => state.setUser);

  return useGoogleLogin({
    onSuccess: async ({ access_token }) => {
      try {
        const response = await axiosInstance.post("/auth/login/google", {
          accessToken: access_token,
        });

        setUser({
          id: response.data.user.id,
          fullName: response.data.user.fullName,
          email: response.data.user.email,
          avatar: response.data.user.avatar,
          role: response.data.user.role,
          verifiedAt: response.data.user.verifiedAt,
        });

        toast.success("Login successful!");
        await goToDashboard();
      } catch (error: any) {
        toast.error(error.response?.data?.message);
      }
    },
    onError: () => toast.error("Google login failed."),
  });
}
