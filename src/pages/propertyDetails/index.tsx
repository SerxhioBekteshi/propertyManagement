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
} from "lucide-react";
import { statusColors } from "../dashboard/components/PropertyCard";
import { countryFlags } from "../../components/navbar";
import { PropertyResponseDTO } from "../../types/properties";
import { PropertiesService } from "../../lib/Properties";
import { useAuth } from "../../contexts/AuthContext";

const AVAILABILITY_STYLES: Record<string, string> = {
  available: "bg-emerald-100 text-emerald-700 border-emerald-200",
  reserved: "bg-purple-100 text-purple-700 border-purple-200",
  sold: "bg-rose-100 text-rose-700 border-rose-200",
  rented: "bg-blue-100 text-blue-700 border-blue-200",
  in_negotiation: "bg-amber-100 text-amber-700 border-amber-200",
  withdrawn: "bg-slate-100 text-slate-700 border-slate-200",
};

const FURNISHED_ICONS: Record<string, string> = {
  no: "❌",
  furnished: "🛋️",
  semi_furnished: "🪑",
};

const ORIENTATION_ICONS: Record<string, string> = {
  north: "⬆️",
  south: "⬇️",
  east: "➡️",
  west: "⬅️",
  north_east: "↗️",
  north_west: "↖️",
  south_east: "↘️",
  south_west: "↙️",
};

const TYPE_COLORS: Record<string, string> = {
  apartment: "bg-blue-50 text-blue-700 border-blue-100",
  house: "bg-emerald-50 text-emerald-700 border-emerald-100",
  villa: "bg-amber-50 text-amber-700 border-amber-100",
  commercial: "bg-orange-50 text-orange-700 border-orange-100",
  land: "bg-lime-50 text-lime-700 border-lime-100",
  office: "bg-cyan-50 text-cyan-700 border-cyan-100",
  studio: "bg-rose-50 text-rose-700 border-rose-100",
};

const parseList = (val?: string) =>
  val
    ? val
        .split(",")
        .map((v) => v.trim())
        .filter(Boolean)
    : [];

const formatDate = (val?: string) => {
  if (!val) return "—";
  return new Date(val).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

export default function PropertyDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [property, setProperty] = useState<PropertyResponseDTO>();
  const [isLoading, setIsLoading] = useState(true); // ✅ ADDED

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
            url: "https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg",
            private: false,
          },
          {
            url: "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg",
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
              statusColors[property.status ?? ""] ||
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
          {/* IMAGE CAROUSEL */}
          <div className="space-y-3">
            {/* Main Image */}
            <div className="relative h-[480px] rounded-2xl overflow-hidden bg-slate-900 group border border-slate-200 shadow-sm">
              {/* Images stacked, toggled via opacity — no AnimatePresence delay */}
              {images.map((img, i) => (
                <img
                  key={img.url}
                  src={`${import.meta.env.VITE_APP_BACKEND_API_URL}/${img.url}`}
                  loading="eager"
                  className="absolute inset-0 w-full h-full object-cover transition-opacity duration-200"
                  style={{
                    opacity: i === imgIndex ? 1 : 0,
                    zIndex: i === imgIndex ? 1 : 0,
                  }}
                  draggable={false}
                />
              ))}

              {/* Swipe support via an invisible drag layer */}
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
                  {/* <Lock className="w-3 h-3" /> */}
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

              {/* Floating Info Card */}
              <div className="absolute bottom-4 left-4 right-16 z-20 p-4 bg-white/90 backdrop-blur-md rounded-2xl shadow-xl flex justify-between items-center">
                <div className="min-w-0 pr-4">
                  <h1 className="text-xl font-bold text-slate-900 truncate">
                    {property.title ?? "—"}
                  </h1>
                  <div className="flex items-center gap-1 text-slate-500 text-sm mt-1 font-medium">
                    <MapPin className="w-4 h-4 text-blue-500 shrink-0" />
                    <span className="truncate">
                      {[property.address, property.cityName]
                        .filter(Boolean)
                        .join(", ") || "—"}
                    </span>
                  </div>
                </div>
                <div className="flex flex-col items-end border-l border-slate-100 pl-4 shrink-0 gap-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-1">
                    Total Price
                  </span>
                  <p className="text-2xl font-black text-slate-900 leading-none">
                    {property.priceUponRequest
                      ? "On Request"
                      : property.price
                        ? `€${property.price.toLocaleString()}`
                        : "—"}
                  </p>
                  {property.priceForM2 && !property.priceUponRequest && (
                    <div className="flex items-center gap-1 mt-1 px-2 py-0.5 bg-blue-50 text-blue-700 rounded-lg border border-blue-100/50">
                      <Maximize2 className="w-3 h-3" />
                      <span className="text-xs font-bold whitespace-nowrap">
                        €{property.priceForM2.toLocaleString()} / m²
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Thumbnail filmstrip */}
            {images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-thin scrollbar-thumb-slate-200">
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
                      src={`${import.meta.env.VITE_APP_BACKEND_API_URL}/${img.url}`}
                      loading="lazy"
                      className="w-full h-full object-cover"
                    />
                    {img.private && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                        {/* <Lock className="w-3 h-3 text-white" /> */}
                      </div>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* QUICK STATS BAR */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <Stat
              icon={<BedDouble className="w-5 h-5" />}
              label="Bedrooms"
              value={property.bedrooms ?? "—"}
              color="blue"
            />
            <Stat
              icon={<Bath className="w-5 h-5" />}
              label="Bathrooms"
              value={property.bathrooms ?? "—"}
              color="indigo"
            />
            <Stat
              icon={<Maximize2 className="w-5 h-5" />}
              label="Interior"
              value={
                property.interiorArea ? `${property.interiorArea} m²` : "—"
              }
              color="emerald"
            />
            <Stat
              icon={<Layers className="w-5 h-5" />}
              label="Gross Area"
              value={property.grossArea ? `${property.grossArea} m²` : "—"}
              color="slate"
            />
            <Stat
              icon={<TreeDeciduous className="w-5 h-5" />}
              label="Land Area"
              value={property.landArea ? `${property.landArea} m²` : "—"}
              color="emerald"
            />
            <Stat
              icon={<Square className="w-5 h-5" />}
              label="Balcony Area"
              value={property.balconyArea ? `${property.balconyArea} m²` : "—"}
              color="slate"
            />
          </div>

          <Section
            icon={<Info className="w-5 h-5 text-blue-500" />}
            title="Description"
          >
            <p className="text-slate-600 leading-relaxed italic border-l-4 border-slate-100 pl-4">
              "{property.description || "No description provided."}"
            </p>
          </Section>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Section
              icon={<Building2 className="w-5 h-5 text-slate-500" />}
              title="Property Classification"
            >
              <Grid>
                <Item label="Main Type" value={property.mainType} capitalize />
                <Item
                  label="Property Type"
                  value={property.propertyType}
                  capitalize
                />
                <Item label="Availability" value={property.availability} />
                <Item
                  label="Furnished"
                  value={property.furnished?.replace(/_/g, " ")}
                  capitalize
                />
                <Item
                  label="Orientation"
                  value={property.propertyOrientation}
                />
                <Item label="Exclusive" value={property.exclusive} isBoolean />
              </Grid>
            </Section>

            <Section
              icon={<Construction className="w-5 h-5 text-slate-500" />}
              title="Facilities & Timeline"
            >
              <Grid>
                <Item label="Elevator" value={property.elevator} isYesNo />
                <Item label="Parking" value={property.parking} isYesNo />
                <Item label="Being Lived" value={property.beingLived} isYesNo />
                <Item
                  label="Communal Charge"
                  value={property.communalCharger}
                  isYesNo
                />
                <Item label="Year Built" value={property.yearOfConstruction} />
                <Item
                  label="Year Renovated"
                  value={property.yearOfRenovation}
                />
              </Grid>
            </Section>
          </div>
        </div>

        {/* SIDEBAR */}
        <div className="space-y-6">
          <Section
            icon={<MapPin className="w-5 h-5 text-red-500" />}
            title="Location Details"
          >
            <div className="space-y-3">
              <Item label="Country" value={property.country} capitalize />
              <Item label="Division" value={property.divisionName} capitalize />
              <Item label="City" value={property.cityName} />
              <Item label="Zone" value={property.zoneName} />
              <Item label="Floor" value={property.floor ?? "—"} />
              <div className="mt-4 h-32 bg-slate-100 rounded-xl flex flex-col items-center justify-center border-2 border-dashed border-slate-200">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  Georeference
                </p>
                <p className="text-xs text-slate-500 font-mono">
                  {property.latitude ?? "—"}, {property.longitude ?? "—"}
                </p>
              </div>
            </div>
          </Section>

          <Section
            icon={<UserIcon className="w-5 h-5 text-indigo-500" />}
            title="Ownership & Agent"
          >
            <div className="space-y-3">
              <Item label="Owner's Typology" value={property.ownersTypology} />

              <Item
                label="Owner's Phone Number"
                value={
                  user?.id == property.agentId ||
                  user?.id == property.propertyOwner?.assignedToId ? (
                    property.propertyOwner?.phoneNumber
                  ) : (
                    <span className="text-slate-300">—</span>
                  )
                }
              />

              <Item
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
                <Item label="Assigned Agent" value={property.agent} highlight />
                <div className="flex justify-between items-center py-1 border-b border-slate-50 last:border-0">
                  <span className="text-slate-500 text-xs font-medium">
                    Documentation
                  </span>
                  <div className="flex gap-2 flex-wrap">
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
                </div>
              </div>
            </div>
          </Section>

          <Section
            icon={<Clock className="w-5 h-5 text-slate-400" />}
            title="Portals & System"
          >
            <div className="space-y-3">
              <Item
                label="Published"
                value={property.publishToPortal}
                isBoolean
              />
              <div className="flex flex-wrap gap-1 mt-2">
                {parseList(property.portalsToPublish).map((p: string) => (
                  <span
                    key={p}
                    className="text-[10px] bg-blue-50 text-blue-600 px-2 py-0.5 rounded font-bold uppercase border border-blue-100"
                  >
                    {p}
                  </span>
                ))}
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
          </Section>

          <Section
            icon={<Layers className="w-5 h-5 text-purple-500" />}
            title="More Features"
          >
            <div className="space-y-4">
              <FeatureGroup
                label="View To"
                values={parseList(property.withViewTo)}
                color="blue"
              />

              <FeatureGroup
                label="Equipment"
                values={parseList(property.equipment)}
                color="emerald"
              />

              <FeatureGroup
                label="Infrastructures"
                values={parseList(property.infrastructures)}
                color="amber"
              />

              <FeatureGroup
                label="Surroundings"
                values={parseList(property.surroundings)}
                color="indigo"
              />
            </div>
          </Section>
        </div>
      </div>
    </div>
  );
}

/* ALL YOUR COMPONENTS BELOW EXACTLY SAME */

function Section({ title, icon, children }: any) {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        {icon}
        <h2 className="font-bold text-slate-800 uppercase tracking-tight text-xs">
          {title}
        </h2>
      </div>
      {children}
    </div>
  );
}

function Grid({ children }: any) {
  return <div className="space-y-3 text-sm">{children}</div>;
}

function Item({
  label,
  value,
  isBoolean,
  isYesNo,
  capitalize,
  highlight,
}: any) {
  if (value == null)
    return (
      <div className="flex justify-between items-center py-1 border-b border-slate-50 last:border-0">
        <span className="text-slate-500 text-xs font-medium">{label}</span>
        <span className="text-slate-300">—</span>
      </div>
    );

  let displayValue: React.ReactNode = value;
  const lowerValue = String(value).toLowerCase();

  if (label.toLowerCase() === "country") {
    displayValue = (
      <span className="flex items-center gap-2">
        <span>{countryFlags[lowerValue] || "🏳️"}</span>
        <span className="capitalize">{value}</span>
      </span>
    );
  } else if (label.toLowerCase() === "furnished") {
    displayValue = (
      <span className="flex items-center gap-2">
        <span>{FURNISHED_ICONS[lowerValue] || "🏠"}</span>
        <span className="capitalize">{value.replace(/_/g, " ")}</span>
      </span>
    );
  } else if (label.toLowerCase().includes("orientation")) {
    displayValue = (
      <span className="flex items-center gap-2">
        <span className="text-blue-500 font-bold">
          {ORIENTATION_ICONS[lowerValue] || "🧭"}
        </span>
        <span className="capitalize">{value.replace(/_/g, " ")}</span>
      </span>
    );
  } else if (label.toLowerCase().includes("type")) {
    const colorClass =
      TYPE_COLORS[lowerValue] || "bg-slate-50 text-slate-600 border-slate-100";
    displayValue = (
      <span
        className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded border ${colorClass}`}
      >
        {value.replace(/_/g, " ")}
      </span>
    );
  } else if (label.toLowerCase() === "availability") {
    displayValue = (
      <span
        className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded border ${AVAILABILITY_STYLES[lowerValue] || "bg-slate-50 border-slate-200"}`}
      >
        {value.replace(/_/g, " ")}
      </span>
    );
  } else if (isBoolean) {
    displayValue = value ? (
      <CheckCircle2 className="w-4 h-4 text-emerald-500" />
    ) : (
      <XCircle className="w-4 h-4 text-slate-300" />
    );
  } else if (isYesNo) {
    displayValue =
      value === true ? (
        <span className="text-emerald-600 font-bold text-xs">Yes</span>
      ) : value === false ? (
        <span className="text-slate-400 text-xs">No</span>
      ) : (
        <span className="text-slate-300">—</span>
      );
  }

  return (
    <div className="flex justify-between items-center py-1 border-b border-slate-50 last:border-0">
      <span className="text-slate-500 text-xs font-medium">{label}</span>
      <span
        className={`font-semibold text-slate-900 ${capitalize ? "capitalize" : ""} ${highlight ? "text-blue-600" : ""}`}
      >
        {displayValue}
      </span>
    </div>
  );
}

function Stat({ icon, label, value, color }: any) {
  const colors: any = {
    blue: "bg-blue-50 text-blue-600",
    emerald: "bg-emerald-50 text-emerald-600",
    indigo: "bg-indigo-50 text-indigo-600",
    slate: "bg-slate-50 text-slate-600",
  };

  return (
    <div
      className={`p-4 rounded-2xl ${colors[color]} flex flex-col items-center text-center gap-1`}
    >
      {icon}
      <p className="text-[10px] font-bold uppercase opacity-70 tracking-tighter">
        {label}
      </p>
      <p className="text-lg font-black">{value}</p>
    </div>
  );
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

function FeatureGroup({
  label,
  values,
  color,
}: {
  label: string;
  values: string[];
  color: "blue" | "emerald" | "amber" | "indigo";
}) {
  const colorMap = {
    blue: "bg-blue-50 text-blue-700 border-blue-100",
    emerald: "bg-emerald-50 text-emerald-700 border-emerald-100",
    amber: "bg-amber-50 text-amber-700 border-amber-100",
    indigo: "bg-indigo-50 text-indigo-700 border-indigo-100",
  };

  return (
    <div>
      <p className="text-xs font-semibold text-slate-500 mb-2">{label}</p>

      <div className="flex flex-wrap gap-2">
        {values.length > 0 ? (
          values.map((v) => (
            <span
              key={v}
              className={`text-[11px] font-medium px-2.5 py-1 rounded-lg border ${colorMap[color]}`}
            >
              {v.replace(/_/g, " ")}
            </span>
          ))
        ) : (
          <div className="flex items-center gap-2 py-1.5 px-3 rounded-lg bg-slate-50 border border-dashed border-slate-200 w-fit">
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              className="text-slate-300 shrink-0"
            >
              <circle
                cx="6"
                cy="6"
                r="5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeDasharray="2 2"
              />
              <line
                x1="4"
                y1="6"
                x2="8"
                y2="6"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
            <span className="text-[11px] text-slate-400 font-medium italic">
              Not specified
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
