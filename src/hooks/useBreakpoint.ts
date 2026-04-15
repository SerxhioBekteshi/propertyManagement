import * as React from "react";

const BREAKPOINTS = {
  MOBILE: 576,
  TABLET: 768,
  LARGE: 992,
  XLARGE: 1200,
} as const;

type BreakpointName = keyof typeof BREAKPOINTS;

export function useBreakpoint() {
  const [breakpoint, setBreakpoint] = React.useState({
    isMobileOnly: false,
    isTabletOnly: false,
    isLargeOnly: false,
    isXLargeOnly: false,

    isMobile: false, // < 576
    isTablet: false, // < 768 (includes mobile)
    isLarge: false, // < 992 (includes mobile + tablet)
    isXLarge: false, // >= 992
  });

  const [hasMounted, setHasMounted] = React.useState(false);

  React.useEffect(() => {
    setHasMounted(true);

    const checkBreakpoint = () => {
      const width = window.innerWidth;
      setBreakpoint({
        isMobileOnly: width < BREAKPOINTS.MOBILE,
        isTabletOnly: width >= BREAKPOINTS.MOBILE && width < BREAKPOINTS.TABLET,
        isLargeOnly: width >= BREAKPOINTS.TABLET && width < BREAKPOINTS.LARGE,
        isXLargeOnly: width >= BREAKPOINTS.LARGE,

        isMobile: width < BREAKPOINTS.MOBILE,
        isTablet: width < BREAKPOINTS.TABLET,
        isLarge: width < BREAKPOINTS.LARGE,
        isXLarge: width >= BREAKPOINTS.LARGE,
      });
    };

    checkBreakpoint();

    window.addEventListener("resize", checkBreakpoint);
    return () => window.removeEventListener("resize", checkBreakpoint);
  }, []);

  if (!hasMounted) {
    return {
      isMobileOnly: false,
      isTabletOnly: false,
      isLargeOnly: false,
      isXLargeOnly: false,
      isMobile: false,
      isTablet: false,
      isLarge: false,
      isXLarge: false,
    };
  }

  return breakpoint;
}

export function useIsMobile() {
  const { isMobile } = useBreakpoint();
  return isMobile;
}

export function useIsTablet() {
  const { isTablet } = useBreakpoint();
  return isTablet; // < 768, includes mobile
}

export function useIsLarge() {
  const { isLarge } = useBreakpoint();
  return isLarge; // < 992, includes mobile + tablet
}

export function useIsXLarge() {
  const { isXLarge } = useBreakpoint();
  return isXLarge; // >= 992
}

// Exact range hooks (mutually exclusive)
export function useIsMobileOnly() {
  const { isMobileOnly } = useBreakpoint();
  return isMobileOnly;
}

export function useIsTabletOnly() {
  const { isTabletOnly } = useBreakpoint();
  return isTabletOnly;
}

export function useIsLargeOnly() {
  const { isLargeOnly } = useBreakpoint();
  return isLargeOnly;
}

export function useIsXLargeOnly() {
  const { isXLargeOnly } = useBreakpoint();
  return isXLargeOnly;
}

export function useIsBetween(min: BreakpointName, max: BreakpointName) {
  const [isBetween, setIsBetween] = React.useState(false);
  const [hasMounted, setHasMounted] = React.useState(false);

  React.useEffect(() => {
    setHasMounted(true);

    const checkIsBetween = () => {
      const width = window.innerWidth;
      const minValue = BREAKPOINTS[min];
      const maxValue = BREAKPOINTS[max];
      setIsBetween(width >= minValue && width < maxValue);
    };

    checkIsBetween();

    window.addEventListener("resize", checkIsBetween);
    return () => window.removeEventListener("resize", checkIsBetween);
  }, [min, max]);

  if (!hasMounted) {
    return false;
  }

  return isBetween;
}
