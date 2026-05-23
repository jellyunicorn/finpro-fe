// Backend response format: { success, message, data }
export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface ApiPaginatedResponse<T> {
  success: boolean;
  message: string;
  data: T[];
  meta: {
    total: number;
    page: number;
    perPage: number;
    totalPages: number;
  };
}
