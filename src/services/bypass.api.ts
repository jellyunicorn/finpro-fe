import { http } from "../lib/axios";
import type { ApiPaginatedResponse, ApiResponse } from "../types/api.types";
import type {
  BypassListQuery,
  BypassRequestDetail,
  BypassRequestListItem,
  BypassReviewPayload,
} from "../types/bypass.types";

export const bypassApi = {
  // GET /api/bypass-requests - List with pagination/filter
  list: async (query: BypassListQuery = {}) => {
    const res = await http.get<ApiPaginatedResponse<BypassRequestListItem>>(
      "/bypass-requests",
      { params: query }
    );
    return res.data;
  },

  // GET /api/bypass-requests/:id - Detail
  getById: async (id: string) => {
    const res = await http.get<ApiResponse<BypassRequestDetail>>(
      `/bypass-requests/${id}`
    );
    return res.data.data;
  },

  // POST /api/bypass-requests/:id/review - Approve or Reject (with re-auth)
  review: async (id: string, payload: BypassReviewPayload) => {
    const res = await http.post<ApiResponse<BypassRequestDetail>>(
      `/bypass-requests/${id}/review`,
      payload
    );
    return res.data.data;
  },
};
