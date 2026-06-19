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
    regency : {
      name: string;
    }
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
  regency: { code: string; name: string; provinceCode: string };
  district: { code: string; name: string; regencyCode: string };
  village: { code: string; name: string; districtCode: string };
  userId: number;
};


export type outletdata = {
  id: number;
  name: string;
  address: string;
  city: string;
  postalCode: string;
  latitude: string;
  longitude: string;
};

export type closestoutletinfo = {
  outletid: number | null;
  outletname: string;
  lng:string;
  lat:string;
  distance: number;
};

export type pickupform = {
  pickupAddressId: number | null;
  outletId: number | null;
  pickupTime: string | null;
  pickupDate: string | null;
  distance: number | null;
};

export type orderitems = {
  id: number;
  name: string;
  orderId: number;
  price: number;
  quantity: number;
  weight: number;
  description:string;
}

export type addressform = {
  address: string;
  id?:number;
  city: string;
  isPrimary: boolean;
  label: string;
  latitude: string;
  longitude: string;
  postalCode: string;
  regencyCode: string,
  districtCode: string,
  villageCode: string,
};

export type regencyquery = {
  code: string;
  name: string;
  provinceCode: string;
};
export type districtquery = {
  code: string;
  name: string;
  regencyCode: string;
};
export type villagequery = {
  code: string;
  name: string;
  districtCode: string;
};

export type notification = {
  userId: number;
  notificationId: number;
  readAt: string | null;
  createdAt: string;
  deletedAt: string | null;
  notification: {
    title: string;
    body: string;
  };
};