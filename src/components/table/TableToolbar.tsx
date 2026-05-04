/* eslint-disable @typescript-eslint/no-explicit-any */
import { Filter } from "lucide-react";
import { Button } from "../ui/button";
import SearchButton from "../search-button";
import { useEffect, useRef, useState } from "react";
import Modal from "../modal";
import { useIsTablet } from "../../hooks/useBreakpoint";

interface TableToolbarProps {
  renderFilters?: (
    filters: any,
    onChange: (filters: any) => void,
  ) => React.ReactNode;
  onFiltersChange?: (filters: any) => void;
  onReset?: () => void;
  initialFilters?: any;
  addButton?: React.ReactNode;
  setToolbarHeight?: (val: number) => void;
  onSearchChange: (val: string) => void;
  searchValue: string;
  showSearch?: boolean;
}

const TableToolbar = (props: TableToolbarProps) => {
  const componentRef = useRef<HTMLDivElement>(null);
  const isTablet = useIsTablet();
  const [isOpen, setIsOpen] = useState(false);
  const [hasActiveFilters, setHasActiveFilters] = useState(false);
  const [filters, setFilters] = useState<any>(props.initialFilters ?? {});
  const [draft, setDraft] = useState<any>(props.initialFilters ?? {});

  const {
    renderFilters,
    onFiltersChange,
    onReset,
    initialFilters,
    addButton,
    setToolbarHeight,
    onSearchChange,
    searchValue,
    showSearch,
  } = props;

  useEffect(() => {
    const updateHeight = () => {
      if (componentRef.current) {
        setToolbarHeight?.(componentRef.current.offsetHeight);
      }
    };
    updateHeight();
    window.addEventListener("resize", updateHeight);
    return () => window.removeEventListener("resize", updateHeight);
  }, [searchValue, addButton, setToolbarHeight]);

  useEffect(() => {
    setHasActiveFilters(
      JSON.stringify(filters) !== JSON.stringify(initialFilters),
    );
  }, [filters, initialFilters]);

  const handleFiltersChange = (updated: any) => {
    setFilters(updated);
    if (!isTablet) {
      // Desktop — apply immediately
      onFiltersChange?.(updated);
    }
  };

  const handleApplyDraft = () => {
    setFilters(draft);
    onFiltersChange?.(draft);
    setIsOpen(false);
  };

  const handleReset = () => {
    setFilters(initialFilters ?? {});
    setDraft(initialFilters ?? {});
    onFiltersChange?.(initialFilters ?? {});
    onReset?.();
    setIsOpen(false);
  };

  const handleOpenModal = () => {
    setDraft(filters); // sync draft with current applied filters
    setIsOpen(true);
  };

  const getActiveFiltersCount = (filtersObj: any, initial: any) => {
    return Object.keys(filtersObj || {}).filter((key) => {
      const value = filtersObj[key];
      const initialValue = initial?.[key];

      // ignore empty values
      const isEmpty =
        value === undefined ||
        value === null ||
        value === "" ||
        (Array.isArray(value) && value.length === 0);

      // count only if different from initial AND not empty
      return !isEmpty && JSON.stringify(value) !== JSON.stringify(initialValue);
    }).length;
  };

  const activeFiltersCount = getActiveFiltersCount(filters, initialFilters);

  return (
    <>
      <div
        ref={componentRef}
        className="flex flex-col gap-3 border-b border-gray-200 bg-white p-4"
      >
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          {showSearch && (
            <SearchButton onChange={onSearchChange} value={searchValue} />
          )}
          <div
            className={`flex items-center gap-2 ${!showSearch ? "ml-auto" : ""}`}
          >
            {renderFilters && isTablet && (
              <>
                <Button
                  variant="outline"
                  className="relative w-fit border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
                  onClick={handleOpenModal}
                >
                  <Filter className="mr-2 h-4 w-4" />
                  Filters
                  {hasActiveFilters && (
                    <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-yellow-500" />
                  )}
                </Button>
              </>
            )}
            {addButton}
          </div>
        </div>

        {/* Desktop: inline, applies immediately */}
        {renderFilters && !isTablet && (
          <div>
            {renderFilters(filters, handleFiltersChange)}
            <div className="flex mt-4">
              <Button
                variant="outline"
                disabled={activeFiltersCount === 0}
                className="w-fit h-[34px] px-3 text-xs border-red-200 bg-red-50 text-red-600 hover:bg-red-100 disabled:opacity-50"
                onClick={handleReset}
              >
                Clear {activeFiltersCount > 0 && `(${activeFiltersCount})`}
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Tablet modal: draft pattern, applies on save */}
      {isTablet && (
        <Modal
          open={isOpen}
          onClose={() => setIsOpen(false)}
          title="Filter results"
          onOpenChange={setIsOpen}
          description="Apply filters to narrow down results."
          fitContentHeight={false}
          onSave={handleApplyDraft}
          footerActions={
            <Button
              variant="outline"
              className="w-fit border-red-200 bg-red-50 text-red-600 hover:bg-red-100"
              onClick={handleReset}
            >
              Clear
            </Button>
          }
        >
          <div className="p-3">{renderFilters?.(draft, setDraft)}</div>
        </Modal>
      )}
    </>
  );
};

export default TableToolbar;
