import type { addressdata, outletdata } from "../lib/types";

export default function useFindClosest() {
  const haversineDistance = (
    lon1deg: number,
    lat1deg: number,
    lon2deg: number,
    lat2deg: number,
  ): number => {
    function toRad(degree: number) {
      return (degree * Math.PI) / 180;
    }

    const lat1 = toRad(lat1deg);
    const lon1 = toRad(lon1deg);
    const lat2 = toRad(lat2deg);
    const lon2 = toRad(lon2deg);

    const { sin, cos, sqrt, atan2 } = Math;

    const R = 6371; // earth radius in km
    const dLat = lat2 - lat1;
    const dLon = lon2 - lon1;
    const a =
      sin(dLat / 2) * sin(dLat / 2) +
      cos(lat1) * cos(lat2) * sin(dLon / 2) * sin(dLon / 2);
    const c = 2 * atan2(sqrt(a), sqrt(1 - a));
    const d = R * c;
    return d; // distance in km
  };

  const closestOutlet = (
    chosenaddress: addressdata,
    outletsdata: outletdata[],
  ): { closestoutletId: number; currDis: number } => {
    let currDis = 0;
    let closestoutletId: number = 0;
    outletsdata.forEach((outlet: outletdata) => {
      const lon1deg = Number(chosenaddress.longitude);
      const lat1deg = Number(chosenaddress.latitude);
      const lon2deg = Number(outlet.longitude);
      const lat2deg = Number(outlet.latitude);
      const distance = haversineDistance(lon1deg, lat1deg, lon2deg, lat2deg);
      if (currDis === 0 || currDis > distance) {
        currDis = distance;
        closestoutletId = outlet.id;
      }
    });

    return { closestoutletId, currDis };
  };

  return  closestOutlet ;
}
