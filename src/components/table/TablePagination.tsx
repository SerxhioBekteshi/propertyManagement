import {
  ChevronLeft,
  ChevronRight,
  ArrowLeftCircle,
  ArrowRightCircle,
} from "lucide-react";
import { Button } from "../ui/button";
import { useIsTablet } from "../../hooks/useBreakpoint";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface TablePaginationProps<_T> {
  totalRows: number;
  loading: boolean;
  error: string | null;
  currentPage: number;
  itemsPerPage: number;
  setCurrentPage: (page: number) => void;
  totalPages: number;
}

const TablePagination = <T,>(props: TablePaginationProps<T>) => {
  const {
    totalRows,
    loading,
    error,
    currentPage,
    itemsPerPage,
    setCurrentPage,
    totalPages,
  } = props;

  const startIndex = currentPage * itemsPerPage;
  const isTablet = useIsTablet();

  // Build a window of up to 3 page indices centered around currentPage
  const pageWindow = Array.from({ length: Math.min(3, totalPages) }, (_, i) => {
    const start = Math.min(
      Math.max(0, currentPage - 1),
      Math.max(0, totalPages - 3),
    );
    return start + i;
  });

  return (
    !loading &&
    !error &&
    totalRows > 0 && (
      <div className="border-t border-gray-200 bg-white px-4 py-4">
        <div className="flex gap-3 sm:flex-row sm:items-center xs:justify-between">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span className="hidden xs:inline">
              Showing {startIndex + 1} to{" "}
              {Math.min(startIndex + itemsPerPage, totalRows)} of {totalRows}{" "}
              results
            </span>
            {/* +1 for human-readable display */}
            <span className="xs:hidden">
              {currentPage + 1} of {totalPages}
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-1 sm:justify-end">
            <div className="hidden sm:flex">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setCurrentPage(0)}
                disabled={currentPage === 0 || loading}
                aria-label="First page"
              >
                <ArrowLeftCircle className="h-4 w-4" />
              </Button>
            </div>

            <Button
              variant="outline"
              size="icon"
              onClick={() => setCurrentPage(Math.max(currentPage - 1, 0))}
              disabled={currentPage === 0 || loading}
              aria-label="Previous page"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>

            <div className="flex gap-1 items-center">
              {!isTablet &&
                pageWindow.map((page) => (
                  <Button
                    key={page}
                    className={`px-3 py-1 rounded-md text-sm transition-colors ${
                      page === currentPage
                        ? "border border-yellow-300 bg-[#FFD700] text-gray-900 hover:bg-[#F6C700]"
                        : "border border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
                    }`}
                    size="sm"
                    onClick={() => setCurrentPage(page)}
                    disabled={loading}
                    aria-label={`Go to page ${page + 1}`}
                  >
                    {/* +1 so buttons show 1-based numbers to the user */}
                    {page + 1}
                  </Button>
                ))}
            </div>

            <Button
              variant="outline"
              size="icon"
              onClick={() =>
                setCurrentPage(Math.min(currentPage + 1, totalPages - 1))
              }
              disabled={currentPage === totalPages - 1 || loading}
              aria-label="Next page"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>

            <div className="hidden sm:flex">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setCurrentPage(totalPages - 1)}
                disabled={currentPage === totalPages - 1 || loading}
                aria-label="Last page"
              >
                <ArrowRightCircle className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default TablePagination;
