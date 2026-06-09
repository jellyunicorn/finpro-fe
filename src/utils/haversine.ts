// Great-circle distance between two lng/lat points, in kilometers.
export const haversineDistance = (
  lon1deg: number,
  lat1deg: number,
  lon2deg: number,
  lat2deg: number,
): number => {
  const toRad = (degree: number) => (degree * Math.PI) / 180;

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
  return R * c; // distance in km
};
