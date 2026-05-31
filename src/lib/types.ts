import { type OrderStatus } from '../utils/statusLookup'


export type profilepersonalForm = {
    id:number,
  fullName: string;
  avatar: string;
  phone: string | null;
  birthDate: string | null;
};

export type profiledata = {
  id: number;
  email: string;
  fullName: string;
  phone: string | null;
  role: "USER" | "ADMIN";
  avatar: string;
  verifiedAt: string;
  provider: "CREDENTIALS" | "GOOGLE";
  birthDate: string | null;
};

export type userdata = {
  id: number;
  email: string;
  fullName: string;
  phone: string;
  role: string;
  avatar: string;
  verifiedAt: string;
  provider: string;
  birthDate: string;
};

export type orderdata = {
  id: number;
  orderId: string;
  scheduledTime: string;
  pickupTime: string;
  orderStatus: OrderStatus;
  deliveryCost: number;
  paymentStatus: string;
  paymentMethod: string;
  paymentTime: string;
  distance: string;
  confirmedAt: string;
  deliveredAt: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  userId: number;
  outletId: number;
};

export type addressdata = {
  address: string;
  city: string;
  id: number;
  isPrimary: boolean;
  label: string;
  latitude: string;
  longitude: string;
  postalCode: string;
  userId: number;
};