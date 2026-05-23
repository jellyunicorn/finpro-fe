import type { Outlet } from "../types/outlet.types";

// Mock outlets dengan koordinat Jakarta beneran
export const MOCK_OUTLET_FULL: Outlet[] = [
  {
    id: "outlet-1",
    name: "Outlet Kemang",
    fullAddress: "Jl. Kemang Raya No. 88, Bangka, Mampang Prapatan",
    city: "Jakarta Selatan",
    province: "DKI Jakarta",
    postalCode: "12730",
    latitude: -6.2615,
    longitude: 106.8131,
    serviceRadiusKm: 5,
    pricePerKg: 12000,
    deliveryFeePerKm: 2000,
    isActive: true,
    createdAt: new Date(Date.now() - 60 * 86400000).toISOString(),
    updatedAt: new Date(Date.now() - 10 * 86400000).toISOString(),
  },
  {
    id: "outlet-2",
    name: "Outlet Senopati",
    fullAddress: "Jl. Senopati No. 45, Senayan, Kebayoran Baru",
    city: "Jakarta Selatan",
    province: "DKI Jakarta",
    postalCode: "12190",
    latitude: -6.2336,
    longitude: 106.8094,
    serviceRadiusKm: 4,
    pricePerKg: 15000,
    deliveryFeePerKm: 2500,
    isActive: true,
    createdAt: new Date(Date.now() - 45 * 86400000).toISOString(),
    updatedAt: new Date(Date.now() - 5 * 86400000).toISOString(),
  },
  {
    id: "outlet-3",
    name: "Outlet Sudirman",
    fullAddress: "Jl. Jenderal Sudirman Kav. 52-53, Senayan",
    city: "Jakarta Selatan",
    province: "DKI Jakarta",
    postalCode: "12190",
    latitude: -6.2245,
    longitude: 106.8094,
    serviceRadiusKm: 6,
    pricePerKg: 14000,
    deliveryFeePerKm: 2000,
    isActive: true,
    createdAt: new Date(Date.now() - 30 * 86400000).toISOString(),
    updatedAt: new Date(Date.now() - 3 * 86400000).toISOString(),
  },
  {
    id: "outlet-4",
    name: "Outlet Cikini",
    fullAddress: "Jl. Cikini Raya No. 21, Menteng",
    city: "Jakarta Pusat",
    province: "DKI Jakarta",
    postalCode: "10330",
    latitude: -6.1882,
    longitude: 106.8413,
    serviceRadiusKm: 5,
    pricePerKg: 13000,
    deliveryFeePerKm: 2000,
    isActive: false,
    createdAt: new Date(Date.now() - 20 * 86400000).toISOString(),
    updatedAt: new Date(Date.now() - 1 * 86400000).toISOString(),
  },
];

export function getMockOutletById(id: string): Outlet | null {
  return MOCK_OUTLET_FULL.find((o) => o.id === id) ?? null;
}

// Default location buat new outlet form (center Jakarta)
export const DEFAULT_JAKARTA_COORDS = {
  latitude: -6.2088,
  longitude: 106.8456,
};
