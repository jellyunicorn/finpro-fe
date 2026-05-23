import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Role =
  | "CUSTOMER"
  | "SUPER_ADMIN"
  | "OUTLET_ADMIN"
  | "WORKER"
  | "DRIVER";

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  role: Role;
  outletId: string | null;
  isVerified: boolean;
  profilePhoto?: string;
}

interface AuthState {
  user: AuthUser | null;
  accessToken: string | null;
  setAuth: (token: string, user: AuthUser) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      accessToken: null,
      setAuth: (token, user) => set({ accessToken: token, user }),
      logout: () => set({ accessToken: null, user: null }),
    }),
    {
      name: "claundry-auth",
    }
  )
);

// Selectors (biar gak re-render gak perlu)
export const useUser = () => useAuthStore((s) => s.user);
export const useIsAuthenticated = () =>
  useAuthStore((s) => !!s.accessToken && !!s.user);
export const useIsSuperAdmin = () =>
  useAuthStore((s) => s.user?.role === "SUPER_ADMIN");
export const useIsOutletAdmin = () =>
  useAuthStore((s) => s.user?.role === "OUTLET_ADMIN");
