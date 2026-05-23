import { http } from "../lib/axios";
import type { ApiPaginatedResponse, ApiResponse } from "../types/api.types";
import type {
  OrderDetail,
  OrderListItem,
  OrderListQuery,
  ProcessOrderPayload,
} from "../types/order.types";

export const orderApi = {
  // GET /api/orders - List with pagination/filter/sort SERVER-SIDE
  list: async (query: OrderListQuery = {}) => {
    const res = await http.get<ApiPaginatedResponse<OrderListItem>>("/orders", {
      params: query,
    });
    return res.data;
  },

  // GET /api/orders/:id - Detail
  getById: async (id: string) => {
    const res = await http.get<ApiResponse<OrderDetail>>(`/orders/${id}`);
    return res.data.data;
  },

  // POST /api/orders/:id/process - Outlet admin process order
  // (input total weight + quantity per item)
  process: async (id: string, payload: ProcessOrderPayload) => {
    const res = await http.post<ApiResponse<OrderDetail>>(
      `/orders/${id}/process`,
      payload
    );
    return res.data.data;
  },

  // POST /api/orders/:id/cancel
  cancel: async (id: string, reason?: string) => {
    const res = await http.post<ApiResponse<OrderDetail>>(
      `/orders/${id}/cancel`,
      { reason }
    );
    return res.data.data;
  },
};
