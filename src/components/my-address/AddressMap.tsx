import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { useEffect, useRef } from "react";
import type {
  addressdata,
  closestoutletinfo,
  outletdata,
} from "../../lib/types";

type initialcoordinateprops = {
  longitude: number;
  latitude: number;
};

export default function AddressMap() {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    const map = new maplibregl.Map({
      container: mapContainerRef.current,
      style: "https://tiles.openfreemap.org/styles/bright",
      center: [106.826667,-6.175 ],
      zoom: 15,
    });

    mapRef.current = map;

    map.addControl(new maplibregl.NavigationControl(), "top-right");
    map.on("styleimagemissing", (e) => {
      if (map.hasImage(e.id)) return;
      map.addImage(e.id, { width: 1, height: 1, data: new Uint8Array(4) });
    });
    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, []);
  return (
    <div ref={mapContainerRef} style={{ width: "100%", height: "100%" }} />
  );
}
