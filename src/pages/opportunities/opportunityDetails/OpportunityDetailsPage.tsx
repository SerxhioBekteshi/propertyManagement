import { useEffect, useState } from "react";
import { OpportunityResponseDTO } from "../../../types/opportunities";
import { OpportunitieService } from "../../../lib/Opportunity";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  MapPin,
  User,
  Layers,
  Info,
  CheckCircle2,
  XCircle,
  Target,
  Zap,
  Home,
} from "lucide-react";
import { ERoles } from "../../../assets/enums";
import { useAuth } from "../../../contexts/AuthContext";
import {
  fmt,
  fmtDate,
  fmtMoney,
  parseList,
  renderLeadSource,
} from "../helpers";
import OpportunityMetricTitle from "../components/OpportunityMetricTitle";
import OpportunityCard from "../components/OpportynityCard";
import OpportunityTagCloud from "../components/OpportunityTagCloud";
import OpportunityRow from "../components/OpportunityRow";
import OpportunityBadge from "../components/OpportunityBadge";
import {
  AVAILABILITY_STYLES,
  BUSINESS_TYPE_STYLES,
  PAYMENT_TYPE_STYLES,
  SALES_STAGE_STYLES,
} from "../../../utils/styles";
import CountryFlag from "../../../components/flags/CountryFlag";

const OpportunityDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [opportunity, setOpportunity] = useState<OpportunityResponseDTO>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      setIsLoading(true);
      const res = await OpportunitieService.getOpportunityById(Number(id));
      if (res.data) setOpportunity(res.data);
      setIsLoading(false);
    };
    fetch();
  }, [id]);

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-slate-200 border-t-slate-900 rounded-full animate-spin" />
          <p className="text-sm text-slate-500 font-medium">
            Loading opportunity...
          </p>
        </div>
      </div>
    );
  }

  if (!opportunity) return <NotFound navigate={navigate} />;

  const o = opportunity;

  // price range label
  const priceRange =
    o.priceFrom != null && o.priceTo != null
      ? `${fmtMoney(o.priceFrom)} – ${fmtMoney(o.priceTo)}`
      : o.priceFrom != null
        ? `From ${fmtMoney(o.priceFrom)}`
        : o.priceTo != null
          ? `Up to ${fmtMoney(o.priceTo)}`
          : "—";

  return (
    <div className="mx-auto pb-20 space-y-6 mt-4">
      {/* ── HEADER ── */}
      <div className="flex items-start justify-between gap-4">
        <button
          onClick={() => navigate(-1)}
          className="group flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back
        </button>

        <div className="flex items-center gap-2 flex-wrap justify-end">
          {o.salesStage && (
            <OpportunityBadge value={o.salesStage} map={SALES_STAGE_STYLES} />
          )}
          {o.businessType && (
            <span
              className={`text-[11px] font-black uppercase tracking-wider px-3 py-1 rounded-full ${BUSINESS_TYPE_STYLES[o.businessType?.toLowerCase()] ?? "bg-slate-200 text-slate-700"}`}
            >
              {o.businessType}
            </span>
          )}
        </div>
      </div>

      {/* ── HERO BANNER ── */}
      <div className="relative rounded-2xl border border-slate-700 bg-slate-800 px-8 py-7 shadow-sm">
        {/* subtle top highlight */}
        <div className="absolute inset-x-0 top-0 h-px bg-white/10" />

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          {/* LEFT */}
          <div className="space-y-2">
            <p className="text-[11px] font-semibold uppercase tracking-widest text-slate-400">
              Opportunity
            </p>

            <h1 className="text-3xl font-semibold text-white leading-tight">
              {o.title ?? "—"}
            </h1>

            <div className="flex items-center gap-2 text-slate-400 text-sm">
              <MapPin className="w-4 h-4 opacity-70" />
              <span>
                {[o.cityName, o.divisionName, o.zoneName, o.country]
                  .filter(Boolean)
                  .join(" · ") || "Location not specified"}
              </span>
            </div>
          </div>

          {/* RIGHT */}
          <div className="shrink-0 md:text-right">
            <p className="text-[11px] font-semibold uppercase tracking-widest text-slate-500 mb-1">
              Deal Amount
            </p>

            <p className="text-4xl font-semibold text-white tabular-nums">
              {fmtMoney(o.amount)}
            </p>

            {o.paymentType && (
              <p className="text-xs text-slate-400 mt-1 uppercase tracking-wide">
                {fmt(o.paymentType)}
              </p>
            )}
          </div>
        </div>
      </div>
      {/* ── METRIC TILES ── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <OpportunityMetricTitle
          label="Price Range"
          value={<span className="text-lg">{priceRange}</span>}
          color="bg-blue-50 text-blue-900"
        />
        <OpportunityMetricTitle
          label="Expected Close Date"
          value={
            <span className="text-lg">{fmtDate(o.expectedCloseDate)}</span>
          }
          color="bg-amber-50 text-amber-900"
        />
        <OpportunityMetricTitle
          label="Property Type"
          value={
            <span className="text-lg capitalize">{o.propertyType ?? "—"}</span>
          }
          color="bg-emerald-50 text-emerald-900"
        />
      </div>

      {/* ── BODY GRID ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* LEFT — 2 cols */}
        <div className="lg:col-span-2 space-y-6">
          {/* Opportunity Info */}
          <OpportunityCard
            icon={<Target className="w-4 h-4" />}
            title="Opportunity Details"
            accent="bg-violet-50 text-violet-700"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
              <div>
                <OpportunityRow label="Sales Stage">
                  <OpportunityBadge
                    value={o.salesStage}
                    map={SALES_STAGE_STYLES}
                  />
                </OpportunityRow>
                <OpportunityRow label="Business Type">
                  <OpportunityBadge
                    value={o.businessType}
                    map={BUSINESS_TYPE_STYLES}
                    fallback="bg-slate-100 text-slate-600 border-slate-200"
                  />
                </OpportunityRow>
                <OpportunityRow label="Availability">
                  <OpportunityBadge
                    value={o.availability}
                    map={AVAILABILITY_STYLES}
                  />
                </OpportunityRow>
                <OpportunityRow label="Payment Type">
                  <OpportunityBadge
                    value={o.paymentType}
                    map={PAYMENT_TYPE_STYLES}
                  />{" "}
                </OpportunityRow>
                <OpportunityRow label="Rental Time">
                  {o.rentalTime}
                </OpportunityRow>
              </div>
              <div>
                <OpportunityRow label="Main Lead Source">
                  {fmt(o.mainLeadSource)}
                </OpportunityRow>
                <OpportunityRow label="Lead Source">
                  {renderLeadSource(fmt(o.leadSource))}
                </OpportunityRow>
                <OpportunityRow label="Expected Close">
                  {fmtDate(o.expectedCloseDate)}
                </OpportunityRow>
                <OpportunityRow label="Documentation">
                  {o.documentation ? (
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wide border ${
                        o.documentation === "yes"
                          ? "bg-emerald-100 text-emerald-700 border-emerald-200"
                          : o.documentation === "no"
                            ? "bg-rose-100 text-rose-700 border-rose-200"
                            : "bg-amber-100 text-amber-700 border-amber-200"
                      }`}
                    >
                      {fmt(o.documentation)}
                    </span>
                  ) : (
                    "—"
                  )}
                </OpportunityRow>
                <OpportunityRow label="Elevator">
                  {o.elevator === true ? (
                    <span className="flex items-center gap-1 text-emerald-600 text-xs font-bold">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Yes
                    </span>
                  ) : o.elevator === false ? (
                    <span className="flex items-center gap-1 text-slate-400 text-xs font-bold">
                      <XCircle className="w-3.5 h-3.5" /> No
                    </span>
                  ) : (
                    "—"
                  )}
                </OpportunityRow>
              </div>
            </div>
          </OpportunityCard>

          {/* Property Filters */}
          <OpportunityCard
            icon={<Home className="w-4 h-4" />}
            title="Property Details"
            accent="bg-emerald-50 text-emerald-700"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
              <div>
                <OpportunityRow label="Price From">
                  {fmtMoney(o.priceFrom)}
                </OpportunityRow>
                <OpportunityRow label="Price To">
                  {fmtMoney(o.priceTo)}
                </OpportunityRow>
                <OpportunityRow label="Property Type">
                  {o.propertyType ? (
                    <span className="text-[11px] font-bold uppercase px-2 py-0.5 rounded border bg-blue-50 text-blue-700 border-blue-100">
                      {fmt(o.propertyType)}
                    </span>
                  ) : (
                    "—"
                  )}
                </OpportunityRow>
              </div>
              <div>
                <OpportunityRow label="Furnished">
                  {fmt(o.furnished)}
                </OpportunityRow>
                <OpportunityRow label="Floor">{o.floor ?? "—"}</OpportunityRow>
                <OpportunityRow label="Availability">
                  <OpportunityBadge
                    value={o.availability}
                    map={AVAILABILITY_STYLES}
                  />
                </OpportunityRow>
              </div>
            </div>
          </OpportunityCard>

          {/* Description */}
          <OpportunityCard
            icon={<Info className="w-4 h-4" />}
            title="Description"
            accent="bg-blue-50 text-blue-700"
          >
            <p className="text-slate-600 leading-relaxed text-sm italic border-l-4 border-slate-100 pl-4">
              "{o.description || "No description provided."}"
            </p>
          </OpportunityCard>

          {/* More Features */}
          <OpportunityCard
            icon={<Layers className="w-4 h-4" />}
            title="More Features"
            accent="bg-indigo-50 text-indigo-700"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">
                  View To
                </p>
                <OpportunityTagCloud
                  values={parseList(o.withViewTo)}
                  color="bg-blue-50 text-blue-700 border-blue-100"
                />
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">
                  Equipment
                </p>
                <OpportunityTagCloud
                  values={parseList(o.equipment)}
                  color="bg-emerald-50 text-emerald-700 border-emerald-100"
                />
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">
                  Infrastructures
                </p>
                <OpportunityTagCloud
                  values={parseList(o.infrastructures)}
                  color="bg-amber-50 text-amber-700 border-amber-100"
                />
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">
                  Surroundings
                </p>
                <OpportunityTagCloud
                  values={parseList(o.surroundings)}
                  color="bg-indigo-50 text-indigo-700 border-indigo-100"
                />
              </div>
            </div>
          </OpportunityCard>
        </div>

        {/* RIGHT SIDEBAR */}
        <div className="space-y-6">
          {/* People */}
          <OpportunityCard
            icon={<User className="w-4 h-4" />}
            title="Contact & Agent"
            accent="bg-rose-50 text-rose-600"
          >
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50">
                <div className="w-9 h-9 rounded-full bg-slate-200 flex items-center justify-center shrink-0">
                  <User className="w-4 h-4 text-slate-500" />
                </div>
                <div>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wide">
                    Property Owner
                  </p>
                  <p className="text-sm font-bold text-slate-800">
                    {o.propertyOwnerName ?? "—"}
                  </p>
                </div>
              </div>
              {user?.role == ERoles.Admin.toString() && (
                <div className="flex items-center gap-3 p-3 rounded-xl bg-blue-50">
                  <div className="w-9 h-9 rounded-full bg-blue-200 flex items-center justify-center shrink-0">
                    <Zap className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-[10px] text-blue-400 font-bold uppercase tracking-wide">
                      Assigned Agent
                    </p>

                    <p className="text-sm font-bold text-blue-900">
                      {o.agentName ?? "—"}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </OpportunityCard>

          {/* Location */}
          <OpportunityCard
            icon={<MapPin className="w-4 h-4" />}
            title="Location"
            accent="bg-red-50 text-red-500"
          >
            <OpportunityRow label="Country">
              <span className="capitalize">
                {" "}
                <CountryFlag code={o.country ?? "-"} />
              </span>
            </OpportunityRow>
            <OpportunityRow label="Division">
              {o.divisionName ?? "—"}
            </OpportunityRow>
            <OpportunityRow label="City">{o.cityName ?? "—"}</OpportunityRow>
            <OpportunityRow label="Zone">{o.zoneName ?? "—"}</OpportunityRow>
          </OpportunityCard>
        </div>
      </div>
    </div>
  );
};

export default OpportunityDetails;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function NotFound({ navigate }: any) {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-xl font-bold text-slate-900">
          Opportunity not found
        </h1>
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
