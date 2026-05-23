import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix Leaflet default marker icon (kalo gak diset, icon-nya broken pake Vite)
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

interface MapPickerProps {
  latitude: number;
  longitude: number;
  onChange: (lat: number, lng: number) => void;
  height?: string;
}

export default function MapPicker({
  latitude,
  longitude,
  onChange,
  height = "300px",
}: MapPickerProps) {
  return (
    <div
      style={{ height }}
      className="rounded-lg overflow-hidden border border-neutral-200"
    >
      <MapContainer
        center={[latitude, longitude]}
        zoom={13}
        style={{ height: "100%", width: "100%" }}
        scrollWheelZoom={true}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        />
        <DraggableMarker
          latitude={latitude}
          longitude={longitude}
          onChange={onChange}
        />
        <MapClickHandler onChange={onChange} />
        <RecenterOnPropsChange latitude={latitude} longitude={longitude} />
      </MapContainer>
    </div>
  );
}

// Marker yang bisa di-drag - update parent on dragend
function DraggableMarker({
  latitude,
  longitude,
  onChange,
}: {
  latitude: number;
  longitude: number;
  onChange: (lat: number, lng: number) => void;
}) {
  return (
    <Marker
      position={[latitude, longitude]}
      draggable
      eventHandlers={{
        dragend: (e) => {
          const marker = e.target as L.Marker;
          const { lat, lng } = marker.getLatLng();
          onChange(lat, lng);
        },
      }}
    />
  );
}

// Click anywhere on map → update marker position
function MapClickHandler({
  onChange,
}: {
  onChange: (lat: number, lng: number) => void;
}) {
  useMapEvents({
    click: (e) => {
      onChange(e.latlng.lat, e.latlng.lng);
    },
  });
  return null;
}

// Pas user edit input lat/long manual, map auto-recenter
function RecenterOnPropsChange({
  latitude,
  longitude,
}: {
  latitude: number;
  longitude: number;
}) {
  const map = useMap();
  useEffect(() => {
    map.setView([latitude, longitude], map.getZoom(), { animate: true });
  }, [latitude, longitude, map]);
  return null;
}
