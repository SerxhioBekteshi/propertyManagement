"use client";

import * as React from "react";
import { Search } from "lucide-react";
import { IOption } from "../../types";

type MultiSelectProps = {
  options: IOption<string>[];
  value?: string[];
  onChange: (val: string[]) => void;
  placeholder?: string;
};

export function MultiSelect({
  options,
  value = [],
  onChange,
  placeholder = "Select...",
}: MultiSelectProps) {
  const [open, setOpen] = React.useState(false);
  const [search, setSearch] = React.useState("");
  const searchRef = React.useRef<HTMLInputElement>(null);
  const containerRef = React.useRef<HTMLDivElement>(null);

  const toggle = (val: string) => {
    if (value.includes(val)) {
      onChange(value.filter((v) => v !== val));
    } else {
      onChange([...value, val]);
    }
  };

  const remove = (val: string) => {
    onChange(value.filter((v) => v !== val));
  };

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
    <div ref={containerRef} className="relative">
      {/* Trigger */}
      <div
        onClick={() => setOpen((o) => !o)}
        className="w-full min-h-[40px] border rounded-xl px-3 py-2 bg-slate-50 cursor-pointer flex flex-wrap gap-2"
      >
        {value.length === 0 && (
          <span className="text-slate-400 text-sm">{placeholder}</span>
        )}

        {value.map((v) => {
          const opt = options.find((o) => o.value === v);
          return (
            <span
              key={v}
              className="flex items-center gap-1 px-2 py-1 bg-slate-200 rounded-md text-sm"
            >
              {opt?.label}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  remove(v);
                }}
                className="text-slate-500 hover:text-red-500"
              >
                ×
              </button>
            </span>
          );
        })}
      </div>

      {open && (
        <div className="absolute z-50 mt-1 w-full border bg-white rounded-xl shadow overflow-hidden">
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
          <div className="max-h-52 overflow-y-auto py-1">
            {options
              .filter((o) => o.value)
              .filter((o) =>
                o.label.toLowerCase().includes(search.toLowerCase()),
              )
              .map((opt) => (
                <div
                  key={opt.value}
                  onClick={() => toggle(opt.value)}
                  className={`px-3 py-2 cursor-pointer text-sm hover:bg-slate-100 flex justify-between items-center ${
                    value.includes(opt.value) ? "bg-slate-100" : ""
                  }`}
                >
                  <span>{opt.label}</span>
                  {value.includes(opt.value) && (
                    <span className="text-slate-900 text-xs font-bold">✓</span>
                  )}
                </div>
              ))}
            {options.filter((o) =>
              o.label.toLowerCase().includes(search.toLowerCase()),
            ).length === 0 && (
              <div className="px-3 py-2 text-sm text-slate-400">No results</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
