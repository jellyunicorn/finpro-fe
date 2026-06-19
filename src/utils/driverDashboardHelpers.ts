import type { DriverJob } from "../types/driverJob";

export const formatDateTime = (dateString: string) => {
  if (!dateString) return "N/A";
  const date = new Date(dateString);
  return `${date.toLocaleDateString()} ${date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  })}`;
};

export const getFromCoords = ({
  type,
  status,
  outletLongitude,
  outletLatitude,
  userLongitude,
  userLatitude,
}: DriverJob) => {
  if (type === "pickup") {
    if (status === "WAITING_FOR_DRIVER") {
      return { longitude: outletLongitude, latitude: outletLatitude };
    }
    if (status === "OTW_TO_OUTLET") {
      return { longitude: userLongitude, latitude: userLatitude };
    }
  }

  return { longitude: outletLongitude, latitude: outletLatitude };
};

export const getDestinationCoords = ({
  type,
  status,
  outletLongitude,
  outletLatitude,
  userLongitude,
  userLatitude,
}: DriverJob) => {
  if (type === "pickup") {
    if (status === "WAITING_FOR_DRIVER") {
      return { longitude: userLongitude, latitude: userLatitude };
    }
    if (status === "OTW_TO_OUTLET") {
      return { longitude: outletLongitude, latitude: outletLatitude };
    }
  }

  if (type === "delivery") {
    if (status === "WAITING_FOR_DRIVER") {
      return { longitude: outletLongitude, latitude: outletLatitude };
    }
    if (status === "OTW_TO_CUSTOMER") {
      return { longitude: userLongitude, latitude: userLatitude };
    }
  }

  return { longitude: userLongitude, latitude: userLatitude };
};

export const addressBuilder = (
  address?: string | null,
  regency?: string | null,
  district?: string | null,
  village?: string | null,
) => {
  if (!address) return "N/A";

  let result = address;

  if (regency && regency != undefined) result += ", " + regency;
  if (district && district != undefined) result += ", " + district;
  if (village && village != undefined) result += ", " + village;

  return result;
};
