"use client";

import { Search, X } from "lucide-react";

interface SearchButtonProps {
  onChange: (val: string) => void;
  value: string;
}

const SearchButton = ({ onChange, value }: SearchButtonProps) => {
  return (
    <div className="relative w-full md:max-w-sm">
      {/* Search Icon */}
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />

      {/* Input */}
      <input
        type="text"
        placeholder="Search..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="
          w-full
          h-10
          rounded-md
          border border-input
          bg-background
          pl-9 pr-9
          text-sm
          outline-none
          transition-colors
          placeholder:text-muted-foreground
          focus:border-primary
          focus:ring-1 focus:ring-primary
        "
      />

      {/* Clear Button */}
      {value && (
        <button
          type="button"
          onClick={() => onChange("")}
          className="
            absolute right-3 top-1/2 -translate-y-1/2
            text-muted-foreground
            hover:text-foreground
            transition-colors
          "
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
};

export default SearchButton;
