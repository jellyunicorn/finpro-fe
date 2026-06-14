import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { useEffect, useRef } from "react";

type AddressMapProps = {
  fromLongitude: string;
  fromLatitude: string;
  toLongitude: string;
  toLatitude: string;
};

export default function DriverActiveMap({
  fromLongitude,
  fromLatitude,
  toLongitude,
  toLatitude,
}: AddressMapProps) {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    const fromCoords: [number, number] = [
      Number(fromLongitude),
      Number(fromLatitude),
    ];
    const toCoords: [number, number] = [
      Number(toLongitude),
      Number(toLatitude),
    ];

    // Create the map
    const map = new maplibregl.Map({
      container: mapContainerRef.current,
      style: "https://tiles.openfreemap.org/styles/bright",
      center: fromCoords,
      zoom: 14,
    });

    // Add zoom controls
    map.addControl(new maplibregl.NavigationControl(), "top-right");

    // Add markers
    new maplibregl.Marker({ color: "blue" }).setLngLat(fromCoords).addTo(map);
    new maplibregl.Marker({ color: "red" }).setLngLat(toCoords).addTo(map);

    // Add line between the two points
    map.on("load", () => {
      map.addSource("route", {
        type: "geojson",
        data: {
          type: "Feature",
          properties: {},
          geometry: {
            type: "LineString",
            coordinates: [fromCoords, toCoords],
          },
        },
      });

      map.addLayer({
        id: "route",
        type: "line",
        source: "route",
        layout: {
          "line-join": "round",
          "line-cap": "round",
        },
        paint: {
          "line-color": "#3b82f6",
          "line-width": 3,
          "line-dasharray": [2, 4],
        },
      });

      // Fit bounds to show both markers and line
      const bounds = new maplibregl.LngLatBounds();
      bounds.extend(fromCoords).extend(toCoords);
      map.fitBounds(bounds, { padding: 50 });
    });

    mapRef.current = map;

    // Cleanup when component unmounts
    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, [fromLongitude, fromLatitude, toLongitude, toLatitude]);

  return <div ref={mapContainerRef} className="w-full h-full" />;
}
