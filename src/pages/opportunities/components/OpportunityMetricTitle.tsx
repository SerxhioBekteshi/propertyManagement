import { ReactNode } from "react";

export interface OpportunityMetricTitleProps {
  label: string;
  value: ReactNode;
  sub?: string;
  color: string;
}

const OpportunityMetricTitle = ({
  label,
  value,
  sub,
  color,
}: OpportunityMetricTitleProps) => {
  return (
    <div className={`rounded-2xl p-4 ${color} flex flex-col gap-1`}>
      <p className="text-[10px] font-black uppercase tracking-widest opacity-60">
        {label}
      </p>

      <p className="text-2xl font-black leading-none">{value}</p>

      {sub && (
        <p className="text-[10px] opacity-60 font-medium mt-0.5">{sub}</p>
      )}
    </div>
  );
};

export default OpportunityMetricTitle;
