import * as Select from "@radix-ui/react-select";
import { Check, ChevronDown, X } from "lucide-react";
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
  const hasValue = value !== undefined && value !== null && value !== "";

  return (
    <Select.Root
      value={value !== undefined && value !== null ? String(value) : ""}
      onValueChange={(val) => {
        if (val === "__clear__") {
          onChange(null);
          return;
        }
        const original = options.find((o) => String(o.value) === val);
        if (original) onChange(original.value);
      }}
      disabled={disabled || loading}
    >
      <Select.Trigger
        className={`w-full px-3 py-2.5 text-sm bg-slate-50 border rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-all flex justify-between items-center
          ${loading ? "opacity-60 cursor-not-allowed" : ""}
          ${!hasValue ? "text-slate-400" : "text-slate-900"}
          ${error ? "border-red-500 focus:ring-red-500" : "border-slate-200"}
        `}
      >
        <Select.Value placeholder={loading ? "Loading..." : placeholder} />
        <div className="flex items-center gap-1">
          {hasValue && !disabled && !loading && (
            <button
              type="button"
              aria-label="Clear selected value"
              className="p-0.5 rounded text-slate-400 hover:text-slate-600 hover:bg-slate-100"
              onPointerDown={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onChange(null);
              }}
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
          <Select.Icon>
            <ChevronDown className="w-4 h-4 text-slate-400" />
          </Select.Icon>
        </div>
      </Select.Trigger>

      <Select.Portal>
        <Select.Content
          position="popper"
          sideOffset={4}
          className="z-[9999] bg-white border border-slate-200 rounded-xl shadow-lg overflow-hidden w-[var(--radix-select-trigger-width)]"
        >
          <Select.Viewport className="max-h-52 overflow-y-auto py-1">
            {/* Default/clear option */}
            <Select.Item
              value="__clear__"
              className="px-3 py-2 text-sm cursor-pointer hover:bg-slate-50 focus:bg-slate-50 focus:outline-none text-slate-400 italic"
            >
              <Select.ItemText>— {placeholder} —</Select.ItemText>
            </Select.Item>

            {options
              .filter(
                (o) =>
                  o.value !== undefined && o.value !== null && o.value !== "",
              )
              .map((o, index) => (
                <Select.Item
                  key={index}
                  value={String(o.value)}
                  className="px-3 py-2 text-sm cursor-pointer hover:bg-slate-50 focus:bg-slate-50 focus:outline-none text-slate-700 data-[state=checked]:text-slate-900 data-[state=checked]:font-medium data-[state=checked]:bg-slate-50 flex items-center justify-between"
                >
                  <Select.ItemText>{o.label}</Select.ItemText>
                  <Select.ItemIndicator>
                    <Check className="w-3.5 h-3.5 text-slate-900" />
                  </Select.ItemIndicator>
                </Select.Item>
              ))}
          </Select.Viewport>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
}
