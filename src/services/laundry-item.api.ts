import { http } from "../lib/axios";
import type { ApiPaginatedResponse, ApiResponse } from "../types/api.types";
import type {
  LaundryItem,
  LaundryItemListQuery,
  LaundryItemPayload,
} from "../types/laundry-item.types";

export const laundryItemApi = {
  list: async (query: LaundryItemListQuery = {}) => {
    const res = await http.get<ApiPaginatedResponse<LaundryItem>>(
      "/laundry-items",
      { params: query }
    );
    return res.data;
  },

  listAll: async () => {
    const res = await http.get<ApiPaginatedResponse<LaundryItem>>(
      "/laundry-items",
      { params: { perPage: 999, isActive: true } }
    );
    return res.data.data;
  },

  getById: async (id: string) => {
    const res = await http.get<ApiResponse<LaundryItem>>(`/laundry-items/${id}`);
    return res.data.data;
  },

  create: async (payload: LaundryItemPayload) => {
    const res = await http.post<ApiResponse<LaundryItem>>(
      "/laundry-items",
      payload
    );
    return res.data.data;
  },

  update: async (id: string, payload: LaundryItemPayload) => {
    const res = await http.put<ApiResponse<LaundryItem>>(
      `/laundry-items/${id}`,
      payload
    );
    return res.data.data;
  },

  delete: async (id: string) => {
    const res = await http.delete<ApiResponse<null>>(`/laundry-items/${id}`);
    return res.data;
  },
};
