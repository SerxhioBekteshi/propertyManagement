/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  MapPin,
  BedDouble,
  Bath,
  Maximize2,
  Layers,
  Home,
  Info,
  User as UserIcon,
  CheckCircle2,
  XCircle,
  Clock,
  Building2,
  Construction,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { MOCK_PROPERTIES } from "../../hooks/useProperties";
import { statusColors } from "../dashboard/components/PropertyCard";
import { countryFlags } from "../../components/navbar";

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

export default function PropertyDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const property = MOCK_PROPERTIES.find((p) => String(p.id) === id);

  // Carousel State
  const [imgIndex, setImgIndex] = useState(0);
  const images = property?.images?.length
    ? property.images
    : [
        "https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg",
        "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg",
      ];

  if (!property) return <NotFound navigate={navigate} />;

  const nextImg = () => setImgIndex((prev) => (prev + 1) % images.length);
  const prevImg = () =>
    setImgIndex((prev) => (prev - 1 + images.length) % images.length);

  return (
    <div className="mx-auto pb-20 space-y-6">
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
              statusColors[property.status] || "bg-slate-100 border-slate-200"
            }`}
          >
            {property.status?.replace(/_/g, " ")}
          </span>
          <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-slate-900 text-white">
            {property.businessType}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* IMAGE CAROUSEL WITH SWIPE */}
          <div className="relative h-[450px] rounded-3xl overflow-hidden border border-slate-200 shadow-sm bg-slate-900 group">
            <AnimatePresence mode="wait">
              <motion.img
                key={imgIndex}
                src={images[imgIndex]}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                onDragEnd={(_, info) => {
                  if (info.offset.x < -50) nextImg();
                  if (info.offset.x > 50) prevImg();
                }}
                className="w-full h-full object-cover cursor-grab active:cursor-grabbing"
              />
            </AnimatePresence>

            {/* Carousel Controls */}
            {images.length > 1 && (
              <>
                <button
                  onClick={prevImg}
                  className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/20 backdrop-blur-md text-white opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <ChevronLeft />
                </button>
                <button
                  onClick={nextImg}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/20 backdrop-blur-md text-white opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <ChevronRight />
                </button>
                <div className="absolute bottom-24 left-1/2 -translate-x-1/2 flex gap-1.5">
                  {images.map((_, i) => (
                    <div
                      key={i}
                      className={`h-1.5 rounded-full transition-all ${i === imgIndex ? "w-6 bg-white" : "w-1.5 bg-white/50"}`}
                    />
                  ))}
                </div>
              </>
            )}

            {/* Floating Info Card */}
            <div className="absolute bottom-4 left-4 right-4  p-4 bg-white/90 backdrop-blur-md rounded-2xl shadow-xl flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-bold text-slate-900">
                  {property.title}
                </h1>
                <div className="flex items-center gap-1 text-slate-500 text-sm mt-1 font-medium">
                  <MapPin className="w-4 h-4 text-blue-500" />
                  {property.address}, {property.city}
                </div>
              </div>
              {/* PRICING BLOCK */}
              <div className="flex flex-col items-end border-l border-slate-100 pl-6 gap-1">
                <div className="text-right">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block leading-none mb-1">
                    Total Price
                  </span>
                  <p className="text-3xl font-black text-slate-900 leading-none">
                    {property.priceUponRequest
                      ? "Price on Request"
                      : `€${property.price?.toLocaleString()}`}
                  </p>
                </div>

                {/* VISIBLE PRICE/m2 BUT SUBTLE SCALE */}
                {property.priceForM2 && !property.priceUponRequest && (
                  <div className="flex items-center gap-1.5 mt-1 px-3 py-1 bg-blue-50 text-blue-700 rounded-lg border border-blue-100/50">
                    <Maximize2 className="w-3 h-3" />
                    <span className="text-xs font-bold whitespace-nowrap">
                      €{property.priceForM2.toLocaleString()} / m²
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* QUICK STATS BAR */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Stat
              icon={<BedDouble className="w-5 h-5" />}
              label="Bedrooms"
              value={property.bedrooms}
              color="blue"
            />
            <Stat
              icon={<Bath className="w-5 h-5" />}
              label="Bathrooms"
              value={property.bathrooms}
              color="indigo"
            />
            <Stat
              icon={<Maximize2 className="w-5 h-5" />}
              label="Interior"
              value={`${property.interiorArea} m²`}
              color="emerald"
            />
            <Stat
              icon={<Layers className="w-5 h-5" />}
              label="Gross Area"
              value={`${property.grossArea} m²`}
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

                {/* Updated Availability with Badge logic */}
                <div className="flex justify-between items-center py-1 border-b border-slate-50 last:border-0">
                  <span className="text-slate-500 text-xs font-medium">
                    Availability
                  </span>
                  <span
                    className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md border ${
                      AVAILABILITY_STYLES[property.availability] ||
                      "bg-slate-50 text-slate-600"
                    }`}
                  >
                    {property.availability?.replace(/_/g, " ")}
                  </span>
                </div>

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

        {/* SIDEBAR CONTENT */}
        <div className="space-y-6">
          <Section
            icon={<MapPin className="w-5 h-5 text-red-500" />}
            title="Location Details"
          >
            <div className="space-y-3">
              <Item label="Country" value={property.country} capitalize />
              <Item label="Zone" value={property.zone} />
              <Item label="Floor" value={property.floor || "0"} />
              <div className="mt-4 h-32 bg-slate-100 rounded-xl flex flex-col items-center justify-center border-2 border-dashed border-slate-200">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  Georeference
                </p>
                <p className="text-xs text-slate-500 font-mono">
                  {property.latitude}, {property.longitude}
                </p>
              </div>
            </div>
          </Section>

          <Section
            icon={<UserIcon className="w-5 h-5 text-indigo-500" />}
            title="Ownership & Agent"
          >
            <div className="space-y-3">
              <Item label="Owner" value={property.owner} />
              <Item
                label="Typology"
                value={property.ownersTypology}
                capitalize
              />
              <div className="pt-4 mt-4 border-t border-slate-100">
                <Item
                  label="Assigned Agent"
                  value={property.agentId}
                  highlight
                />
                <Item
                  label="Documentation"
                  value={property.documentation}
                  highlight
                  capitalize
                />
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
                {property.portalsToPublish?.map((p: string) => (
                  <span
                    key={p}
                    className="text-[10px] bg-blue-50 text-blue-600 px-2 py-0.5 rounded font-bold uppercase border border-blue-100"
                  >
                    {p}
                  </span>
                ))}
              </div>
              <div className="pt-4 mt-4 border-t border-slate-100 text-[10px] text-slate-400 font-medium">
                LAST MODIFIED BY: {property.lastModifiedBy}
              </div>
            </div>
          </Section>
        </div>
      </div>
    </div>
  );
}

// Reusable Sub-components (Stat, Section, Item, Grid, NotFound) remain largely same as your previous snippet
// but ensure Item and Stat use the consistent typography.

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
  type, // Use this to trigger specific styles (e.g., "availability", "country")
}: any) {
  if (value == null)
    return (
      <div className="flex justify-between items-center py-1 border-b border-slate-50 last:border-0">
        <span className="text-slate-500 text-xs font-medium">{label}</span>
        <span className="text-slate-300">-</span>
      </div>
    );

  let displayValue: React.ReactNode = value;
  const lowerValue = String(value).toLowerCase();

  // 1. COUNTRY FLAGS
  if (label.toLowerCase() === "country") {
    displayValue = (
      <span className="flex items-center gap-2">
        <span>{countryFlags[lowerValue] || "🏳️"}</span>
        <span className="capitalize">{value}</span>
      </span>
    );
  }

  // 2. FURNISHED ICONS
  else if (label.toLowerCase() === "furnished") {
    displayValue = (
      <span className="flex items-center gap-2">
        <span>{FURNISHED_ICONS[lowerValue] || "🏠"}</span>
        <span className="capitalize">{value.replace(/_/g, " ")}</span>
      </span>
    );
  }

  // 3. ORIENTATION ICONS
  else if (label.toLowerCase().includes("orientation")) {
    displayValue = (
      <span className="flex items-center gap-2">
        <span className="text-blue-500 font-bold">
          {ORIENTATION_ICONS[lowerValue] || "🧭"}
        </span>
        <span className="capitalize">{value.replace(/_/g, " ")}</span>
      </span>
    );
  }

  // 4. PROPERTY & MAIN TYPE BADGES
  else if (label.toLowerCase().includes("type")) {
    const colorClass =
      TYPE_COLORS[lowerValue] || "bg-slate-50 text-slate-600 border-slate-100";
    displayValue = (
      <span
        className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded border ${colorClass}`}
      >
        {value.replace(/_/g, " ")}
      </span>
    );
  }

  // 5. AVAILABILITY STYLING
  else if (label.toLowerCase() === "availability") {
    displayValue = (
      <span
        className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded border ${
          AVAILABILITY_STYLES[lowerValue] || "bg-slate-50 border-slate-200"
        }`}
      >
        {value.replace(/_/g, " ")}
      </span>
    );
  }

  // 6. BOOLEANS / YES-NO
  else if (isBoolean) {
    displayValue = value ? (
      <CheckCircle2 className="w-4 h-4 text-emerald-500" />
    ) : (
      <XCircle className="w-4 h-4 text-slate-300" />
    );
  } else if (isYesNo) {
    displayValue =
      value === "yes" ? (
        <span className="text-emerald-600 font-bold">Yes</span>
      ) : (
        <span className="text-slate-400">No</span>
      );
  }

  return (
    <div className="flex justify-between items-center py-1 border-b border-slate-50 last:border-0">
      <span className="text-slate-500 text-xs font-medium">{label}</span>
      <span
        className={`font-semibold text-slate-900 ${capitalize && !type ? "capitalize" : ""} ${highlight ? "text-blue-600" : ""}`}
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
      <p className="text-lg font-black">{value ?? "-"}</p>
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
