/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  useEffect,
  useState,
  useMemo,
  forwardRef,
  useImperativeHandle,
  useCallback,
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
import { LookupFilterDTO, LookupRepositoryDTO } from "../../types/database";

export interface ColumnConfig {
  key: string;
  header: string;
}

export interface BaseTableRef<T> {
  refresh: () => void;
  getData: () => T[];
  reset: () => void;
}

interface BaseTableProps<T> {
  controller: string;
  columns: ColumnConfig[];
  filters?: any;
  defaultFilters?: any;
  filterMappings?: any;
  addButton?: React.ReactNode;
  clickableRow?: boolean;
  navigateToDetails?: (row: T) => void;
  setFilters?: (val: any) => void;
  onAddClick?: () => void;
}

const ITEMS_PER_PAGE = 10;

const BaseTableComponent = <T extends Record<string, any>>(
  props: BaseTableProps<T>,
  ref: React.ForwardedRef<BaseTableRef<T>>,
) => {
  const {
    controller,
    columns,
    filters,
    defaultFilters,
    filterMappings,
    addButton,
    clickableRow = false,
    navigateToDetails,
    onAddClick,
  } = props;

  const { searchTerm, immediateValue, updateSearch } = useDebouncedSearch();

  const [data, setData] = useState<T[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(
    async (currentFilters: any) => {
      try {
        setLoading(true);

        const mappedFilters: LookupFilterDTO[] = filterMappings?.length
          ? filterMappings.map((f: any) => ({
              columnName: f.column,
              value: currentFilters?.[f.key],
              operation: f.operation,
            }))
          : [];

        const body: LookupRepositoryDTO = {
          searchTerm: searchTerm ?? "",
          pageNumber: currentPage,
          pageSize: ITEMS_PER_PAGE,
          filters: mappedFilters,
          sorting: [],
        };

        const result = await BaseTableService.getAllItems<T>(controller, body);

        setData(result.items);
        setTotalPages(result.totalPages);
        setTotalCount(result.totalCount);
        setCurrentPage(result.currentPage);
        setError(null);
      } catch (e) {
        setError("Failed to load data");
      } finally {
        setLoading(false);
      }
    },
    [controller, currentPage, searchTerm],
  );
  useEffect(() => {
    fetchData(filters);
  }, [fetchData]);

  useImperativeHandle(ref, () => ({
    refresh: () => fetchData(filters),
    reset: () => fetchData(defaultFilters),
    getData: () => data,
  }));

  const tableRows = useMemo(() => {
    return data.map((row, index) => (
      <motion.tr
        key={index}
        className="border-b hover:bg-muted/40"
        onClick={() => clickableRow && navigateToDetails?.(row)}
      >
        {columns.map((col) => (
          <TableCell key={col.key}>{row[col.key] ?? "-"}</TableCell>
        ))}
      </motion.tr>
    ));
  }, [data, columns]);

  return (
    <div className="w-full">
      <TableToolbar
        searchValue={immediateValue}
        onSearchChange={updateSearch}
        addButton={addButton}
        onFiltersSubmit={function (): void {
          throw new Error("Function not implemented.");
        }}
        resetFilters={function (): void {
          throw new Error("Function not implemented.");
        }}
      />

      <div className="border rounded-md overflow-auto">
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((c) => (
                <TableHead key={c.key}>{c.header}</TableHead>
              ))}
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
                    onRetry={() => fetchData(filters)}
                  />
                </TableCell>
              </TableRow>
            ) : data.length ? (
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

      <TablePagination
        currentPage={currentPage}
        totalPages={totalPages}
        totalRows={totalCount}
        setCurrentPage={setCurrentPage}
        loading={loading}
        error={error}
        itemsPerPage={ITEMS_PER_PAGE}
      />
    </div>
  );
};

export const BaseTable = forwardRef(BaseTableComponent) as <
  T extends Record<string, any>,
>(
  props: BaseTableProps<T> & {
    ref?: React.ForwardedRef<BaseTableRef<T>>;
  },
) => ReturnType<typeof BaseTableComponent>;
