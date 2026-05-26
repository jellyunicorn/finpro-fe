import { create } from "zustand";
import { persist } from "zustand/middleware";
import { axiosInstance } from "../lib/axios";

type loginState = {
  user: {
    id: number;
    fullName: string;
    email: string;
    avatar: string;
    role: string;
    verifiedAt: string;
  } | null;
};

type AppActions = {
  setUser: (user: loginState["user"]) => void;
  updateUser: (partial: Partial<loginState["user"]>) => void;
};

export const useLoginStore = create<loginState & AppActions>()(
  persist(
    (set) => ({
      user: null,
      setUser: (userdata) => set({ user: userdata }),
      updateUser: (partial) =>
        set((state) => ({
          user: state.user ? { ...state.user, ...partial } : state.user,
        })),
    }),
    { name: "auth-store" },
  ),
);
