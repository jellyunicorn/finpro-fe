import { http } from "../lib/axios";
import type { ApiPaginatedResponse, ApiResponse } from "../types/api.types";
import type {
  AppUser,
  CreateUserResponse,
  UserListQuery,
  UserPayload,
} from "../types/user.types";

export const userApi = {
  list: async (query: UserListQuery = {}) => {
    const res = await http.get<ApiPaginatedResponse<AppUser>>("/users", {
      params: query,
    });
    return res.data;
  },

  getById: async (id: string) => {
    const res = await http.get<ApiResponse<AppUser>>(`/users/${id}`);
    return res.data.data;
  },

  // Create returns temp password (sekali tampil!)
  create: async (payload: UserPayload) => {
    const res = await http.post<ApiResponse<CreateUserResponse>>(
      "/users",
      payload
    );
    return res.data.data;
  },

  update: async (id: string, payload: UserPayload) => {
    const res = await http.put<ApiResponse<AppUser>>(`/users/${id}`, payload);
    return res.data.data;
  },

  delete: async (id: string) => {
    const res = await http.delete<ApiResponse<null>>(`/users/${id}`);
    return res.data;
  },

  // Resend verification email
  resendVerification: async (id: string) => {
    const res = await http.post<ApiResponse<null>>(
      `/users/${id}/resend-verification`
    );
    return res.data;
  },
};
