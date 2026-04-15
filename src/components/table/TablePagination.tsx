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
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
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

  const startIndex = (currentPage - 1) * itemsPerPage;
  const isTablet = useIsTablet();

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
            <span className="xs:hidden">
              {currentPage} of {totalPages}
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-1 sm:justify-end">
            <div className="hidden sm:flex">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setCurrentPage(1)}
                disabled={currentPage === 1 || loading}
                aria-label="First page"
              >
                <ArrowLeftCircle className="h-4 w-4" />
              </Button>
            </div>

            <Button
              variant="outline"
              size="icon"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1 || loading}
              aria-label="Previous page"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>

            <div className="flex gap-1 items-center">
              {!isTablet &&
                Array.from({ length: Math.min(3, totalPages) }, (_, index) => {
                  const page = index + Math.max(1, currentPage - 1);
                  if (page > totalPages) return null;

                  return (
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
                      aria-label={`Go to page ${page}`}
                    >
                      {page}
                    </Button>
                  );
                })}
            </div>

            <Button
              variant="outline"
              size="icon"
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages || loading}
              aria-label="Next page"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>

            <div className="hidden sm:flex">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setCurrentPage(totalPages)}
                disabled={currentPage === totalPages || loading}
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
