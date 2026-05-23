import { http } from "../lib/axios";
import type { ApiResponse } from "../types/api.types";
import type { AuthUser } from "../store/auth.store";

interface LoginPayload {
  email: string;
  password: string;
}

interface LoginResponse {
  accessToken: string;
  user: AuthUser;
}

export const authApi = {
  login: async (payload: LoginPayload) => {
    const res = await http.post<ApiResponse<LoginResponse>>("/auth/login", payload);
    return res.data.data;
  },

  // Dev login workaround (sementara Teru belum bikin /auth/login)
  devLogin: async (email: string) => {
    const res = await http.post<ApiResponse<LoginResponse>>("/dev-auth/login", { email });
    return res.data.data;
  },

  getCurrentUser: async () => {
    const res = await http.get<ApiResponse<AuthUser>>("/auth/me");
    return res.data.data;
  },
};
