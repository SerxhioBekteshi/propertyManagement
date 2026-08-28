import * as React from "react";
import { Check, ChevronDown, Search, X } from "lucide-react";
import { IOption } from "../../types";

export function SingleSelect<T extends string | number>({
  options,
  value,
  onChange,
  placeholder = "-- Select option --",
  loading = false,
  disabled,
  error,
}: {
  options: IOption<T>[];
  value?: T | null;
  onChange: (val: T | null) => void;
  placeholder?: string;
  loading?: boolean;
  disabled?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error?: any;
}) {
  const [open, setOpen] = React.useState(false);
  const [search, setSearch] = React.useState("");
  const containerRef = React.useRef<HTMLDivElement>(null);
  const searchRef = React.useRef<HTMLInputElement>(null);

  const hasValue = value !== undefined && value !== null && value !== "";
  const selected = options.find((o) => String(o.value) === String(value));

  const filtered = options
    .filter((o) => o.value !== undefined && o.value !== null && o.value !== "")
    .filter((o) => o.label.toLowerCase().includes(search.toLowerCase()));

  React.useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) {
        setOpen(false);
        setSearch("");
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  React.useEffect(() => {
    if (open) {
      setTimeout(() => searchRef.current?.focus(), 0);
    } else {
      setSearch("");
    }
  }, [open]);

  return (
    <div ref={containerRef} className="relative w-full">
      <button
        type="button"
        disabled={disabled || loading}
        onClick={() => !(disabled || loading) && setOpen((o) => !o)}
        className={`w-full px-3 py-2.5 text-sm bg-slate-50 border rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-all flex justify-between items-center text-left
          ${loading ? "opacity-60 cursor-not-allowed" : ""}
          ${!hasValue ? "text-slate-400" : "text-slate-900"}
          ${error ? "border-red-500 focus:ring-red-500" : "border-slate-200"}
        `}
      >
        <span className="truncate">
          {loading ? "Loading..." : (selected?.label ?? placeholder)}
        </span>
        <div className="flex items-center gap-1">
          {hasValue && !disabled && !loading && (
            <span
              role="button"
              aria-label="Clear selected value"
              className="p-0.5 rounded text-slate-400 hover:text-slate-600 hover:bg-slate-100"
              onPointerDown={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onChange(null);
              }}
            >
              <X className="w-3.5 h-3.5" />
            </span>
          )}
          <ChevronDown
            className={`w-4 h-4 text-slate-400 transition-transform ${
              open ? "rotate-180" : ""
            }`}
          />
        </div>
      </button>

      {open && (
        <div className="absolute z-[9999] mt-1 w-full bg-white border border-slate-200 rounded-xl shadow-lg overflow-hidden">
          <div className="px-2 pt-2 pb-1 border-b border-slate-100">
            <div className="flex items-center gap-2 px-2 py-1.5 bg-slate-50 rounded-lg">
              <Search className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <input
                ref={searchRef}
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search..."
                className="flex-1 text-sm bg-transparent outline-none text-slate-700 placeholder:text-slate-400"
              />
            </div>
          </div>
          <ul className="max-h-48 overflow-y-auto py-1">
            <li
              onMouseDown={() => {
                onChange(null);
                setOpen(false);
              }}
              className="px-3 py-2 text-sm cursor-pointer hover:bg-slate-50 text-slate-400 italic"
            >
              — {placeholder} —
            </li>
            {filtered.length === 0 ? (
              <li className="px-3 py-2 text-sm text-slate-400">No results</li>
            ) : (
              filtered.map((o, i) => (
                <li
                  key={i}
                  onMouseDown={() => {
                    onChange(o.value);
                    setOpen(false);
                  }}
                  className={`px-3 py-2 text-sm cursor-pointer hover:bg-slate-50 flex items-center justify-between ${
                    String(o.value) === String(value)
                      ? "text-slate-900 font-medium bg-slate-50"
                      : "text-slate-700"
                  }`}
                >
                  <span>{o.label}</span>
                  {String(o.value) === String(value) && (
                    <Check className="w-3.5 h-3.5 text-slate-900" />
                  )}
                </li>
              ))
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
