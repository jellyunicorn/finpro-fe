export interface Outlet {
  id: string;
  name: string;
  fullAddress: string;
  city: string;
  province: string;
  postalCode?: string;
  latitude: number;
  longitude: number;
  serviceRadiusKm: number;
  pricePerKg: number;
  deliveryFeePerKm: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface OutletListQuery {
  page?: number;
  perPage?: number;
  search?: string;
  isActive?: boolean;
}

// Payload untuk Create / Update
export interface OutletPayload {
  name: string;
  fullAddress: string;
  city: string;
  province: string;
  postalCode?: string;
  latitude: number;
  longitude: number;
  serviceRadiusKm: number;
  pricePerKg: number;
  deliveryFeePerKm: number;
  isActive: boolean;
}
