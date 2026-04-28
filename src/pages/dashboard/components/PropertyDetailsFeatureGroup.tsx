export type FeatureGroupColor = "blue" | "emerald" | "amber" | "indigo";

export interface PropertyDetailsFeatureGroupProps {
  label: string;
  values: string[];
  color: FeatureGroupColor;
}
const colorMap: Record<FeatureGroupColor, string> = {
  blue: "bg-blue-50 text-blue-700 border-blue-100",
  emerald: "bg-emerald-50 text-emerald-700 border-emerald-100",
  amber: "bg-amber-50 text-amber-700 border-amber-100",
  indigo: "bg-indigo-50 text-indigo-700 border-indigo-100",
};

const PropertyDetailsFeatureGroup = ({
  label,
  values,
  color,
}: PropertyDetailsFeatureGroupProps) => {
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
};

export default PropertyDetailsFeatureGroup;
