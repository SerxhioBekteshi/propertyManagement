"use client";

import * as React from "react";
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

  return (
    <div className="relative">
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

      {/* Dropdown */}
      {open && (
        <div className="absolute z-50 mt-1 w-full max-h-60 overflow-auto border bg-white rounded-xl shadow">
          {options
            .filter((o) => o.value) // remove default ""
            .map((opt) => (
              <div
                key={opt.value}
                onClick={() => toggle(opt.value)}
                className={`px-3 py-2 cursor-pointer text-sm hover:bg-slate-100 flex justify-between ${
                  value.includes(opt.value) ? "bg-slate-100" : ""
                }`}
              >
                {opt.label}
                {value.includes(opt.value) && "✓"}
              </div>
            ))}
        </div>
      )}
    </div>
  );
}
