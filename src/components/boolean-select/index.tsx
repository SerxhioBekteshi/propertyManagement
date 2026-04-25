/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useRef, useEffect } from "react";

const baseClass =
  "w-full px-3 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-all";

const BooleanSelect = ({
  field,
  options,
  placeholder = "Select...",
  disabled,
}: {
  field: any;
  options: { value: any; label: string }[];
  placeholder?: string;
  disabled?: boolean;
}) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const selected = options.find((o) => o.value === field.value);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} className="relative w-full">
      {/* Trigger */}
      <button
        type="button"
        disabled={disabled}
        onClick={() => !disabled && setOpen((p) => !p)}
        className={`${baseClass} text-left flex justify-between items-center ${
          disabled ? "opacity-60 cursor-not-allowed" : ""
        } ${selected ? "text-slate-900" : "text-slate-400"}`}
      >
        <span className="truncate">{selected?.label ?? placeholder}</span>

        <svg
          className={`w-4 h-4 text-slate-400 transition-transform ${
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
          <ul className="py-1">
            {options.length === 0 ? (
              <li className="px-3 py-2 text-sm text-slate-400">No options</li>
            ) : (
              options.map((o, i) => (
                <li
                  key={i}
                  onMouseDown={() => {
                    field.onChange(o.value);
                    setOpen(false);
                  }}
                  className={`px-3 py-2 text-sm cursor-pointer hover:bg-slate-50 ${
                    o.value === field.value
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
};

export default BooleanSelect;
