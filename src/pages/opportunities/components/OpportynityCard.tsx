import { ReactNode } from "react";

export interface OpportunityCardProps {
  icon: ReactNode;
  title: string;
  accent: string;
  children: ReactNode;
}

const OpportunityCard = ({
  icon,
  title,
  accent,
  children,
}: OpportunityCardProps) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
      <div className={`flex items-center gap-2.5 px-5 py-3.5 ${accent}`}>
        {icon}
        <h3 className="text-xs font-black uppercase tracking-widest text-current opacity-80">
          {title}
        </h3>
      </div>

      <div className="px-5 py-4">{children}</div>
    </div>
  );
};

export default OpportunityCard;
