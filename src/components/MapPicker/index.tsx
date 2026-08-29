import MapPickerMapbox from "./MapPickerMapbox";
import MapPickerMapTiler from "./MapPickerMapTiler";

type Props = {
  onChange: (lat: number, lng: number) => void;
  initialLat?: number | null;
  initialLng?: number | null;
};

// Switch provider via VITE_MAP_PROVIDER=mapbox|maptiler (defaults to maptiler)
const provider = import.meta.env.VITE_MAP_PROVIDER ?? "maptiler";

export default function MapPicker(props: Props) {
  if (provider === "mapbox") return <MapPickerMapbox {...props} />;
  return <MapPickerMapTiler {...props} />;
}
