/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  useEffect,
  useState,
  useMemo,
  useImperativeHandle,
  useCallback,
  useRef,
  forwardRef,
} from "react";
import { useDebouncedSearch } from "../../hooks/useDebounce";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/baseTable";
import TableToolbar from "./TableToolbar";
import TablePagination from "./TablePagination";
import { TableSkeleton } from "../skeleton";
import { ErrorState } from "../error-state";
import NoResults from "../no-results";
import { motion } from "framer-motion";
import { BaseTableService } from "../../lib/Table";
import {
  FilterMapping,
  LookupFilterDTO,
  LookupRepositoryDTO,
  LookupSortingDTO,
} from "../../types/database";
import { LookupSortingDirection } from "../../assets/enums";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuPortal,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import React from "react";

export interface ColumnConfig {
  key: string;
  header: string;
  render?: (value: any, row: any) => React.ReactNode;
}

export interface BaseTableRef<T> {
  refresh: () => void;
  getData: () => T[];
  reset: () => void;
}

interface BaseTableProps<T, F = any> {
  controller?: string;
  staticData?: T[];
  columns: ColumnConfig[];
  initialFilters?: F;
  filterMappings?: FilterMapping<F>[];
  renderFilters?: (filters: F, onChange: (f: F) => void) => React.ReactNode;
  onReset?: () => void;
  addButton?: React.ReactNode;
  clickableRow?: boolean;
  navigateToDetails?: (row: T) => void;
  onAddClick?: () => void;
  renderActions?: (row: T) => React.ReactNode;
}

const ITEMS_PER_PAGE = 10;

const BaseTableComponent = <T extends Record<string, any>, F = any>(
  props: BaseTableProps<T, F>,
  ref: React.ForwardedRef<BaseTableRef<T>>,
) => {
  const {
    controller,
    columns,
    initialFilters,
    filterMappings,
    renderFilters,
    addButton,
    clickableRow = false,
    navigateToDetails,
    onAddClick,
    staticData,
    renderActions,
    onReset,
  } = props;

  const { searchTerm, immediateValue, updateSearch } = useDebouncedSearch();

  const [data, setData] = useState<T[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isStatic = !!staticData;
  const pageRef = useRef(0);
  const filtersRef = useRef<F | undefined>(initialFilters);

  const buildFilters = useCallback(
    (currentFilters?: F): LookupFilterDTO[] => {
      if (!filterMappings || !currentFilters) return [];
      return filterMappings
        .map((m) => {
          const value = currentFilters[m.key];
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

  const fetchData = useCallback(
    async (pageNumber: number, currentFilters?: F) => {
      if (isStatic) return;
      try {
        setLoading(true);
        const body: LookupRepositoryDTO = {
          searchTerm: searchTerm ?? "",
          pageNumber,
          pageSize: ITEMS_PER_PAGE,
          filters: buildFilters(currentFilters),
          sorting: buildSorting((currentFilters as any)?.orderBy),
        };
        const result = await BaseTableService.getAllItems<T>(
          controller ?? "",
          body,
        );
        setData(result.items);
        setTotalPages(result.totalPages);
        setTotalCount(result.totalCount);
        setCurrentPage(result.currentPage);
        setError(null);
      } catch {
        setError("Failed to load data");
      } finally {
        setLoading(false);
      }
    },
    [controller, searchTerm, isStatic, buildFilters, buildSorting],
  );

  // ✅ Initial fetch on mount
  useEffect(() => {
    fetchData(0, filtersRef.current);
  }, []);

  // ✅ Re-fetch when search changes — resets to page 0
  useEffect(() => {
    pageRef.current = 0;
    fetchData(0, filtersRef.current);
  }, [searchTerm]);

  // ✅ Called by toolbar when filters are committed (desktop: on change, tablet: on apply)
  const handleFiltersChange = useCallback(
    (newFilters: F) => {
      pageRef.current = 0;
      filtersRef.current = newFilters;
      fetchData(0, newFilters);
    },
    [fetchData],
  );

  const handlePageChange = useCallback(
    (page: number) => {
      pageRef.current = page;
      setCurrentPage(page);
      fetchData(page, filtersRef.current);
    },
    [fetchData],
  );

  useEffect(() => {
    if (staticData) {
      setData(staticData);
      setTotalCount(staticData.length);
      setTotalPages(1);
    }
  }, [staticData]);

  useImperativeHandle(ref, () => ({
    refresh: () => fetchData(pageRef.current, filtersRef.current),
    reset: () => {
      pageRef.current = 0;
      filtersRef.current = initialFilters;
      fetchData(0, initialFilters);
    },
    getData: () => data,
  }));

  const tableRows = useMemo(() => {
    return data.map((row, index) => (
      <motion.tr
        key={index}
        className="border-b hover:bg-muted/40"
        onClick={() => clickableRow && navigateToDetails?.(row)}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: index * 0.05 }}
      >
        {columns.map((col) => (
          <TableCell key={col.key}>
            {col.render ? col.render(row[col.key], row) : (row[col.key] ?? "-")}
          </TableCell>
        ))}
        {renderActions && (
          <TableCell className="sticky right-0 bg-white z-10 text-right">
            <div onClick={(e) => e.stopPropagation()}>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="p-2 hover:bg-muted rounded-md">
                    <MoreHorizontal size={18} />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuPortal>
                  <DropdownMenuContent
                    align="end"
                    sideOffset={6}
                    className="z-50 min-w-[160px] bg-white border border-slate-200 rounded-md shadow-lg p-1"
                  >
                    {renderActions(row)}
                  </DropdownMenuContent>
                </DropdownMenuPortal>
              </DropdownMenu>
            </div>
          </TableCell>
        )}
      </motion.tr>
    ));
  }, [data, columns, clickableRow, navigateToDetails, renderActions]);

  return (
    <div className="w-full">
      <TableToolbar
        showSearch={immediateValue !== "" || data.length !== 0}
        searchValue={immediateValue}
        onSearchChange={updateSearch}
        addButton={addButton}
        renderFilters={renderFilters}
        initialFilters={initialFilters}
        onFiltersChange={handleFiltersChange}
        onReset={onReset}
      />

      <div className="border rounded-md overflow-auto">
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((c) => (
                <TableHead key={c.key}>{c.header}</TableHead>
              ))}
              {renderActions && (
                <TableHead className="w-[60px] text-right sticky right-0 bg-white z-10">
                  Actions
                </TableHead>
              )}
            </TableRow>
          </TableHeader>

          <TableBody>
            {loading ? (
              <TableSkeleton columns={columns.length} rows={5} />
            ) : error ? (
              <TableRow>
                <TableCell colSpan={columns.length}>
                  <ErrorState
                    message={error}
                    onRetry={() =>
                      fetchData(pageRef.current, filtersRef.current)
                    }
                  />
                </TableCell>
              </TableRow>
            ) : data.length !== 0 ? (
              tableRows
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length}>
                  <NoResults
                    title="No data found"
                    titleButton="Add new record"
                    onAddClick={onAddClick}
                  />
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {data.length != 0 && (
        <TablePagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalRows={totalCount}
          setCurrentPage={handlePageChange}
          loading={loading}
          error={error}
          itemsPerPage={ITEMS_PER_PAGE}
        />
      )}
    </div>
  );
};

type BaseTableType = <T extends Record<string, any>, F = any>(
  props: BaseTableProps<T, F> & { ref?: React.Ref<BaseTableRef<T>> },
) => React.ReactElement | null;

export const BaseTable = forwardRef(
  BaseTableComponent,
) as unknown as BaseTableType;
