import { useCallback, useEffect, useState } from "react";
import Map, {
  Marker,
  NavigationControl,
  MapMouseEvent,
} from "react-map-gl/mapbox";
import "mapbox-gl/dist/mapbox-gl.css";
import { MapPin } from "lucide-react";

const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN as string;

type Props = {
  onChange: (lat: number, lng: number) => void;
  initialLat?: number | null;
  initialLng?: number | null;
};

export default function MapPickerMapbox({
  onChange,
  initialLat,
  initialLng,
}: Props) {
  const [marker, setMarker] = useState<{ lat: number; lng: number } | null>(
    null,
  );
  const [mapStyle, setMapStyle] = useState(
    "mapbox://styles/mapbox/satellite-streets-v12",
  );

  useEffect(() => {
    if (initialLat != null && initialLng != null) {
      setMarker({ lat: initialLat, lng: initialLng });
    }
  }, [initialLat, initialLng]);

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
        initialViewState={{
          longitude: marker?.lng ?? 19.8187,
          latitude: marker?.lat ?? 41.3275,
          zoom: 13,
        }}
        style={{ width: "100%", height: "100%" }}
        mapStyle={mapStyle}
        mapboxAccessToken={MAPBOX_TOKEN}
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

      <div className="absolute bottom-3 left-3 flex gap-1 bg-white/90 backdrop-blur-sm rounded-lg p-1 shadow-md z-10">
        <button
          type="button"
          onClick={() =>
            setMapStyle("mapbox://styles/mapbox/satellite-streets-v12")
          }
          className={`text-xs px-2.5 py-1 rounded-md font-medium transition-all ${
            mapStyle.includes("satellite")
              ? "bg-slate-900 text-white"
              : "text-slate-600 hover:bg-slate-100"
          }`}
        >
          Satellite
        </button>
        <button
          type="button"
          onClick={() => setMapStyle("mapbox://styles/mapbox/streets-v12")}
          className={`text-xs px-2.5 py-1 rounded-md font-medium transition-all ${
            !mapStyle.includes("satellite")
              ? "bg-slate-900 text-white"
              : "text-slate-600 hover:bg-slate-100"
          }`}
        >
          Street
        </button>
      </div>
    </div>
  );
}
