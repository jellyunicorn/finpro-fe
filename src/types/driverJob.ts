export interface DriverJob {
  id: string;
  type: "pickup" | "delivery";
  createdAt: string;
  status: string;
  orderId: string;
  distance: number;
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
