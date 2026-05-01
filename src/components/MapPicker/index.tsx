import {
  MapContainer,
  TileLayer,
  Marker,
  useMapEvents,
  useMap,
} from "react-leaflet";
import { useEffect, useState } from "react";
import L from "leaflet";

// Fix default marker icon issue
// eslint-disable-next-line @typescript-eslint/no-explicit-any
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

type Props = {
  onChange: (lat: number, lng: number) => void;
  initialLat?: number | null;
  initialLng?: number | null;
};

type MarkerProps = {
  position: [number, number] | null;
  setPosition: (pos: [number, number]) => void;
  onChange: (lat: number, lng: number) => void;
};

function LocationMarker({ position, setPosition, onChange }: MarkerProps) {
  useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng;
      setPosition([lat, lng]);
      onChange(lat, lng);
    },
  });

  return position ? <Marker position={position} /> : null;
}

function FixMapSize() {
  const map = useMap();

  useEffect(() => {
    const fix = () => map.invalidateSize();

    setTimeout(fix, 0);
    setTimeout(fix, 200);
    setTimeout(fix, 500);
    setTimeout(fix, 800); // ✅ add this — catches slow modal animations

    window.addEventListener("resize", fix);
    return () => window.removeEventListener("resize", fix);
  }, [map]);

  return null;
}
export default function MapPicker({ onChange, initialLat, initialLng }: Props) {
  const [position, setPosition] = useState<[number, number] | null>(null);

  // ✅ sync with form (edit mode)
  useEffect(() => {
    if (initialLat != null && initialLng != null) {
      setPosition([initialLat, initialLng]);
    }
  }, [initialLat, initialLng]);

  return (
    <MapContainer
      center={position ?? [41.3275, 19.8187]} // default Tirana
      zoom={13}
      scrollWheelZoom={false}
      dragging={true}
      touchZoom={false}
      className="h-[350px] w-full rounded-xl border border-slate-200"
      style={{ zIndex: 0 }}
    >
      <TileLayer
        attribution="&copy; OpenStreetMap"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <FixMapSize />

      <LocationMarker
        position={position}
        setPosition={setPosition}
        onChange={onChange}
      />
    </MapContainer>
  );
}
