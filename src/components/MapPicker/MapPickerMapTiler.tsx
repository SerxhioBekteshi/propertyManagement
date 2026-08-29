import { useCallback, useEffect, useState } from "react";
import Map, {
  Marker,
  NavigationControl,
  MapMouseEvent,
} from "react-map-gl/maplibre";
import "maplibre-gl/dist/maplibre-gl.css";
import { MapPin } from "lucide-react";

const MAPTILER_KEY = import.meta.env.VITE_MAPTILER_KEY as string;

type Props = {
  onChange: (lat: number, lng: number) => void;
  initialLat?: number | null;
  initialLng?: number | null;
};

export default function MapPickerMapTiler({
  onChange,
  initialLat,
  initialLng,
}: Props) {
  const [marker, setMarker] = useState<{ lat: number; lng: number } | null>(
    null,
  );
  useEffect(() => {
    if (initialLat != null && initialLng != null) {
      setMarker({ lat: initialLat, lng: initialLng });
    }
  }, [initialLat, initialLng]);

  const mapStyle = `https://api.maptiler.com/maps/hybrid-v4/style.json?key=${MAPTILER_KEY}`;

  // Unique key forces MapLibre to remount fresh each time this component mounts
  const [mapKey] = useState(() => Date.now());

  const handleClick = useCallback(
    (e: MapMouseEvent) => {
      const { lat, lng } = e.lngLat;
      setMarker({ lat, lng });
      onChange(lat, lng);
    },
    [onChange],
  );

  return (
    <div className="relative h-[350px] w-full rounded-xl overflow-hidden border border-slate-200">
      <Map
        key={mapKey}
        initialViewState={{
          longitude: marker?.lng ?? 19.8187,
          latitude: marker?.lat ?? 41.3275,
          zoom: 13,
        }}
        style={{ width: "100%", height: "100%" }}
        mapStyle={mapStyle}
        onClick={handleClick}
        cursor="crosshair"
      >
        <NavigationControl position="top-right" />
        {marker && (
          <Marker latitude={marker.lat} longitude={marker.lng} anchor="bottom">
            <MapPin
              className="w-8 h-8 text-red-500 drop-shadow-lg"
              fill="red"
            />
          </Marker>
        )}
      </Map>
    </div>
  );
}
