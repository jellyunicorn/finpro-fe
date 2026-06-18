import { useState } from "react";
import toast from "react-hot-toast";
import { axiosInstance } from "../../lib/axios";
import { useLoginStore } from "../../store/useAppStore";
import { goToDashboard } from "../../utils/goToDashboard";

type LoginForm = {
  email: string;
  password: string;
};

export default function useLogin() {
  const [loginForm, setLoginForm] = useState<LoginForm>({
    email: "",
    password: "",
  });

  const setUser = useLoginStore((state) => state.setUser);

  const login = async () => {
    try {
      const res = await toast.promise(
        axiosInstance.post("/auth/login", loginForm),
        {
          loading: "Processing..",
          success: "Login Success!",
          error: (err) => err.response?.data?.message || "Login failed.",
        },
      );
      setUser(res.data.user);
      await goToDashboard();
    } catch {}
  };

  return { loginForm, setLoginForm, login };
}
