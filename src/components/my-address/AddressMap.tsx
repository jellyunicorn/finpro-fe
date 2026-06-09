import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { useEffect, useRef } from "react";
import type { addressform } from "../../lib/types";

type AddressMapProps = {
  longitude: string;
  latitude: string;
  addressForm: addressform | undefined;
  setAddressForm: React.Dispatch<React.SetStateAction<addressform | undefined>>;
};

export default function AddressMap({
  longitude,
  latitude,
  addressForm,
  setAddressForm,
}: AddressMapProps) {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);
  const markerRef = useRef<maplibregl.Marker | null>(null);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    const map = new maplibregl.Map({
      container: mapContainerRef.current,
      style: "https://tiles.openfreemap.org/styles/bright",
      center: [Number(longitude) || 106.826667, Number(latitude) || -6.175],
      zoom: 15,
    });

    mapRef.current = map;

    map.addControl(new maplibregl.NavigationControl(), "top-right");
    map.on("styleimagemissing", (e) => {
      if (map.hasImage(e.id)) return;
      map.addImage(e.id, { width: 1, height: 1, data: new Uint8Array(4) });
    });

    map.on("load", () => {
      const marker = new maplibregl.Marker({ draggable: true })
        .setLngLat([
          Number(longitude) || 106.826667,
          Number(latitude) || -6.175,
        ])
        .addTo(map);

      markerRef.current = marker;

      marker.on("dragend", () => {
        const coordinate = marker.getLngLat();
        setAddressForm((prev) =>
          prev
            ? {
                ...prev,
                longitude: String(coordinate.lng),
                latitude: String(coordinate.lat),
              }
            : prev,
        );
      });

      map.on("click", (e) => {
        marker.setLngLat([e.lngLat.lng, e.lngLat.lat]);
        setAddressForm((prev) =>
          prev
            ? {
                ...prev,
                longitude: String(e.lngLat.lng),
                latitude: String(e.lngLat.lat),
              }
            : prev,
        );
      });
    });

    return () => {
      map.remove();
      mapRef.current = null;
      markerRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!markerRef.current || !mapRef.current) return;
    const lng = Number(longitude) || 106.826667;
    const lat = Number(latitude) || -6.175;
    markerRef.current.setLngLat([lng, lat]);
    mapRef.current.easeTo({ center: [lng, lat], zoom: 15 });
  }, [longitude, latitude]);

  return (
    <div ref={mapContainerRef} style={{ width: "100%", height: "100%" }} />
  );
}
