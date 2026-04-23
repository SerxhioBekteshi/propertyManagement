import { useState, useRef, useEffect } from "react";
import { IOption } from "../../types";

const baseClass =
  "w-full px-3 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-all";

export function SingleSelect<T>({
  options,
  value,
  onChange,
  placeholder = "Select...",
  loading = false, // ✅ NEW
  disabled,
}: {
  options: IOption<T>[];
  value?: T;
  onChange: (val: T) => void;
  placeholder?: string;
  loading?: boolean; // ✅ NEW
  disabled?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  const selected = options.find((o) => o.value === value);

  const filtered = options.filter((o) =>
    o.label.toLowerCase().includes(search.toLowerCase()),
  );

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) {
        setOpen(false);
        setSearch("");
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  useEffect(() => {
    if (open && !loading) searchRef.current?.focus();
  }, [open, loading]);

  return (
    <div ref={containerRef} className="relative w-full">
      {/* Trigger */}
      <button
        type="button"
        disabled={loading} // ✅ disable while loading
        onClick={() => !loading && setOpen((p) => !p)}
        className={`${baseClass} text-left flex justify-between items-center ${
          loading ? "opacity-60 cursor-not-allowed" : ""
        } ${!selected ? "text-slate-400" : "text-slate-900"}`}
      >
        <span className="truncate">
          {loading ? "Loading..." : (selected?.label ?? placeholder)}
        </span>

        <svg
          className={`w-4 h-4 text-slate-400 shrink-0 transition-transform ${
            open ? "rotate-180" : ""
          }`}
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M5.23 7.21a.75.75 0 011.06.02L10 11.17l3.71-3.94a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute z-50 mt-1 w-full bg-white border border-slate-200 rounded-xl shadow-md overflow-hidden">
          {/* Search */}
          <div className="p-2 border-b border-slate-100">
            <input
              ref={searchRef}
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search..."
              disabled={disabled || loading}
              className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900"
            />
          </div>

          {/* Options */}
          <ul className="max-h-52 overflow-y-auto py-1">
            {loading ? (
              <li className="px-3 py-2 text-sm text-slate-400">Loading...</li>
            ) : filtered.length === 0 ? (
              <li className="px-3 py-2 text-sm text-slate-400">No results</li>
            ) : (
              filtered.map((o, index) => (
                <li
                  key={index}
                  onMouseDown={() => {
                    onChange(o.value);
                    setOpen(false);
                    setSearch("");
                  }}
                  className={`px-3 py-2 text-sm cursor-pointer hover:bg-slate-50 ${
                    o.value === value
                      ? "text-slate-900 font-medium bg-slate-50"
                      : "text-slate-700"
                  }`}
                >
                  {o.label}
                </li>
              ))
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
