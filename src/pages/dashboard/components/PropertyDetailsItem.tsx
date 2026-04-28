import { ReactNode } from "react";
import { AVAILABILITY_STYLES, TYPE_COLORS } from "../../../utils/styles";
import { CheckCircle2, XCircle } from "lucide-react";
import { FURNISHED_ICONS, ORIENTATION_ICONS } from "../helpers";
import CountryFlag from "../../../components/flags/CountryFlag";

export interface PropertyDetailsItemProps {
  label: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value?: any;
  isBoolean?: boolean;
  isYesNo?: boolean;
  capitalize?: boolean;
  highlight?: boolean;
}

const PropertyDetailsItem = ({
  label,
  value,
  isBoolean,
  isYesNo,
  capitalize,
  highlight,
}: PropertyDetailsItemProps) => {
  if (value == null)
    return (
      <div className="flex justify-between items-center py-1 border-b border-slate-50 last:border-0">
        <span className="text-slate-500 text-xs font-medium">{label}</span>
        <span className="text-slate-300">—</span>
      </div>
    );

  let displayValue: ReactNode = value;
  const lowerValue = String(value).toLowerCase();

  if (label.toLowerCase() === "country") {
    displayValue = (
      <span className="flex items-center gap-2">
        <span>
          <CountryFlag code={lowerValue} />
        </span>
        <span className="capitalize">{value}</span>
      </span>
    );
  } else if (label.toLowerCase() === "furnished") {
    displayValue = (
      <span className="flex items-center gap-2">
        <span>{FURNISHED_ICONS[lowerValue] || "🏠"}</span>
        <span className="capitalize">{String(value).replace(/_/g, " ")}</span>
      </span>
    );
  } else if (label.toLowerCase().includes("orientation")) {
    displayValue = (
      <span className="flex items-center gap-2">
        <span className="text-blue-500 font-bold">
          {ORIENTATION_ICONS[lowerValue] || "🧭"}
        </span>
        <span className="capitalize">{String(value).replace(/_/g, " ")}</span>
      </span>
    );
  } else if (label.toLowerCase().includes("type")) {
    const colorClass =
      TYPE_COLORS[lowerValue] || "bg-slate-50 text-slate-600 border-slate-100";

    displayValue = (
      <span
        className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded border ${colorClass}`}
      >
        {String(value).replace(/_/g, " ")}
      </span>
    );
  } else if (label.toLowerCase() === "availability") {
    displayValue = (
      <span
        className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded border ${
          AVAILABILITY_STYLES[lowerValue] || "bg-slate-50 border-slate-200"
        }`}
      >
        {String(value).replace(/_/g, " ")}
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
        className={`font-semibold text-slate-900 ${
          capitalize ? "capitalize" : ""
        } ${highlight ? "text-blue-600" : ""}`}
      >
        {displayValue}
      </span>
    </div>
  );
};

export default PropertyDetailsItem;
