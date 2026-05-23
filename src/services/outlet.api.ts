import { http } from "../lib/axios";
import type { ApiPaginatedResponse, ApiResponse } from "../types/api.types";
import type {
  Outlet,
  OutletListQuery,
  OutletPayload,
} from "../types/outlet.types";

export const outletApi = {
  list: async (query: OutletListQuery = {}) => {
    const res = await http.get<ApiPaginatedResponse<Outlet>>("/outlets", {
      params: query,
    });
    return res.data;
  },

  listAll: async () => {
    const res = await http.get<ApiPaginatedResponse<Outlet>>("/outlets", {
      params: { perPage: 999, isActive: true },
    });
    return res.data.data;
  },

  getById: async (id: string) => {
    const res = await http.get<ApiResponse<Outlet>>(`/outlets/${id}`);
    return res.data.data;
  },

  create: async (payload: OutletPayload) => {
    const res = await http.post<ApiResponse<Outlet>>("/outlets", payload);
    return res.data.data;
  },

  update: async (id: string, payload: OutletPayload) => {
    const res = await http.put<ApiResponse<Outlet>>(`/outlets/${id}`, payload);
    return res.data.data;
  },

  delete: async (id: string) => {
    const res = await http.delete<ApiResponse<null>>(`/outlets/${id}`);
    return res.data;
  },
};
