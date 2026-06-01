import { useState } from "react";
import { useLoginStore } from "../store/useAppStore";
import { useNavigate, useSearchParams } from "react-router";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";

type LoginForm = {
  email: string;
  password: string;
};

export default function useLogin() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const from = searchParams.get("from") || "/";

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
      navigate(from);
    } catch {}
  };

  return { loginForm, setLoginForm, login };
}
