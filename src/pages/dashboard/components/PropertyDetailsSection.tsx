import { ReactNode } from "react";

export interface PropertyDetailsSectionProps {
  title: string;
  icon?: ReactNode;
  children: ReactNode;
}

const PropertyDetailsSection = ({
  title,
  icon,
  children,
}: PropertyDetailsSectionProps) => {
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
};

export default PropertyDetailsSection;
