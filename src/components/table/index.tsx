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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuPortal,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { MoreHorizontal } from "lucide-react";

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

interface BaseTableProps<T> {
  controller?: string;
  staticData?: T[];
  columns: ColumnConfig[];
  filters?: any;
  defaultFilters?: any;
  filterMappings?: any;
  addButton?: React.ReactNode;
  clickableRow?: boolean;
  navigateToDetails?: (row: T) => void;
  setFilters?: (val: any) => void;
  onAddClick?: () => void;
  renderActions?: (row: T) => React.ReactNode;
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
    staticData,
    renderActions,
  } = props;

  const { searchTerm, immediateValue, updateSearch } = useDebouncedSearch();

  const [data, setData] = useState<T[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const isStatic = !!staticData;

  const fetchData = useCallback(
    async (currentFilters: any) => {
      if (isStatic) return;
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

        const result = await BaseTableService.getAllItems<T>(
          controller ?? "",
          body,
        );

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
    [controller, currentPage, searchTerm, isStatic],
  );

  useEffect(() => {
    fetchData(filters);
  }, [fetchData]);

  useEffect(() => {
    if (staticData) {
      setData(staticData);
      setTotalCount(staticData.length);
      setTotalPages(1);
    }
  }, [staticData]);

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
  }, [data, columns]);
  console.log(immediateValue, "AWD");
  return (
    <div className="w-full">
      <TableToolbar
        showSearch={immediateValue !== "" || data.length !== 0}
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
              {renderActions && (
                <TableHead className="w-[60px] text-right sticky right-0 bg-white z-10">
                  {" "}
                  Actions{" "}
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
                    onRetry={() => fetchData(filters)}
                  />
                </TableCell>
              </TableRow>
            ) : data.length != 0 ? (
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
          setCurrentPage={setCurrentPage}
          loading={loading}
          error={error}
          itemsPerPage={ITEMS_PER_PAGE}
        />
      )}
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
