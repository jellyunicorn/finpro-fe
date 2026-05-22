import { create } from "zustand";
import { persist } from "zustand/middleware";
import { axiosInstance } from "../lib/axios";

type loginState = {
  user: {
    id: number;
    fullName:string;
    email:string;
    avatar:string;
    role: string;
    verifiedAt:string;
  } | null;
};

type AppActions = {
  setUser: (user: loginState["user"]) => void;
  logout: () => void;
};

export const useLoginStore = create<loginState & AppActions>()(
  persist(
    (set) => ({
      user: null,
      setUser: (userdata) => set({ user : userdata  }),
      logout: async () => {
        await axiosInstance.post("/auth/logout");
        set({ user: null });
        window.location.href = "/";
      },
    }),
    { name: "auth-store" },
  ),
);
