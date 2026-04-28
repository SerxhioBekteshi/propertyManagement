import { ReactNode } from "react";

export interface OpportunityRowProps {
  label: string;
  children: ReactNode;
}

const OpportunityRow = ({ label, children }: OpportunityRowProps) => {
  return (
    <div className="flex items-center justify-between py-2.5 border-b border-slate-50 last:border-0 gap-4">
      <span className="text-xs font-medium text-slate-400 shrink-0">
        {label}
      </span>

      <span className="text-sm font-semibold text-slate-800 text-right">
        {children}
      </span>
    </div>
  );
};

export default OpportunityRow;
