/* eslint-disable @typescript-eslint/no-explicit-any */

const inputClass =
  "w-full px-3 py-2.5 text-sm text-slate-900 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent placeholder-slate-400 transition-all";

const BooleanSelect = ({
  field,
  options,
}: {
  field: any;
  options: { value: any; label: string }[];
}) => (
  <select
    {...field}
    value={field.value === undefined ? "" : String(field.value)}
    onChange={(e) =>
      field.onChange(
        e.target.value === "" ? undefined : e.target.value === "true",
      )
    }
    className={inputClass}
  >
    {options.map((v, i) => (
      <option key={i} value={v.value}>
        {v.label}
      </option>
    ))}
  </select>
);

export default BooleanSelect;
