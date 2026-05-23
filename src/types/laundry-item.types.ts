export interface LaundryItem {
  id: string;
  name: string;
  description: string | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface LaundryItemListQuery {
  page?: number;
  perPage?: number;
  search?: string;
  isActive?: boolean;
}

export interface LaundryItemPayload {
  name: string;
  description?: string;
  isActive: boolean;
}
