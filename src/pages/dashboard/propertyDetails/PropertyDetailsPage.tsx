/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  MapPin,
  BedDouble,
  Bath,
  Maximize2,
  Layers,
  Info,
  User as UserIcon,
  CheckCircle2,
  XCircle,
  Clock,
  Building2,
  Construction,
  ChevronLeft,
  ChevronRight,
  Square,
  TreeDeciduous,
  Hand,
  FileText,
  Sparkles,
} from "lucide-react";
import { PropertyResponseDTO } from "../../../types/properties";
import { PropertiesService } from "../../../lib/Properties";
import { useAuth } from "../../../contexts/AuthContext";
import { ERoles } from "../../../assets/enums";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import PropertyDetailsItem from "../components/PropertyDetailsItem";
import { formatDate, getPhoneWithPrefix, parseList } from "../helpers";
import PropertyDetailsFeatureGroup from "../components/PropertyDetailsFeatureGroup";
import PropertyDetailsSection from "../components/PropertyDetailsSection";
import PropertyDetailsStat from "../components/PropertyDetailsStat";
import { STATUS_COLORS } from "../../../utils/styles";
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const nationalityFlags: Record<string, string> = {
  albania: "AL",
  greece: "GR",
};

export default function PropertyDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [property, setProperty] = useState<PropertyResponseDTO>();
  const [isLoading, setIsLoading] = useState(true);

  const getPropertyDetails = async () => {
    setIsLoading(true);
    const res = await PropertiesService.getPropertyById(Number(id));
    if (res.data) {
      setProperty(res.data);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    getPropertyDetails();
  }, [id]);

  const [imgIndex, setImgIndex] = useState(0);

  const publicImages: { url: string; private: boolean }[] = (
    property?.imageUrls ?? []
  ).map((u) => ({ url: u, private: false }));

  const privateImages: { url: string; private: boolean }[] = (
    property?.privateImageUrls ?? []
  ).map((u) => ({ url: u, private: true }));

  const images: { url: string; private: boolean }[] =
    publicImages.length + privateImages.length > 0
      ? [...publicImages, ...privateImages]
      : [
          {
            url: "https://placehold.co/800x600/e2e8f0/94a3b8?text=No+Image+Available",
            private: false,
          },
        ];

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-slate-200 border-t-slate-900 rounded-full animate-spin" />
          <p className="text-sm text-slate-500 font-medium">
            Loading property...
          </p>
        </div>
      </div>
    );
  }

  if (!property) return <NotFound navigate={navigate} />;

  const nextImg = () => setImgIndex((prev) => (prev + 1) % images.length);
  const prevImg = () =>
    setImgIndex((prev) => (prev - 1 + images.length) % images.length);

  return (
    <div className="mx-auto pb-20 space-y-6 mt-4">
      {/* HEADER NAVIGATION */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate(-1)}
          className="group flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Listings
        </button>
        <div className="flex gap-2">
          <span
            className={`text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full border ${
              STATUS_COLORS[property.status ?? ""] ||
              "bg-slate-100 border-slate-200"
            }`}
          >
            {property.status?.replace(/_/g, " ") ?? "—"}
          </span>
          <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-slate-900 text-white">
            {property.businessType ?? "—"}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* IMAGE CAROUSEL */}
          <div className="space-y-3">
            {/* Main Image */}
            <div className="relative h-[480px] rounded-2xl overflow-hidden bg-slate-900 group border border-slate-200 shadow-sm">
              {images.map((img, i) => {
                const src = img.url?.startsWith("http")
                  ? img.url
                  : `${import.meta.env.VITE_APP_BACKEND_API_URL}/${img.url.replace(/^\//, "")}`;

                return (
                  <img
                    key={img.url}
                    src={src}
                    loading="eager"
                    draggable={false}
                    className="absolute inset-0 w-full h-full object-cover transition-opacity duration-200"
                    style={{
                      opacity: i === imgIndex ? 1 : 0,
                      zIndex: i === imgIndex ? 1 : 0,
                    }}
                  />
                );
              })}

              {/* Swipe support */}
              <div
                className="absolute inset-0 z-10 cursor-grab active:cursor-grabbing select-none"
                onPointerDown={(e) => {
                  const startX = e.clientX;
                  const onUp = (ev: PointerEvent) => {
                    const dx = ev.clientX - startX;
                    if (dx < -40) nextImg();
                    if (dx > 40) prevImg();
                    window.removeEventListener("pointerup", onUp);
                  };
                  window.addEventListener("pointerup", onUp);
                }}
              />

              {/* Private badge */}
              {images[imgIndex]?.private && (
                <div className="absolute top-4 left-4 z-20 flex items-center gap-1.5 px-2.5 py-1 bg-slate-900/80 backdrop-blur-sm text-white text-[10px] font-bold rounded-full border border-white/10">
                  <Hand className="w-3 h-3 text-white" />
                  Private
                </div>
              )}

              {/* Nav arrows */}
              {images.length > 1 && (
                <>
                  <button
                    onClick={prevImg}
                    className="absolute left-3 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-black/40 backdrop-blur-sm text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/60"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={nextImg}
                    className="absolute right-3 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-black/40 backdrop-blur-sm text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/60"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}

              {/* Counter badge */}
              <div className="absolute bottom-4 right-4 z-20 px-2.5 py-1 bg-black/50 backdrop-blur-sm text-white text-[11px] font-bold rounded-full tabular-nums">
                {imgIndex + 1} / {images.length}
              </div>

              {/* Floating Info Bar */}
              <div className="absolute bottom-0 left-0 right-0 z-20">
                <div className="h-24 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="bg-white/90 backdrop-blur-md border-t border-white/50 shadow-2xl px-5 py-4 flex items-stretch justify-between gap-4">
                  {/* LEFT — Title + Location */}
                  <div className="flex items-start gap-3 min-w-0 flex-1">
                    <div className="mt-0.5 p-2 bg-blue-500 rounded-xl shrink-0">
                      <MapPin className="w-4 h-4 text-white" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h1 className="text-base font-black text-slate-900 leading-tight truncate">
                        {property.title ?? "—"}
                      </h1>
                      <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 mt-1">
                        {[
                          property.address,
                          property.divisionName,
                          property.cityName,
                          property.zoneName,
                          property.streetName,
                        ]
                          .filter(Boolean)
                          .map((val, i, arr) => (
                            <span key={i} className="flex items-center gap-2">
                              <span className="text-xs text-slate-500">
                                {val}
                              </span>
                              {i < arr.length - 1 && (
                                <span className="w-1 h-1 rounded-full bg-slate-300 shrink-0" />
                              )}
                            </span>
                          ))}
                        {![
                          property.address,
                          property.divisionName,
                          property.cityName,
                          property.zoneName,
                          property.streetName,
                        ].some(Boolean) && (
                          <span className="text-xs text-slate-400">
                            Location not specified
                          </span>
                        )}
                      </div>

                      {/* Exclusive badge */}
                      <div className="mt-1.5">
                        {property.exclusive ? (
                          <span className="inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-green-400 text-white">
                            <CheckCircle2 className="w-3 h-3" />
                            Exclusive
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-100 text-slate-400">
                            <XCircle className="w-3 h-3" />
                            Not Exclusive
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* DIVIDER */}
                  <div className="w-px bg-slate-200 self-stretch shrink-0" />

                  {/* RIGHT — Price */}
                  <div className="flex flex-col items-end justify-center shrink-0 pl-1">
                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-[0.15em] leading-none mb-1.5">
                      {property.businessType === "Rent"
                        ? "Monthly Rent"
                        : "Sale Price"}
                    </span>
                    <p
                      className={`font-black text-slate-900 leading-none ${
                        property.priceUponRequest ? "text-base" : "text-2xl"
                      }`}
                    >
                      {property.priceUponRequest
                        ? "Price on Request"
                        : property.price
                          ? `€${property.price.toLocaleString()}`
                          : "—"}
                    </p>
                    {property.priceForM2 && !property.priceUponRequest && (
                      <div className="flex items-center gap-1 mt-2 px-2.5 py-1 bg-slate-900 text-white rounded-lg">
                        <Maximize2 className="w-3 h-3 opacity-70" />
                        <span className="text-[11px] font-bold whitespace-nowrap">
                          €{property.priceForM2.toLocaleString()} / m²
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Thumbnail filmstrip */}
            {images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto p-2 scrollbar-thin scrollbar-thumb-slate-200">
                {images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setImgIndex(i)}
                    className={`relative shrink-0 w-16 h-16 rounded-xl overflow-hidden border-2 transition-all ${
                      i === imgIndex
                        ? "border-slate-900 shadow-md scale-105"
                        : "border-transparent opacity-60 hover:opacity-90"
                    }`}
                  >
                    <img
                      src={
                        img.url?.startsWith("http")
                          ? img.url
                          : `${import.meta.env.VITE_APP_BACKEND_API_URL}/${img.url.replace(/^\//, "")}`
                      }
                      loading="lazy"
                      className="w-full h-full object-cover"
                    />
                    {img.private && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                        <Hand className="w-3 h-3 text-white" />
                      </div>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* QUICK STATS BAR */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <PropertyDetailsStat
              icon={<BedDouble className="w-5 h-5" />}
              label="Bedrooms"
              value={property.bedrooms ?? "—"}
              color="blue"
            />
            <PropertyDetailsStat
              icon={<Bath className="w-5 h-5" />}
              label="Bathrooms"
              value={property.bathrooms ?? "—"}
              color="indigo"
            />
            <PropertyDetailsStat
              icon={<Maximize2 className="w-5 h-5" />}
              label="Interior"
              value={
                property.interiorArea ? `${property.interiorArea} m²` : "—"
              }
              color="emerald"
            />
            <PropertyDetailsStat
              icon={<Layers className="w-5 h-5" />}
              label="Gross Area"
              value={property.grossArea ? `${property.grossArea} m²` : "—"}
              color="slate"
            />
            <PropertyDetailsStat
              icon={<TreeDeciduous className="w-5 h-5" />}
              label="Land Area"
              value={property.landArea ? `${property.landArea} m²` : "—"}
              color="emerald"
            />
            <PropertyDetailsStat
              icon={<Square className="w-5 h-5" />}
              label="Balcony Area"
              value={property.balconyArea ? `${property.balconyArea} m²` : "—"}
              color="slate"
            />
          </div>

          <PropertyDetailsSection
            icon={<Info className="w-5 h-5 text-blue-500" />}
            title="Description"
          >
            <p className="text-slate-600 leading-relaxed italic border-l-4 border-slate-100 pl-4">
              "{property.description || "No description provided."}"
            </p>
          </PropertyDetailsSection>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <PropertyDetailsSection
              icon={<Building2 className="w-5 h-5 text-slate-500" />}
              title="Property Classification"
            >
              <Grid>
                <PropertyDetailsItem
                  label="Main Type"
                  value={property.mainType}
                  capitalize
                />
                <PropertyDetailsItem
                  label="Property Type"
                  value={property.propertyType}
                  capitalize
                />
                <PropertyDetailsItem
                  label="Availability"
                  value={property.availability}
                />
                <PropertyDetailsItem
                  label="Furnished"
                  value={property.furnished?.replace(/_/g, " ")}
                  capitalize
                />
                <PropertyDetailsItem
                  label="Orientation"
                  value={property.propertyOrientation}
                />
                <PropertyDetailsItem
                  label="Exclusive"
                  value={property.exclusive}
                  isBoolean
                />
              </Grid>
            </PropertyDetailsSection>

            <PropertyDetailsSection
              icon={<Construction className="w-5 h-5 text-slate-500" />}
              title="Facilities & Timeline"
            >
              <Grid>
                <PropertyDetailsItem
                  label="Elevator"
                  value={property.elevator}
                  isYesNo
                />
                <PropertyDetailsItem
                  label="Parking"
                  value={property.parking}
                  isYesNo
                />
                <PropertyDetailsItem
                  label="Being Lived"
                  value={property.beingLived}
                  isYesNo
                />
                <PropertyDetailsItem
                  label="Communal Charge"
                  value={property.communalCharger}
                  isYesNo
                />
                <PropertyDetailsItem
                  label="Year Built"
                  value={property.yearOfConstruction}
                />
                <PropertyDetailsItem
                  label="Year Renovated"
                  value={property.yearOfRenovation}
                />
              </Grid>
            </PropertyDetailsSection>
          </div>

          <PropertyDetailsSection
            icon={<Info className="w-5 h-5 text-blue-500" />}
            title="Comments"
          >
            <p className="text-slate-600 leading-relaxed italic border-l-4 border-slate-100 pl-4">
              "{property.comments || "No description provided."}"
            </p>
          </PropertyDetailsSection>
        </div>

        {/* SIDEBAR */}
        <div className="space-y-6">
          {typeof property.opportunityCount === "number" &&
            property.opportunityCount > 0 && (
              <PropertyDetailsSection
                icon={<Sparkles className="w-5 h-5 text-emerald-500" />}
                title="Opportunities in Zone"
              >
                <div
                  className="cursor-pointer"
                  onClick={() =>
                    navigate(
                      `/opportunities?zone=${encodeURIComponent(property.zoneName ?? "")}`,
                    )
                  }
                >
                  <div className="flex items-center justify-between rounded-xl border border-emerald-200 bg-emerald-50 hover:bg-emerald-100 transition-colors px-4 py-3">
                    <span className="text-sm font-medium text-emerald-700">
                      In <span className="font-bold">{property.zoneName}</span>{" "}
                      zone
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-emerald-800 bg-white px-2.5 py-1 rounded-lg border border-emerald-200">
                        {property.opportunityCount}
                      </span>
                      <span className="text-xs text-emerald-600 font-bold">
                        View →
                      </span>
                    </div>
                  </div>
                </div>
              </PropertyDetailsSection>
            )}

          <PropertyDetailsSection
            icon={<MapPin className="w-5 h-5 text-red-500" />}
            title="Location Details"
          >
            <div className="space-y-3">
              <PropertyDetailsItem
                label="Country"
                value={property.country}
                capitalize
              />
              <PropertyDetailsItem
                label="Division"
                value={property.divisionName}
                capitalize
              />
              <PropertyDetailsItem label="City" value={property.cityName} />
              <PropertyDetailsItem label="Zone" value={property.zoneName} />
              <PropertyDetailsItem
                label="Street"
                value={
                  property.streetName?.toLowerCase().includes("street")
                    ? property.streetName.replace(/street/gi, "").trim()
                    : property.streetName
                }
              />
              <PropertyDetailsItem
                label="Floor"
                value={property.floor ?? "—"}
              />
              {property.latitude && property.longitude ? (
                <div className="mt-4 h-48 rounded-xl overflow-hidden border border-slate-200">
                  <MapContainer
                    center={[property.latitude, property.longitude]}
                    zoom={15}
                    scrollWheelZoom={false}
                    style={{ height: "100%", width: "100%", zIndex: 0 }}
                  >
                    <TileLayer
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Marker position={[property.latitude, property.longitude]}>
                      <Popup>{property.title ?? "Property"}</Popup>
                    </Marker>
                  </MapContainer>
                </div>
              ) : (
                <div className="mt-4 h-32 bg-slate-100 rounded-xl flex flex-col items-center justify-center border-2 border-dashed border-slate-200">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    No location set
                  </p>
                </div>
              )}
              {/* <div className="mt-4 h-32 bg-slate-100 rounded-xl flex flex-col items-center justify-center border-2 border-dashed border-slate-200">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  Georeference
                </p>
                <p className="text-xs text-slate-500 font-mono">
                  {property.latitude ?? "—"}, {property.longitude ?? "—"}
                </p>
              </div> */}
            </div>
          </PropertyDetailsSection>

          <PropertyDetailsSection
            icon={<UserIcon className="w-5 h-5 text-indigo-500" />}
            title="Ownership & Agent"
          >
            <div className="space-y-3">
              <PropertyDetailsItem
                label="Owner's Typology"
                value={property.ownersTypology}
              />

              <PropertyDetailsItem
                label="Owner's Phone Number"
                value={
                  user?.role == ERoles.Admin.toString() ||
                  user?.id == property.agentId ||
                  user?.id == property.propertyOwner?.assignedToId ? (
                    <span className="flex items-center gap-2">
                      <span className="text-base">
                        {nationalityFlags[
                          property.propertyOwner?.nationality?.toLowerCase() ||
                            ""
                        ] || ""}
                      </span>
                      <span>
                        {getPhoneWithPrefix(
                          property.propertyOwner?.phoneNumber,
                          property.propertyOwner?.nationality,
                        )}
                      </span>
                    </span>
                  ) : (
                    <span className="text-slate-300">—</span>
                  )
                }
              />
              <PropertyDetailsItem
                label="Owner's Name"
                value={
                  property.propertyOwner?.firstName &&
                  property.propertyOwner?.lastName ? (
                    property.propertyOwner?.firstName +
                    " " +
                    property.propertyOwner?.lastName
                  ) : (
                    <span className="text-slate-300">—</span>
                  )
                }
              />

              <div className="pt-4 mt-4 border-t border-slate-100">
                {property.agentId != user?.id && (
                  <PropertyDetailsItem
                    label="Assigned Agent"
                    value={property.agent}
                    highlight
                  />
                )}
                <div className="py-1 border-b border-slate-50 last:border-0 space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-500 text-xs font-medium">
                      Documentation
                    </span>
                    <span
                      className={`px-3 py-1 text-xs font-bold rounded-full border ${
                        property.documentation === "yes"
                          ? "bg-emerald-100 text-emerald-700 border-emerald-200"
                          : property.documentation === "no"
                            ? "bg-rose-100 text-rose-700 border-rose-200"
                            : property.documentation === "in_progress"
                              ? "bg-amber-100 text-amber-700 border-amber-200"
                              : "bg-slate-100 text-slate-500 border-slate-200"
                      }`}
                    >
                      {property.documentation?.replace(/_/g, " ") ?? "—"}
                    </span>
                  </div>

                  {/* DOCUMENTS PropertyDetailsSection */}
                  {property.fileUrls && property.fileUrls.length > 0 && (
                    <div className="flex flex-col gap-2">
                      {property.fileUrls.map((fileUrl: string, i: number) => {
                        const src = fileUrl?.startsWith("http")
                          ? fileUrl
                          : `${import.meta.env.VITE_APP_BACKEND_API_URL}/${fileUrl.replace(/^\//, "")}`;

                        const fileName =
                          decodeURIComponent(fileUrl.split("/").pop() ?? "") ||
                          `Document ${i + 1}`;

                        return (
                          <a
                            key={fileUrl}
                            href={src}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-3 px-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-orange-50 hover:border-orange-200 transition group"
                          >
                            <div className="p-1.5 bg-orange-100 rounded-lg shrink-0 group-hover:bg-orange-200 transition">
                              <FileText className="w-3.5 h-3.5 text-orange-600" />
                            </div>
                            <span className="text-xs font-medium text-slate-700 truncate flex-1">
                              {fileName}
                            </span>
                            <span className="text-[10px] text-orange-500 font-bold shrink-0">
                              ↗
                            </span>
                          </a>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </PropertyDetailsSection>

          <PropertyDetailsSection
            icon={<Clock className="w-5 h-5 text-slate-400" />}
            title="Portals & System"
          >
            <div className="space-y-3">
              <PropertyDetailsItem
                label="Published"
                value={property.publishToPortal}
                isBoolean
              />
              <div className="flex flex-wrap gap-1 mt-2">
                {parseList(property.portalsToPublish).map((p: string) => {
                  const url = p.startsWith("http") ? p : `https://${p}`;
                  return (
                    <a
                      key={p}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[10px] bg-blue-50 text-blue-600 px-2 py-0.5 rounded font-bold uppercase border border-blue-100 hover:bg-blue-100 transition"
                    >
                      {p} ↗
                    </a>
                  );
                })}
              </div>
              <div className="pt-4 mt-4 border-t border-slate-100 space-y-2">
                <div className="flex justify-between text-[10px] text-slate-400 font-medium">
                  <span>CREATED BY</span>
                  <span className="text-slate-600">
                    {property.createdBy ?? "—"}
                  </span>
                </div>
                <div className="flex justify-between text-[10px] text-slate-400 font-medium">
                  <span>CREATED AT</span>
                  <span className="text-slate-600">
                    {formatDate(property.createdDateTime)}
                  </span>
                </div>
                <div className="flex justify-between text-[10px] text-slate-400 font-medium">
                  <span>MODIFIED BY</span>
                  <span className="text-slate-600">
                    {property.modifiedBy ?? "—"}
                  </span>
                </div>
                <div className="flex justify-between text-[10px] text-slate-400 font-medium">
                  <span>MODIFIED AT</span>
                  <span className="text-slate-600">
                    {formatDate(property.modifiedDateTime)}
                  </span>
                </div>
              </div>
            </div>
          </PropertyDetailsSection>

          <PropertyDetailsSection
            icon={<Layers className="w-5 h-5 text-purple-500" />}
            title="More Features"
          >
            <div className="space-y-4">
              <PropertyDetailsFeatureGroup
                label="View To"
                values={parseList(property.withViewTo)}
                color="blue"
              />
              <PropertyDetailsFeatureGroup
                label="Equipment"
                values={parseList(property.equipment)}
                color="emerald"
              />
              <PropertyDetailsFeatureGroup
                label="Infrastructures"
                values={parseList(property.infrastructures)}
                color="amber"
              />
              <PropertyDetailsFeatureGroup
                label="Surroundings"
                values={parseList(property.surroundings)}
                color="indigo"
              />
            </div>
          </PropertyDetailsSection>
        </div>
      </div>
    </div>
  );
}

function Grid({ children }: any) {
  return <div className="space-y-3 text-sm">{children}</div>;
}

function NotFound({ navigate }: any) {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-xl font-bold text-slate-900">Property not found</h1>
        <button
          onClick={() => navigate("/dashboard")}
          className="mt-6 px-6 py-2 bg-slate-900 text-white rounded-xl font-medium"
        >
          Return to Dashboard
        </button>
      </div>
    </div>
  );
}
