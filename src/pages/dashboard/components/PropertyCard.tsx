import { BedDouble, Bath, Maximize2, MapPin, User, Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { PropertyResponseDTO } from "../../../types/properties";

interface PropertyCardProps {
  property: PropertyResponseDTO;
  onClick?: () => void;
}

const propertyTypeColors: Record<string, string> = {
  apartment: "bg-blue-50 text-blue-700 border-blue-100",
  house: "bg-emerald-50 text-emerald-700 border-emerald-100",
  villa: "bg-amber-50 text-amber-700 border-amber-100",
  commercial: "bg-orange-50 text-orange-700 border-orange-100",
  land: "bg-lime-50 text-lime-700 border-lime-100",
  office: "bg-cyan-50 text-cyan-700 border-cyan-100",
  studio: "bg-rose-50 text-rose-700 border-rose-100",
};

export const statusColors: Record<string, string> = {
  used: "bg-slate-500",
  new: "bg-emerald-500",
  under_construction: "bg-yellow-500",
  in_project: "bg-blue-400",
  refurbished: "bg-green-500",
  for_refurbishment: "bg-orange-400",
};

// const placeholderImages = [
//   "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg",
//   "https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg",
//   "https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg",
// ];

export default function PropertyCard({ property, onClick }: PropertyCardProps) {
  const navigate = useNavigate();

  const typeClass =
    propertyTypeColors[property.propertyType ?? ""] ||
    "bg-slate-50 text-slate-700 border-slate-100";

  const statusColorClass =
    statusColors[property.status ?? ""] || "bg-slate-400";

  const price = property.price
    ? new Intl.NumberFormat("en-EU", {
        style: "currency",
        currency: "EUR",
        maximumFractionDigits: 0,
      }).format(property.price)
    : "Price on request";

  return (
    <article
      onClick={onClick}
      className="group bg-white rounded-2xl border border-slate-200 overflow-hidden cursor-pointer hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
    >
      {/* IMAGE */}
      <div className="relative h-52 overflow-hidden">
        <img
          src={`${import.meta.env.VITE_APP_BACKEND_API_URL}/${property.mainImage}`}
          alt={property.title ?? "Property"}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

        {/* BADGES */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-2">
          <span
            className={`text-[10px] uppercase tracking-wider font-bold px-2 py-1 rounded border ${typeClass}`}
          >
            {property.propertyType ?? "—"}
          </span>

          <span className="text-[10px] uppercase tracking-wider font-bold px-2 py-1 rounded bg-black/70 text-white">
            {property.businessType === "sale"
              ? "For Sale"
              : property.businessType === "rent"
                ? "For Rent"
                : "—"}
          </span>
        </div>

        {/* STATUS INDICATOR */}
        <div className="absolute top-3 right-3 flex items-center gap-1.5 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full shadow-sm">
          <div className={`w-2 h-2 rounded-full ${statusColorClass}`} />
          <span className="text-[10px] font-bold text-slate-700 capitalize">
            {property.status?.replace(/_/g, " ") ?? "—"}
          </span>
        </div>

        {/* PRICE */}
        <div className="absolute bottom-3 left-3 text-white font-bold text-lg">
          {price}
        </div>
      </div>

      {/* CONTENT */}
      <div className="p-4">
        {/* TITLE */}
        <h3 className="font-semibold text-slate-900 text-sm line-clamp-1 group-hover:text-blue-600 transition-colors">
          {property.title ?? "—"}
        </h3>

        {/* LOCATION */}
        <div className="flex items-center gap-1 text-xs text-slate-500 mt-1">
          <MapPin className="w-3.5 h-3.5 text-slate-400" />
          {property.cityName ?? "—"}
          {property.zoneName ? `, ${property.zoneName}` : ""}
        </div>

        {/* FEATURES */}
        <div className="flex gap-4 mt-4 py-3 border-y border-slate-50 text-xs text-slate-600">
          <span className="flex items-center gap-1.5">
            <BedDouble className="w-4 h-4 text-slate-400" />
            <span className="font-medium">{property.bedrooms ?? "—"}</span>
          </span>

          <span className="flex items-center gap-1.5">
            <Bath className="w-4 h-4 text-slate-400" />
            <span className="font-medium">{property.bathrooms ?? "—"}</span>
          </span>

          <span className="flex items-center gap-1.5">
            <Maximize2 className="w-4 h-4 text-slate-400" />
            <span className="font-medium">
              {property.interiorArea ? `${property.interiorArea}m²` : "—"}
            </span>
          </span>
        </div>

        {/* AGENT + CTA */}
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center">
              <User className="w-3 h-3 text-slate-400" />
            </div>
            <span className="truncate max-w-[100px]">
              {property.agent ?? "Unassigned"}
            </span>
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/property/${property.id}/details`);
            }}
            className="flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-700 bg-blue-50 px-3 py-1.5 rounded-lg transition-colors"
          >
            <Eye className="w-3.5 h-3.5" />
            Details
          </button>
        </div>
      </div>
    </article>
  );
}
