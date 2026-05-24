import { redirect } from "react-router";
import { useLoginStore } from "../store/useAppStore.ts";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios.ts";

export const authLoader = (allowedRoutes?: String[]) => {
  return async () => {
    const { user } = useLoginStore.getState();

    if (!user) {
      toast.error("Access denied, please Log in to enter")
      return redirect("/login");
    }

    if (!user.verifiedAt || user.verifiedAt === null) {
      toast.error("Please verify your email before continuing")
      return redirect("/login");
    }

    const { data } = await axiosInstance.get("/auth/me");

    if (allowedRoutes && !allowedRoutes.includes(data)) {
       toast.error("Unauthorized access")
      return redirect("/");
    }

    return;
  };
};

