import { type OrderStatus } from "./statusLookup";

export type profilepersonalForm = {
  id: number;
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
  confirmedAt: string | null;
  deliveredAt: string | null;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  userId: number;
  outletId: number;
  addressId: number;
  outlet: {
    id: number;
    name: string;
    address: string;
    city: string;
    postalCode: string;
    latitude: string;
    longitude: string;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
  };
  address: {
    id: number;
    address: string;
    city: string;
    label: string;
    postalCode: string;
    latitude: string;
    longitude: string;
    isPrimary: boolean;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
    userId: number;
  };
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

export type outletdata = {
  id: number;
  name: string,
  address: string,
  city:string,
  postalCode: string,
  latitude: string,
  longitude:string,
};



export type closestoutletinfo = {
  outletid:number|null;
  outletname: string;
  distance: number;
};

export type pickupform = {
  pickupaddressid : number | null,
  outletid:number | null,
  pickupTime:string | null,
  pickupDate:string | null,
  distance:number | null,
};
