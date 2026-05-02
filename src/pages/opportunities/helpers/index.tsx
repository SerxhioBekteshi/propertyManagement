import { User } from "lucide-react";
import {
  Globe,
  Instagram,
  Facebook,
  Phone,
  Megaphone,
  HelpCircle,
  Mail,
} from "lucide-react";
import { formatDate } from "../../../utils";
import { ColumnConfig } from "../../../components/table";
import {
  AVAILABILITY_STYLES,
  BUSINESS_TYPE_STYLES,
  PAYMENT_TYPE_STYLES,
  SALES_STAGE_STYLES,
} from "../../../utils/styles";
import OpportunityBadge from "../components/OpportunityBadge";
import CountryFlag from "../../../components/flags/CountryFlag";
import { OpportunitiesFiltersDTO } from "../../../types/opportunities";
import { LookupFilterOperation } from "../../../assets/enums";
import { FilterMapping } from "../../../types/database";

export const columns: ColumnConfig[] = [
  { key: "title", header: "Title" },
  {
    key: "amount",
    header: "Amount (€)",
    render: (val: number) => val?.toLocaleString(),
  },
  {
    key: "propertyOwnerName",
    header: "Property Owner",
  },
  { key: "agentName", header: "Agent" },
  {
    key: "salesStage",
    header: "Sales Stage",
    render: (val: string) => (
      <span
        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wide border ${
          SALES_STAGE_STYLES[val] ??
          "bg-slate-100 text-slate-600 border-slate-200"
        }`}
      >
        {val?.replace(/_/g, " ") ?? "—"}
      </span>
    ),
  },
  {
    key: "country",
    header: "Country",
    render: (val: string) => <CountryFlag code={val} />,
  },
  {
    key: "priceFrom",
    header: "Price From",
    render: (val: number) => val?.toLocaleString(),
  },
  {
    key: "priceTo",
    header: "Price To",
    render: (val: number) => val?.toLocaleString(),
  },

  {
    key: "businessType",
    header: "Business Type",
    render: (val: string) => (
      <span
        className={`text-[11px] font-black uppercase tracking-wider px-3 py-1 rounded-full ${
          BUSINESS_TYPE_STYLES[val] ?? "bg-slate-200 text-slate-700"
        }`}
      >
        {val ?? "—"}
      </span>
    ),
  },
  {
    key: "availability",
    header: "Availability",
    render: (val: string) => (
      <span
        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wide border ${
          AVAILABILITY_STYLES[val] ??
          "bg-slate-100 text-slate-600 border-slate-200"
        }`}
      >
        {val?.replace(/_/g, " ") ?? "—"}
      </span>
    ),
  },
  {
    key: "paymentType",
    header: "Payment Type",
    render: (val: string) => (
      <OpportunityBadge value={val} map={PAYMENT_TYPE_STYLES} />
    ),
  },
  { key: "mainLeadSource", header: "Main Lead Source" },
  {
    key: "leadSource",
    header: "Lead Source",
    render: (val: string) => renderLeadSource(val),
  },
  {
    key: "expectedCloseDate",
    header: "Expected Close Date",
    render: (val: string) => formatDate(val),
  },
  {
    key: "createdDateTime",
    header: "Created At",
    render: (val: string) => formatDate(val),
  },
  { key: "createdBy", header: "Created By" },
  {
    key: "modifiedDateTime",
    header: "Modified At",
    render: (val: string) => formatDate(val),
  },
  { key: "modifiedBy", header: "Modified By" },
];

export const LEAD_SOURCE_CONFIG: Record<
  string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  { label: string; icon: any; className: string }
> = {
  Google: {
    label: "Google",
    icon: Globe,
    className: "bg-blue-50 text-blue-700 border-blue-200",
  },
  Instagram: {
    label: "Instagram",
    icon: Instagram,
    className: "bg-pink-50 text-pink-600 border-pink-200",
  },
  Linkedn: {
    label: "LinkedIn",
    icon: Globe,
    className: "bg-sky-50 text-sky-700 border-sky-200",
  },
  Facebook: {
    label: "Facebook",
    icon: Facebook,
    className: "bg-indigo-50 text-indigo-700 border-indigo-200",
  },
  "Tik-Tok": {
    label: "TikTok",
    icon: Megaphone,
    className: "bg-black text-white border-black",
  },

  Website: {
    label: "Website",
    icon: Globe,
    className: "bg-emerald-50 text-emerald-700 border-emerald-200",
  },

  "Phone Call": {
    label: "Phone Call",
    icon: Phone,
    className: "bg-amber-50 text-amber-700 border-amber-200",
  },

  Broker: {
    label: "Broker",
    icon: User,
    className: "bg-purple-50 text-purple-700 border-purple-200",
  },

  "Co-Broker": {
    label: "Co-Broker",
    icon: User,
    className: "bg-purple-100 text-purple-800 border-purple-200",
  },

  "Direct Mail": {
    label: "Direct Mail",
    icon: Mail,
    className: "bg-orange-50 text-orange-700 border-orange-200",
  },

  "Sign/Sticker": {
    label: "Sign/Sticker",
    icon: Megaphone,
    className: "bg-yellow-50 text-yellow-700 border-yellow-200",
  },

  "Existing Customer": {
    label: "Existing Customer",
    icon: User,
    className: "bg-green-50 text-green-700 border-green-200",
  },

  Other: {
    label: "Other",
    icon: HelpCircle,
    className: "bg-slate-100 text-slate-600 border-slate-200",
  },
};

export const fmt = (v?: string) => v?.replace(/_/g, " ") ?? "—";

export const fmtDate = (v?: string | null) => {
  if (!v) return "—";
  return new Date(v).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

export const fmtMoney = (v?: number | null, suffix = "") =>
  v != null ? `€${v.toLocaleString()}${suffix}` : "—";

export const parseList = (val?: string) =>
  val
    ? val
        .split(",")
        .map((v) => v.trim())
        .filter(Boolean)
    : [];

export const renderLeadSource = (value?: string) => {
  const config = value ? LEAD_SOURCE_CONFIG[value] : null;

  const Icon = config?.icon ?? HelpCircle;

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wide border ${
        config?.className ?? "bg-slate-100 text-slate-600 border-slate-200"
      }`}
    >
      <Icon className="w-3.5 h-3.5" />
      {config?.label ?? value?.replace(/_/g, " ") ?? "—"}
    </span>
  );
};

export const INITIAL_FILTERS: OpportunitiesFiltersDTO = {
  orderBy: "newest",
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const filterMappings: FilterMapping<any>[] = [
  {
    key: "businessType",
    column: "businessType",
    operation: LookupFilterOperation.Equals,
  },
  {
    key: "propertyType",
    column: "propertyType",
    operation: LookupFilterOperation.Equals,
  },
  {
    key: "priceFrom",
    column: "priceFrom",
    operation: LookupFilterOperation.MoreOrEquals,
  },
  {
    key: "priceTo",
    column: "priceTo",
    operation: LookupFilterOperation.LessOrEquals,
  },
  {
    key: "bedroomsFrom",
    column: "bedroomsFrom",
    operation: LookupFilterOperation.Equals,
  },
  {
    key: "cityId",
    column: "cityId",
    operation: LookupFilterOperation.Equals,
  },
  {
    key: "zoneId",
    column: "zoneId",
    operation: LookupFilterOperation.Equals,
  },
  {
    key: "salesStage",
    column: "salesStage",
    operation: LookupFilterOperation.Equals,
  },
];
