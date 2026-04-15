"use client";
import { Search, X } from "lucide-react";

interface SearchButtonProps {
  onChange: (val: string) => void;
  value: string;
}

const SearchButton = (props: SearchButtonProps) => {
  const { onChange, value } = props;

  return (
    <div className="relative w-full md:max-w-sm">
      <Search className="absolute left-3.5 top-3 h-4 w-4 text-muted-foreground" />

      <input
        type="search"
        placeholder="Search..."
        className="pl-8 pr-8 w-full"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />

      {value && (
        <button
          type="button"
          onClick={() => onChange("")}
          className="absolute right-3.5 top-3 text-muted-foreground hover:text-foreground"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
};

export default SearchButton;
