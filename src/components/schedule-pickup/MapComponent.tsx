import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import type { Feature, FeatureCollection } from "geojson";
import { useEffect, useRef } from "react";
import useFindClosest from "../../hooks/useFindClosest";
import type {
  addressdata,
  closestoutletinfo,
  outletdata,
} from "../../lib/types";

type initialcoordinateprops = {
  longitude: number;
  latitude: number;
};

export default function MapComponent({
  initialcoordinate,
  selectedAddress,
  outletdata,
  chosenoutlet,
  setOutlet,
}: {
  initialcoordinate: initialcoordinateprops;
  outletdata: outletdata[];
  chosenoutlet: closestoutletinfo;
  selectedAddress: addressdata;
  setOutlet: (outlet: closestoutletinfo) => void;
}) {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);
  const closestOutlet = useFindClosest();

  useEffect(() => {
    if (!mapContainerRef.current) return;

    const map = new maplibregl.Map({
      container: mapContainerRef.current,
      style: "https://tiles.openfreemap.org/styles/bright",
      center: [initialcoordinate.longitude, initialcoordinate.latitude],
      zoom: 15,
    });

    mapRef.current = map;

    map.addControl(new maplibregl.NavigationControl(), "top-right");
    map.setPadding({ left: 420, top: 0, right: 0, bottom: 0 });
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

    const newData: FeatureCollection = {
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
      map.once("idle", addInitial);
    }

    map.flyTo({
      center: [
        Number(selectedAddress.longitude),
        Number(selectedAddress.latitude),
      ],
      zoom: 15,
      duration: 2000,
      padding: {
        left: window.matchMedia("(min-width: 768px)").matches ? 420 : 0,
        top: 0,
        right: 0,
        bottom: 0,
      },
    });
  }, [selectedAddress]);

  // pick the closest outlet as the default whenever the address/outlets change
  useEffect(() => {
    if (!selectedAddress || !outletdata) return;

    const { closestoutletId, currDis } = closestOutlet(
      selectedAddress,
      outletdata,
    );
    const closestoutlet = outletdata.find(
      (outlet: outletdata) => outlet.id === closestoutletId,
    );
    if (!closestoutlet) return;

    setOutlet({
      outletid: closestoutlet.id,
      outletname: closestoutlet.name,
      lng: closestoutlet.longitude,
      lat: closestoutlet.latitude,
      distance: parseFloat(currDis.toFixed(2)),
    });
  }, [selectedAddress, outletdata]);

  // draw the route from the address to the currently chosen outlet
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !selectedAddress || !chosenoutlet?.lng || !chosenoutlet?.lat)
      return;

    const routeData: Feature = {
      type: "Feature",
      geometry: {
        type: "LineString",
        coordinates: [
          [Number(selectedAddress.longitude), Number(selectedAddress.latitude)],
          [Number(chosenoutlet.lng), Number(chosenoutlet.lat)],
        ],
      },
      properties: {},
    };

    const applyRoute = () => {
      const existing = map.getSource("route") as
        | maplibregl.GeoJSONSource
        | undefined;
      if (existing) {
        existing.setData(routeData);
      } else {
        map.addSource("route", { type: "geojson", data: routeData });
        map.addLayer({
          id: "route-line",
          type: "line",
          source: "route",
          layout: { "line-join": "round", "line-cap": "round" },
          paint: {
            "line-color": "#296FDA",
            "line-width": 3,
            "line-dasharray": [2, 2],
          },
        });
      }
    };

    if (map.isStyleLoaded()) {
      applyRoute();
    } else {
      map.once("idle", applyRoute);
    }
  }, [selectedAddress, chosenoutlet]);

  useEffect(() => {
    const map = mapRef.current;
    if (!map || !outletdata) return;

    const addData = () => {
      const geojson = {
        type: "FeatureCollection" as const,
        features: outletdata.map((outlet: outletdata) => ({
          type: "Feature" as const,
          properties: { name: outlet.name },
          geometry: {
            type: "Point" as const,
            coordinates: [Number(outlet.longitude), Number(outlet.latitude)],
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
