/* eslint-disable @typescript-eslint/no-explicit-any */

import {
  useEffect,
  useState,
  useMemo,
  forwardRef,
  useImperativeHandle,
  useCallback,
} from "react";

// import { buildFilterSearchParams } from "@/src/utils";
// import { buildDynamicFilterParams, FilterMapping } from "./helpers";
import { BaseTableService } from "../../lib/Table";
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
import { TableSkeleton } from "../skeleton";
import { ErrorState } from "../error-state";
import NoResults from "../no-results";
import TablePagination from "./TablePagination";
import { motion } from "framer-motion";
import {
  buildDynamicFilterParams,
  buildFilterSearchParams,
  FilterMapping,
} from "./helpers";

export interface ColumnConfig {
  key: string;
  header: string;
}

export type CustomRenderers<T> = {
  [K in keyof T]?: (value: any, row: T, index: number) => React.ReactNode;
};

interface BaseTableProps<T> {
  controller: string;
  defaultFilters?: any;
  filters?: any;
  columns: ColumnConfig[];
  clickableRow?: boolean;
  customRenderers?: CustomRenderers<T>;
  actionsRenderer?: (row: T, onActionComplete: () => void) => React.ReactNode;
  customFilterComponent?: React.ReactNode;
  customFilterComponentPosition?: "bottom" | "right";
  addButton?: React.ReactNode;
  hasQuickFilters?: boolean;
  navigateToDetails?: (row: T) => void;
  filterMappings?: FilterMapping[];
  setFilters?: (val: any) => void;
  showFiltersButton?: boolean;
}

export interface BaseTableRef<T> {
  refresh: () => void;
  getData: () => T[];
  reset: () => void;
}

const itemsPerPage = 10;

const BaseTableComponent = <T extends Record<string, any>>(
  props: BaseTableProps<T>,
  ref: React.ForwardedRef<BaseTableRef<T>>,
) => {
  const {
    controller,
    filters,
    columns,
    clickableRow = false,
    customRenderers = {} as CustomRenderers<T>,
    actionsRenderer,
    customFilterComponent,
    customFilterComponentPosition = "bottom",
    addButton,
    defaultFilters,
    hasQuickFilters = false,
    navigateToDetails,
    filterMappings,
    setFilters,
    showFiltersButton = true,
  } = props;

  const { searchTerm, immediateValue, updateSearch } = useDebouncedSearch();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [data, setData] = useState<T[]>([]);
  const [totalRows, setTotalRows] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [toolbarHeight, setToolbarHeight] = useState(0);

  const fetchRows = useCallback(
    async (currentFilters: any) => {
      try {
        setLoading(true);
        let myParams = {};

        if (filterMappings) {
          myParams = buildFilterSearchParams(searchTerm);

          const dynamicParams = buildDynamicFilterParams(
            filterMappings,
            currentFilters ?? filters,
          );

          if (dynamicParams) {
            myParams = { ...myParams, ...dynamicParams };
          }
        } else {
          myParams = buildFilterSearchParams(searchTerm);
        }

        const result = await BaseTableService.getAllItems<T>(
          controller,
          currentPage,
          itemsPerPage,
          myParams,
        );
        setData(result.items);
        setTotalRows(result.totalCount);
        setTotalPages(result.totalPages);
        setError(null);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Failed to load data. Please try again later.",
        );
      } finally {
        setLoading(false);
      }
    },
    [controller, currentPage, itemsPerPage, searchTerm],
  );

  useEffect(() => {
    fetchRows(filters);
  }, [fetchRows]);

  useImperativeHandle(ref, () => ({
    refresh: () => fetchRows(filters),
    reset: () => fetchRows(defaultFilters),
    getData: () => data,
  }));

  const renderCellContent = (column: ColumnConfig, row: T, index: number) => {
    const value = row[column.key as keyof T];

    if (customRenderers[column.key as keyof T]) {
      return customRenderers[column.key as keyof T]!(value, row, index);
    }

    return value || "-";
  };

  // Memoize the table rows to prevent unnecessary re-renders
  const tableRows = useMemo(() => {
    const handleRowClick =
      (row: T) => (e: React.MouseEvent<HTMLTableRowElement>) => {
        // No navigatation if clicking on the actions column
        if ((e.target as HTMLElement).closest("td:last-child")) {
          return;
        }
        if (clickableRow) {
          if (navigateToDetails) navigateToDetails(row);
        }
      };

    return data.map((row, index: number) => (
      <motion.tr
        key={index}
        className={`group ${
          !clickableRow ? "" : "cursor-pointer hover:bg-muted/50"
        } border-b border-gray-200`}
        onClick={handleRowClick(row)}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: index * 0.05 }}
      >
        {columns.map((column) => (
          <TableCell
            key={column.key}
            className={`
              ${column.key} === "name" || ${column.key} === "fullName"
                ? "font-medium "
                : ""`}
          >
            {renderCellContent(column, row, index)}
          </TableCell>
        ))}
        {actionsRenderer && (
          <TableCell
            className="sticky right-0 z-20 border-l border-gray-100 bg-background group-hover:bg-background group-data-[state=selected]:bg-background shadow-[-8px_0_12px_-8px_rgba(0,0,0,0.25)] w-16 min-w-[4rem]"
            onClick={(e) => e.stopPropagation()}
          >
            {actionsRenderer(row, () => fetchRows(filters))}
          </TableCell>
        )}
      </motion.tr>
    ));
  }, [data, columns, customRenderers, actionsRenderer, clickableRow]);

  return (
    <div className="w-full mx-auto shadow-lg min-w-0">
      <div className=" rounded-lg ">
        {/* Toolbar */}
        <TableToolbar
          setToolbarHeight={setToolbarHeight}
          addButton={addButton}
          customFilterComponent={customFilterComponent}
          customFilterComponentPosition={customFilterComponentPosition}
          searchValue={immediateValue}
          onSearchChange={(val) => updateSearch(val)}
          onFiltersSubmit={() => fetchRows(filters)}
          resetFilters={() => {
            if (setFilters) setFilters(defaultFilters);
            fetchRows(defaultFilters);
          }}
          filters={filters}
          defaultFilters={defaultFilters}
          hasQuickFilters={hasQuickFilters}
          showFiltersButton={showFiltersButton}
        />

        {/* Table Container */}
        <div className="border relative flex flex-col min-w-0">
          <div
            className="overflow-auto border-b border-gray-200 bg-white pb-1"
            style={{
              maxHeight:
                totalRows == 0
                  ? "fit-content"
                  : `calc(100vh - (${"56px"} + ${toolbarHeight}px + 52px))`, //52px PAGE TITLE height, 64px header height, 136 12- refer footer height on diff size
              scrollbarWidth: "thin",
              scrollbarColor: "#CBD5E0 #F7FAFC",
              scrollbarGutter: "stable",
            }}
          >
            <Table className="min-w-max w-full">
              <TableHeader>
                <TableRow>
                  {columns.map((column) => (
                    <TableHead
                      style={{
                        zIndex: 3,
                      }}
                      className="sticky top-0 bg-background whitespace-nowrap"
                      key={column.key}
                    >
                      {column.header}
                    </TableHead>
                  ))}
                  {actionsRenderer && (
                    <TableHead
                      style={{
                        zIndex: 3,
                      }}
                      className="sticky top-0 right-0 bg-background whitespace-nowrap shadow-[-8px_0_12px_-8px_rgba(0,0,0,0.25)] w-16 min-w-[4rem]"
                    >
                      Actions
                    </TableHead>
                  )}
                </TableRow>
              </TableHeader>

              <TableBody>
                {loading ? (
                  <TableSkeleton
                    columns={columns.length + (actionsRenderer ? 1 : 0)}
                    rows={5}
                  />
                ) : error ? (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length + (actionsRenderer ? 1 : 0)}
                    >
                      <ErrorState
                        message={error}
                        onRetry={() => fetchRows(filters)}
                      />
                    </TableCell>
                  </TableRow>
                ) : data.length > 0 ? (
                  tableRows
                ) : (
                  <TableRow className="hover:bg-transparent">
                    <TableCell
                      colSpan={columns.length + (actionsRenderer ? 1 : 0)}
                      className="h-24 text-center"
                    >
                      <NoResults
                        title={"No records found"}
                        description={
                          !addButton
                            ? undefined
                            : `Please press the Add Button to create a new record`
                        }
                      />
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          <TablePagination
            totalRows={totalRows}
            loading={loading}
            error={error}
            currentPage={currentPage}
            itemsPerPage={itemsPerPage}
            setCurrentPage={setCurrentPage}
            totalPages={totalPages}
          />
        </div>
      </div>
    </div>
  );
};

export const BaseTable = forwardRef(BaseTableComponent) as <
  T extends Record<string, any>,
>(
  props: BaseTableProps<T> & { ref?: React.ForwardedRef<BaseTableRef<T>> },
) => ReturnType<typeof BaseTableComponent>;
