import type React from "react";
import { cn } from "../../utils";

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-muted", className)}
      {...props}
    />
  );
}

// Add a TableSkeleton component for consistent table loading states
function TableSkeleton({
  columns,
  rows = 5,
}: {
  columns: number;
  rows?: number;
}) {
  return (
    <>
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <tr
          key={`skeleton-row-${rowIndex}`}
          className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
        >
          {Array.from({ length: columns }).map((_, colIndex) => (
            <td
              key={`skeleton-cell-${rowIndex}-${colIndex}`}
              className="p-4 align-middle"
            >
              <Skeleton className="h-5 w-full max-w-[120px]" />
            </td>
          ))}
        </tr>
      ))}
    </>
  );
}

export { Skeleton, TableSkeleton };
