import { IOption } from "../../types";

export function SingleSelect({
  options,
  value,
  onChange,
}: {
  options: IOption<string>[];
  value?: string;
  onChange: (val: string) => void;
}) {
  return (
    <select
      value={value || ""}
      onChange={(e) => onChange(e.target.value)}
      className="w-full px-3 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl"
    >
      {options.map((o) => (
        <option key={o.value} value={o.value}>
          {o.label}
        </option>
      ))}
    </select>
  );
}
