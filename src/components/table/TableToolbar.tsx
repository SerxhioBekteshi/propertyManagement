/* eslint-disable @typescript-eslint/no-explicit-any */
import { Filter } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Button } from "../ui/button";
import Modal from "../modal";
import { useIsTablet } from "../../hooks/useBreakpoint";
import SearchButton from "../search-button";

interface TableToolbarProps {
  customFilterComponent?: React.ReactNode;
  customFilterComponentPosition?: "bottom" | "right";
  addButton?: React.ReactNode;
  setToolbarHeight?: (val: number) => void;
  onSearchChange: (val: string) => void;
  searchValue: string;
  onFiltersSubmit: () => void;
  defaultFilters?: any;
  hasQuickFilters?: boolean;
  resetFilters: () => void;
  filters?: any;
  showFiltersButton?: boolean;
  showSearch?: boolean;
}

const TableToolbar = (props: TableToolbarProps) => {
  const componentRef = useRef<any>(null);
  const isTablet = useIsTablet();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [hasActiveFilters, setHasActiveFilters] = useState<boolean>(false);

  const {
    customFilterComponent,
    customFilterComponentPosition,
    addButton,
    setToolbarHeight,
    onSearchChange,
    searchValue,
    onFiltersSubmit,
    defaultFilters,
    hasQuickFilters,
    resetFilters,
    filters,
    showFiltersButton,
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
    return () => {
      window.removeEventListener("resize", updateHeight);
    };
  }, [
    customFilterComponentPosition,
    searchValue,
    customFilterComponent,
    addButton,
    setToolbarHeight,
    onSearchChange,
  ]);

  useEffect(() => {
    setHasActiveFilters(
      JSON.stringify(filters) !== JSON.stringify(defaultFilters),
    );
  }, [filters, defaultFilters]);

  const handleApplyFilters = () => {
    onFiltersSubmit();
    setIsOpen(false);
  };

  const handleResetFilters = () => {
    setHasActiveFilters(false);
    resetFilters();
    setIsOpen(false);
  };

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
  };

  const renderFiltersButton = () => (
    <Button
      variant="outline"
      className={`relative w-fit border-gray-300 bg-white text-gray-700 hover:bg-gray-50`}
      onClick={() => handleOpenChange(true)}
    >
      <Filter className="mr-2 h-4 w-4" />
      Filters
      {hasActiveFilters && (
        <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-yellow-500" />
      )}
    </Button>
  );

  const renderCustomFilterComponent = () => {
    if (showFiltersButton && (isTablet || !hasQuickFilters)) {
      return renderFiltersButton();
    } else {
      return customFilterComponent;
    }
  };

  return (
    <>
      <div
        className="flex flex-col gap-3 border-b border-gray-200 bg-white py-4"
        ref={componentRef}
      >
        <div
          className={`flex flex-col ${hasQuickFilters ? "" : "gap-4"} md:flex-row md:items-center md:justify-between`}
        >
          {showSearch && (
            <SearchButton onChange={onSearchChange} value={searchValue} />
          )}
          <div className={`flex flex-wrap ${!showSearch ? "ml-auto" : ""}`}>
            {customFilterComponentPosition === "right" &&
              renderCustomFilterComponent()}
            <div className={`${isTablet ? "pt-2" : ""}`}>{addButton}</div>
          </div>
        </div>
        {customFilterComponentPosition === "bottom" &&
          renderCustomFilterComponent()}
      </div>
      <Modal
        open={isOpen && (isTablet || !hasQuickFilters)}
        onClose={() => handleOpenChange(false)}
        title={"Filter results"}
        onOpenChange={handleOpenChange}
        description="Apply filters to narrow down results."
        fitContentHeight={true}
        onSave={handleApplyFilters}
        footerActions={
          <Button
            variant="outline"
            className="w-fit"
            onClick={handleResetFilters}
          >
            Reset filters
          </Button>
        }
      >
        <div className="p-3">{customFilterComponent}</div>
      </Modal>
    </>
  );
};

export default TableToolbar;
