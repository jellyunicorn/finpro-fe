import type { addressdata, outletdata } from "../lib/types";
import { haversineDistance } from "../utils/haversine";

export default function useFindClosest() {
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
