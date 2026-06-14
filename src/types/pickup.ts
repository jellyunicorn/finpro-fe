export interface Pickup {
  id: string;
  createdAt: string;
  status: string;
  orderId: string;
  customerName: string;
  address: string | null;
  outletLongitude: string;
  outletLatitude: string;
  userLongitude: string;
  userLatitude: string;
  postalCode: string | null;
  regency: string | null;
  district: string | null;
  village: string | null;
}