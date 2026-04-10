import { BedDouble, Bath, Maximize2, MapPin, User, Eye } from "lucide-react";
import { useAuth } from "../../../contexts/AuthContext";
import { Property } from "../../../types/database";
import { Button } from "../../../components/ui/button";
import { useNavigate } from "react-router-dom";

interface PropertyCardProps {
  property: Property;
  onClick: () => void;
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

const statusColors: Record<string, string> = {
  used: "bg-slate-500",
  new: "bg-emerald-500",
  under_construction: "bg-yellow-500",
  in_project: "bg-blue-400",
  refurbished: "bg-green-500",
  for_refurbishment: "bg-orange-400",
};

const countryFlag: Record<string, string> = {
  albania: "🇦🇱",
  greece: "🇬🇷",
};

const placeholderImages = [
  "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg",
  "https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg",
  "https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg",
];

function getPlaceholder(id: number) {
  return placeholderImages[id % placeholderImages.length];
}

export default function PropertyCard({ property, onClick }: PropertyCardProps) {
  const { profile } = useAuth();
  const navigate = useNavigate();

  const imageUrl = property.images?.[0] || getPlaceholder(property.id);

  const typeClass =
    propertyTypeColors[property.propertyType] ||
    "bg-slate-50 text-slate-700 border-slate-100";

  const price = property.price
    ? new Intl.NumberFormat("en-EU", {
        style: "currency",
        currency: property.currency || "EUR",
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
          src={imageUrl}
          alt={property.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

        {/* BADGES */}
        <div className="absolute top-3 left-3 flex gap-2">
          <span className={`text-xs px-2 py-1 rounded ${typeClass}`}>
            {property.propertyType}
          </span>

          <span className="text-xs px-2 py-1 rounded bg-black/70 text-white">
            {property.businessType === "sale" ? "Sale" : "Rent"}
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
        <h3 className="font-semibold text-slate-900 text-sm line-clamp-1">
          {property.title}
        </h3>

        {/* LOCATION */}
        <div className="flex items-center gap-1 text-xs text-slate-500 mt-1">
          <MapPin className="w-3 h-3" />
          {property.city}, {property.zone}
        </div>

        {/* FEATURES */}
        <div className="flex gap-4 mt-3 text-xs text-slate-600">
          {property.bedrooms != null && (
            <span className="flex items-center gap-1">
              <BedDouble className="w-3 h-3" />
              {property.bedrooms}
            </span>
          )}

          {property.bathrooms != null && (
            <span className="flex items-center gap-1">
              <Bath className="w-3 h-3" />
              {property.bathrooms}
            </span>
          )}

          {property.interiorArea && (
            <span className="flex items-center gap-1">
              <Maximize2 className="w-3 h-3" />
              {property.interiorArea}m²
            </span>
          )}
        </div>

        {/* AGENT + CTA */}
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center gap-1 text-xs text-slate-500">
            <User className="w-3 h-3" />
            {property.lastModifiedBy}
          </div>

          <Button
            onClick={(e) => {
              e.stopPropagation();
              onClick();
              console.log(property.id);
              navigate(`/property/${property.id}/details`);
            }}
            className="flex items-center gap-1 text-xs font-medium text-blue-600 hover:text-blue-700"
          >
            <Eye className="w-3 h-3" />
            Details
          </Button>
        </div>
      </div>
    </article>
  );
}
