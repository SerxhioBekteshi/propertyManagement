import { ImgHTMLAttributes } from "react";

interface CountryFlagProps extends ImgHTMLAttributes<HTMLImageElement> {
  code?: string | null;
}

const CountryFlag = ({ code, className, ...rest }: CountryFlagProps) => {
  if (!code) return <span className="text-slate-300 text-xs">—</span>;

  const src = `/images/flags/${code.toLowerCase()}.jpg`;

  return (
    <img
      src={src}
      alt={code}
      className={`w-8 h-6 object-cover rounded-sm border border-slate-200 ${className ?? ""}`}
      onError={(e) => {
        (e.currentTarget as HTMLImageElement).style.display = "none";
      }}
      {...rest}
    />
  );
};

export default CountryFlag;
