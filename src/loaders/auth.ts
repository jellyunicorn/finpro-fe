import { redirect } from "react-router";
import { useLoginStore } from "../store/useAppStore.ts";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios.ts";
import axios from "axios";

export const authLoader = (allowedRoutes?: String[]) => {
  return async () => {
    const { user } = useLoginStore.getState();

    if (!user) {
      toast.error("Access denied, please Log in to enter");
      return redirect("/login");
    }

    if (!user.verifiedAt || user.verifiedAt === null) {
      toast.error("Please verify your email before continuing");
      return redirect("/login");
    }

    try {
      const { data } = await axiosInstance.get("/auth/me");
      if (allowedRoutes && !allowedRoutes.includes(data)) {
        if (data === "DRIVER")
        return redirect("/dashboard/driver");
       if (data === "WORKER")
        return redirect("/dashboard/worker");
       if (data === "ADMIN")
        return redirect("/dashboard/admin");
      toast.error("Unauthorized access")
       redirect("/")
      }

      return;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message);
      }
      useLoginStore.getState().setUser(null);
      localStorage.removeItem("auth-store");
      return redirect("/login");
    }
  };
};

export const isLoggedInLoader = () => {
  return async () => {
    const { user } = useLoginStore.getState();

    if (!user) {
      return redirect("/login");
    }
    return;
  };
};
