/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useCallback, useEffect, useRef } from "react";
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
  pageSize = 8,
  initialFilters,
}: Props<T, F>) {
  const [items, setItems] = useState<T[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [totalCount, setTotalCount] = useState(0);
  const [error, setError] = useState("");

  // ✅ Use refs to avoid stale closures in callbacks
  const pageRef = useRef(0);
  const filtersRef = useRef<F | null>(initialFilters ?? null);
  const hasMoreRef = useRef(true);
  const loadingMoreRef = useRef(false);

  useEffect(() => {
    if (initialFilters) {
      fetchData(initialFilters, 0, false);
    }
  }, []);

  const buildFilters = useCallback(
    (filters: F): LookupFilterDTO[] => {
      return filterMappings
        .map((m) => {
          const value = filters[m.key];
          if (value === undefined || value === null || value === "")
            return null;
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
    },
    [filterMappings],
  );

  const buildSorting = useCallback((orderBy?: string): LookupSortingDTO[] => {
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
  }, []);

  // ✅ fetchData is now stable — reads from refs, not stale closure state
  const fetchData = useCallback(
    async (filters: F, pageNumber: number, append = false) => {
      if (!filters) return;

      if (append) {
        loadingMoreRef.current = true;
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

        // ✅ Update both ref and state for hasMore
        const more = data.items.length === pageSize;
        hasMoreRef.current = more;
        setHasMore(more);
        setError("");
      } catch {
        setError("Failed to load data");
      } finally {
        setLoading(false);
        loadingMoreRef.current = false;
        setLoadingMore(false);
      }
    },
    [buildFilters, buildSorting, controller, pageSize],
  );

  const applyFilters = useCallback(
    (filters: F) => {
      // setFiltersState(filters);
      filtersRef.current = filters;
      pageRef.current = 0;
      fetchData(filters, 0, false);
    },
    [fetchData],
  );

  // ✅ loadMore reads from refs — always has fresh values
  const loadMore = useCallback(() => {
    if (!filtersRef.current || !hasMoreRef.current || loadingMoreRef.current)
      return;

    const next = pageRef.current + 1;
    pageRef.current = next;
    fetchData(filtersRef.current, next, true);
  }, [fetchData]);

  const refresh = useCallback(() => {
    // ← must be BEFORE the return
    if (!filtersRef.current) return;
    pageRef.current = 0;
    fetchData(filtersRef.current, 0, false);
  }, [fetchData]);

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
