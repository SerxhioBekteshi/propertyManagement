import { useState } from "react";
import {
  BedDouble,
  Bath,
  Maximize2,
  MapPin,
  User,
  Eye,
  Sparkles,
  Pencil,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { PropertyResponseDTO } from "../../../types/properties";
import { useAuth } from "../../../contexts/AuthContext";
import { EFormMode, ERoles } from "../../../assets/enums";
import {
  AVAILABILITY_STYLES,
  BUSINESS_TYPE_COLORS,
  BUSINESS_TYPE_LABELS,
  STATUS_COLORS,
  TYPE_COLORS,
} from "../../../utils/styles";
import { PropertiesService } from "../../../lib/Properties";
import ModalProperty from "./PropertyModal";

interface PropertyCardProps {
  property: PropertyResponseDTO;
  onClick?: () => void;
  onSaved?: () => void; // called after a successful edit, so the parent can refetch the list
  index?: number;
}

export default function PropertyCard({
  property,
  onClick,
  onSaved,
}: PropertyCardProps) {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [editModel, setEditModel] = useState<PropertyResponseDTO | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [isFetchingEdit, setIsFetchingEdit] = useState(false);

  const typeClass =
    TYPE_COLORS[property.propertyType ?? ""] ||
    "bg-slate-50 text-slate-700 border-slate-100";

  const statusColorClass =
    STATUS_COLORS[property.status ?? ""] || "bg-slate-400";

  const availabilityClass =
    AVAILABILITY_STYLES[property.availability ?? ""] ||
    "bg-slate-100 text-slate-700 border-slate-200";

  const price = property.price
    ? new Intl.NumberFormat("en-EU", {
        style: "currency",
        currency: "EUR",
        maximumFractionDigits: 0,
      }).format(property.price)
    : "Price on request";

  const imageUrl = import.meta.env.VITE_APP_BACKEND_API_URL?.includes(
    "localhost",
  )
    ? "https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg"
    : property.mainImage
      ? `${import.meta.env.VITE_APP_BACKEND_API_URL}/${property.mainImage}`
      : "https://placehold.co/800x600/e2e8f0/94a3b8?text=No+Image+Available";

  const isAdmin = user?.role !== ERoles.Agent.toString();

  const handleEditClick = async (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsFetchingEdit(true);
    try {
      const res = await PropertiesService.getPropertyById(property.id, false);
      if (res.data) {
        setEditModel(res.data);
        setModalOpen(true);
      }
    } finally {
      setIsFetchingEdit(false);
    }
  };

  return (
    <>
      <article
        onClick={onClick}
        className={`group bg-white rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 flex flex-col ${
          property.opportunityCount
            ? "border-2 border-emerald-400 shadow-md shadow-emerald-100"
            : "border border-slate-200"
        }`}
      >
        {/* IMAGE */}
        <div className="relative h-52 overflow-hidden">
          <img
            src={imageUrl}
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

            <span
              className={`text-[10px] uppercase tracking-wider font-bold px-2 py-1 rounded-full border ${
                BUSINESS_TYPE_COLORS[property.businessType ?? ""] ??
                "bg-slate-50 text-slate-700 border-slate-200"
              }`}
            >
              {BUSINESS_TYPE_LABELS[property.businessType ?? ""] ?? "—"}
            </span>
          </div>

          {/* STATUS INDICATOR */}
          <div className="absolute top-3 right-12 flex items-center gap-1.5 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full shadow-sm">
            <div className={`w-2 h-2 rounded-full ${statusColorClass}`} />
            <span className="text-[10px] font-bold text-slate-700 capitalize">
              {property.status?.replace(/_/g, " ") ?? "—"}
            </span>
          </div>

          {/* EDIT BUTTON */}
          {user?.role == ERoles.Admin && (
            <button
              type="button"
              onClick={handleEditClick}
              disabled={isFetchingEdit}
              className="absolute top-3 right-3 flex items-center justify-center w-7 h-7 rounded-full bg-white/90 backdrop-blur-sm shadow-sm hover:bg-white transition-colors disabled:opacity-50"
              aria-label="Edit property"
            >
              <Pencil className="w-3.5 h-3.5 text-slate-700" />
            </button>
          )}

          {/* PRICE */}
          <div className="absolute bottom-3 left-3 text-white font-bold text-lg">
            {price}
          </div>
        </div>

        {/* CONTENT */}
        <div className="p-4 flex flex-col flex-1">
          <h3 className="font-semibold text-slate-900 text-sm line-clamp-1 group-hover:text-blue-600 transition-colors">
            {property.title ?? "—"}
          </h3>

          <div className="flex items-center gap-1 text-xs text-slate-500 mt-1">
            <MapPin className="w-3.5 h-3.5 text-slate-400" />
            {property.divisionName ?? "—"}, {property.cityName ?? "—"}
            {property.zoneName ? `, ${property.zoneName}` : ""}
            {property.streetName ? `, ${property.streetName}` : ""}
          </div>

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

            <div className="flex items-center gap-2">
              <span
                className={`flex items-center gap-1 text-[10px] font-bold px-2 py-1 rounded-full border capitalize ${availabilityClass}`}
              >
                {property.availability?.replace(/_/g, " ") ?? "—"}
              </span>
            </div>
          </div>

          {typeof property.opportunityCount === "number" &&
            property.opportunityCount !== 0 && (
              <div
                className="mt-3 cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(
                    `/opportunities?zone=${encodeURIComponent(property.zoneName ?? "")}`,
                  );
                }}
              >
                <div className="flex items-center justify-between rounded-xl border border-emerald-200 bg-emerald-50 hover:bg-emerald-100 transition-colors px-3 py-2">
                  <div className="flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-emerald-500" />
                    <span className="text-xs font-medium text-emerald-700">
                      Opportunities in zone
                    </span>
                  </div>
                  <span className="text-sm font-bold text-emerald-800 bg-white px-2 py-0.5 rounded-lg border border-emerald-200">
                    {property.opportunityCount}
                  </span>
                </div>
              </div>
            )}

          <div className="flex justify-between mt-auto pt-3">
            {isAdmin && (
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center">
                  <User className="w-3 h-3 text-slate-400" />
                </div>
                <span className="truncate max-w-[100px]">
                  {property.agent ?? "No agent assigned"}
                </span>
              </div>
            )}
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

      {modalOpen && (
        <ModalProperty
          key={editModel?.id}
          open={modalOpen}
          onOpenChange={(open) => {
            setModalOpen(open);
          }}
          defaultValues={editModel}
          formMode={EFormMode.Edit}
          onSave={() => {
            onSaved?.();
            setModalOpen(false);
            setEditModel(null);
          }}
        />
      )}
    </>
  );
}
