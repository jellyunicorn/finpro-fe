import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import { axiosInstance } from "../lib/axios";
import { useLoginStore } from "../store/useAppStore";

export default function useLogout() {
  const navigate = useNavigate();

  const setUser = useLoginStore((state) => state.setUser);

  const logout = async () => {
    try {
      toast.promise(axiosInstance.post("/auth/logout"), {
        loading: "Processing..",
        success: "Logout Success!",
        error: (err) => err.response?.data?.message || "Logout failed.",
      });
      setUser(null);
      navigate("/");
      localStorage.removeItem("auth-store");
    } catch {}
  };

  return logout;
}
