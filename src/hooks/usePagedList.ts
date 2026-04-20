/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useCallback, useEffect } from "react";
import { BaseTableService } from "../lib/Table";
import { LookupFilterOperation, LookupSortingDirection } from "../assets/enums";
import {
  LookupFilterDTO,
  LookupRepositoryDTO,
  LookupSortingDTO,
} from "../types/database";

export interface FilterMapping<T> {
  key: keyof T;
  column: string;
  operation: LookupFilterOperation;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface Props<_T, F> {
  controller: string;
  filterMappings: FilterMapping<F>[];
  pageSize?: number;
  initialFilters?: F;
}

export function usePagedList<T, F>({
  controller,
  filterMappings,
  pageSize = 12,
  initialFilters,
}: Props<T, F>) {
  const [items, setItems] = useState<T[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [error, setError] = useState("");
  const [filtersState, setFiltersState] = useState<F | null>(
    initialFilters ?? null,
  );

  useEffect(() => {
    if (initialFilters) {
      fetchData(initialFilters, 0, false);
    }
  }, []);

  // 🔥 BUILD FILTERS (FIXED)
  const buildFilters = (filters: F): LookupFilterDTO[] => {
    return filterMappings
      .map((m) => {
        const value = filters[m.key];

        if (value === undefined || value === null || value === "") {
          return null;
        }

        return {
          columnName: m.column,
          value:
            typeof value === "string" && !isNaN(Number(value))
              ? Number(value)
              : value,
          operation: m.operation,
        };
      })
      .filter(Boolean) as LookupFilterDTO[];
  };

  // 🔥 SORTING
  const buildSorting = (orderBy?: string): LookupSortingDTO[] => {
    switch (orderBy) {
      case "newest":
        return [
          {
            columnName: "createdDateTime",
            direction: LookupSortingDirection.Desc,
          },
        ];
      case "oldest":
        return [
          {
            columnName: "createdDateTime",
            direction: LookupSortingDirection.Asc,
          },
        ];
      case "price_asc":
        return [{ columnName: "Price", direction: LookupSortingDirection.Asc }];
      case "price_desc":
        return [
          { columnName: "Price", direction: LookupSortingDirection.Desc },
        ];
      default:
        return [];
    }
  };

  const fetchData = async (filters: F, pageNumber: number, append = false) => {
    if (!filters) return;

    if (append) {
      setLoadingMore(true);
    } else {
      setLoading(true);
    }
    try {
      const request: LookupRepositoryDTO = {
        searchTerm: "",
        pageNumber,
        pageSize,
        filters: buildFilters(filters),
        sorting: buildSorting((filters as any).orderBy),
      };

      const data = await BaseTableService.getAllItems<T>(controller, request);

      setItems((prev) => (append ? [...prev, ...data.items] : data.items));

      setTotalCount(data.totalCount);
      setHasMore(data.items.length === pageSize);
      if (error) {
        setError("");
      }
    } finally {
      setError("Failed to load data");

      setLoading(false);
      setLoadingMore(false);
    }
  };

  const applyFilters = useCallback((filters: F) => {
    setFiltersState(filters);
    setPage(1);
    fetchData(filters, 0, false);
  }, []);

  const loadMore = useCallback(() => {
    if (!filtersState || !hasMore) return;

    const next = page + 1;
    setPage(next);
    fetchData(filtersState, next, true);
  }, [filtersState, page, hasMore]);

  const refresh = () => {
    if (!filtersState) return;
    fetchData(filtersState, 0, false);
  };

  return {
    items,
    loading,
    loadingMore,
    hasMore,
    totalCount,
    applyFilters,
    loadMore,
    refresh,
    error,
  };
}
