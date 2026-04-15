import { useState, useEffect } from "react";

export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

// Enhanced debounced search hook
export function useDebouncedSearch(
  initialValue: string = "",
  delay: number = 500,
) {
  const [searchTerm, setSearchTerm] = useState(initialValue);
  const [immediateValue, setImmediateValue] = useState(initialValue);
  const debouncedSearchTerm = useDebounce(searchTerm, delay);

  const updateSearch = (value: string) => {
    setImmediateValue(value);
    setSearchTerm(value);
  };

  const clearSearch = () => {
    setImmediateValue("");
    setSearchTerm("");
  };

  return {
    searchTerm: debouncedSearchTerm,
    immediateValue,
    updateSearch,
    clearSearch,
    isSearching: searchTerm !== debouncedSearchTerm,
  };
}
