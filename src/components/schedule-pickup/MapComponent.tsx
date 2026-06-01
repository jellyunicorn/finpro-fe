import { useEffect, useRef } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../lib/axios";
import type { addressdata } from "../../lib/types";

type initialcoordinateprops = {
  longitude: number;
  latitude: number;
};

export default function MapComponent({
  initialcoordinate,
  selectedAddress,
}: {
  initialcoordinate: initialcoordinateprops;
  selectedAddress: addressdata;
}) {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);
  const { data: outletdata } = useQuery({
    queryKey: ["outlets"],
    queryFn: async () => {
      const result = await axiosInstance.get("/address/outlets");
      console.log(result.data);
      return result.data.outlets;
    },
  });

  useEffect(() => {
    if (!mapContainerRef.current) return;

    const map = new maplibregl.Map({
      container: mapContainerRef.current,
      style: "https://tiles.openfreemap.org/styles/bright",
      center: [initialcoordinate.longitude, initialcoordinate.latitude],
      zoom: 15,
    });
    map.addControl(new maplibregl.NavigationControl(), "top-right");
    mapRef.current = map;
    map.on("styleimagemissing", (e) => {
      if (map.hasImage(e.id)) return;
      map.addImage(e.id, { width: 1, height: 1, data: new Uint8Array(4) });
    });
    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, []);

  useEffect(() => {
    const map = mapRef.current;
    if (!map || !selectedAddress) return;

    const newData: GeoJSON.FeatureCollection = {
      type: "FeatureCollection",
      features: [
        {
          type: "Feature",
          properties: { name: "Your Location" },
          geometry: {
            type: "Point",
            coordinates: [
              Number(selectedAddress.longitude),
              Number(selectedAddress.latitude),
            ],
          },
        },
      ],
    };

    const addInitial = () => {
      const existing = map.getSource("initial") as
        | maplibregl.GeoJSONSource
        | undefined;
      if (existing) {
        existing.setData(newData);
        return;
      }

      map.addSource("initial", { type: "geojson", data: newData });
      map.addLayer({
        id: "initial-marker",
        type: "circle",
        source: "initial",
        paint: {
          "circle-radius": 12,
          "circle-stroke-color": "#FFFFFF",
          "circle-stroke-width": 2,
          "circle-color": "#F05E5E",
        },
      });
      map.addLayer({
        id: "initial-labels",
        type: "symbol",
        source: "initial",
        layout: {
          "text-field": ["get", "name"],
          "text-font": ["Noto Sans Regular"],
          "text-offset": [0, 1.1],
          "text-anchor": "top",
          "text-size": 13,
        },
        paint: {
          "text-color": "#1a1a1a",
          "text-halo-color": "#ffffff",
          "text-halo-width": 5,
        },
      });

    };

    if (map.isStyleLoaded()) {
      addInitial();
    } else {
      map.once("load", addInitial);
    }

    map.flyTo({
      center: [
        Number(selectedAddress.longitude),
        Number(selectedAddress.latitude),
      ],
      zoom: 15,
      duration: 2000,
    });
  }, [selectedAddress]);

  useEffect(() => {
    const map = mapRef.current;
    if (!map || !outletdata) return;

    const addData = () => {
      const geojson = {
        type: "FeatureCollection" as const,
        features: outletdata.map((outlet: any) => ({
          type: "Feature" as const,
          properties: { name: outlet.name },
          geometry: {
            type: "Point" as const,
            coordinates: [outlet.longitude, outlet.latitude],
          },
        })),
      };

      const existing = map.getSource("outlet") as
        | maplibregl.GeoJSONSource
        | undefined;
      if (existing) {
        existing.setData(geojson);
        return;
      }

      map.addSource("outlet", { type: "geojson", data: geojson });

      map.addLayer({
        id: "outlet-marker",
        type: "circle",
        source: "outlet",
        paint: {
          "circle-radius": 12,
          "circle-stroke-color": "#FFFFFF",
          "circle-stroke-width": 2,
          "circle-color": "#296FDA",
        },
      });

      map.addLayer({
        id: "outlet-labels",
        type: "symbol",
        source: "outlet",
        layout: {
          "text-field": ["get", "name"],
          "text-font": ["Noto Sans Regular"],
          "text-offset": [0, 1.1],
          "text-anchor": "top",
          "text-size": 13,
        },
        paint: {
          "text-color": "#1a1a1a",
          "text-halo-color": "#ffffff",
          "text-halo-width": 5,
        },
      });
    };

    if (map.isStyleLoaded()) {
      addData();
    } else {
      map.once("load", addData);
    }
  }, [outletdata]);

  return (
    <div ref={mapContainerRef} style={{ width: "100%", height: "100%" }} />
  );
}
