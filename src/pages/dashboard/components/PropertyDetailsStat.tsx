import { ReactNode } from "react";

export type StatColor = "blue" | "emerald" | "indigo" | "slate";

export interface PropertyDetailsStatProps {
  icon?: ReactNode;
  label: string;
  value: ReactNode;
  color: StatColor;
}

const colorMap: Record<StatColor, string> = {
  blue: "bg-blue-50 text-blue-600",
  emerald: "bg-emerald-50 text-emerald-600",
  indigo: "bg-indigo-50 text-indigo-600",
  slate: "bg-slate-50 text-slate-600",
};

const PropertyDetailsStat = ({
  icon,
  label,
  value,
  color,
}: PropertyDetailsStatProps) => {
  return (
    <div
      className={`p-4 rounded-2xl ${colorMap[color]} flex flex-col items-center text-center gap-1`}
    >
      {icon}

      <p className="text-[10px] font-bold uppercase opacity-70 tracking-tighter">
        {label}
      </p>

      <p className="text-lg font-black">{value}</p>
    </div>
  );
};

export default PropertyDetailsStat;
