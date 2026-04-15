"use client";

import * as React from "react";

type SpinnerProps = {
  size?: "sm" | "md" | "lg";
  fullScreen?: boolean;
  className?: string;
};

const sizeMap = {
  sm: "h-4 w-4 border-2",
  md: "h-6 w-6 border-2",
  lg: "h-10 w-10 border-4",
};

export function Spinner({
  size = "md",
  fullScreen = false,
  className = "",
}: SpinnerProps) {
  return (
    <div
      className={`flex items-center justify-center ${
        fullScreen ? "fixed inset-0 z-50 bg-white/50" : "w-full h-full"
      }`}
    >
      <span
        className={`animate-spin rounded-full border-current border-t-transparent ${sizeMap[size]} ${className}`}
        role="status"
        aria-label="Loading"
      />
    </div>
  );
}
