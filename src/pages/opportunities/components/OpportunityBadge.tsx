import { fmt } from "../helpers";

export interface BadgeProps {
  value?: string | null;
  map: Record<string, string>;
  fallback?: string;
}

const Badge = ({
  value,
  map,
  fallback = "bg-slate-100 text-slate-500 border-slate-200",
}: BadgeProps) => {
  if (!value) return <span className="text-slate-300 text-sm">—</span>;

  const cls = map[value] ?? fallback;

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wide border ${cls}`}
    >
      {fmt(value)}
    </span>
  );
};

export default Badge;
