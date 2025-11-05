import { useState, useEffect, useCallback } from 'react';
import { CONFIG } from '../config/environment';

/**
 * useResponsive Hook
 * Provides responsive utilities and dynamic padding based on screen size
 */
const useResponsive = () => {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  /**
   * Update window size
   */
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    
    // Initial check
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  /**
   * Update device type based on window width
   */
  useEffect(() => {
    const { width } = windowSize;
    
    setIsMobile(width < 768);
    setIsTablet(width >= 768 && width < 1024);
    setIsDesktop(width >= 1024);
  }, [windowSize]);

  /**
   * Get dynamic padding based on screen size
   * Follows requirement: "variable left and right padding based on screen dimensions"
   */
  const getPadding = useCallback(() => {
    const { width } = windowSize;
    
    // Calculate padding as percentage of width, with min/max constraints
    const minPadding = CONFIG.EDITOR.MIN_PADDING;
    const maxPadding = CONFIG.EDITOR.MAX_PADDING;
    
    if (width < 768) {
      // Mobile: minimal padding
      return minPadding;
    } else if (width < 1024) {
      // Tablet: medium padding
      return Math.max(minPadding, Math.min(width * 0.03, maxPadding));
    } else if (width < 1440) {
      // Desktop: dynamic padding
      return Math.max(minPadding, Math.min(width * 0.05, maxPadding));
    } else {
      // Large desktop: max padding
      return maxPadding;
    }
  }, [windowSize]);

  /**
   * Get breakpoint name
   */
  const getBreakpoint = useCallback(() => {
    const { width } = windowSize;
    
    if (width < 640) return 'xs';
    if (width < 768) return 'sm';
    if (width < 1024) return 'md';
    if (width < 1280) return 'lg';
    return 'xl';
  }, [windowSize]);

  /**
   * Check if screen width is above breakpoint
   */
  const isAbove = useCallback(
    (breakpoint) => {
      const breakpoints = {
        xs: 0,
        sm: 640,
        md: 768,
        lg: 1024,
        xl: 1280,
      };
      
      return windowSize.width >= breakpoints[breakpoint];
    },
    [windowSize]
  );

  /**
   * Check if screen width is below breakpoint
   */
  const isBelow = useCallback(
    (breakpoint) => {
      const breakpoints = {
        xs: 640,
        sm: 768,
        md: 1024,
        lg: 1280,
        xl: Infinity,
      };
      
      return windowSize.width < breakpoints[breakpoint];
    },
    [windowSize]
  );

  /**
   * Get orientation
   */
  const getOrientation = useCallback(() => {
    return windowSize.width > windowSize.height ? 'landscape' : 'portrait';
  }, [windowSize]);

  /**
   * Check if orientation is landscape
   */
  const isLandscape = useCallback(() => {
    return getOrientation() === 'landscape';
  }, [getOrientation]);

  /**
   * Check if orientation is portrait
   */
  const isPortrait = useCallback(() => {
    return getOrientation() === 'portrait';
  }, [getOrientation]);

  /**
   * Get columns for grid based on screen size
   */
  const getGridColumns = useCallback(() => {
    if (isMobile) return 1;
    if (isTablet) return 2;
    return CONFIG.APP.PROJECTS_PER_ROW; // 3 for desktop
  }, [isMobile, isTablet]);

  return {
    // Window size
    windowSize,
    width: windowSize.width,
    height: windowSize.height,
    
    // Device type
    isMobile,
    isTablet,
    isDesktop,
    
    // Dynamic padding (main feature for editor)
    padding: getPadding(),
    
    // Breakpoints
    breakpoint: getBreakpoint(),
    isAbove,
    isBelow,
    
    // Orientation
    orientation: getOrientation(),
    isLandscape: isLandscape(),
    isPortrait: isPortrait(),
    
    // Grid utilities
    gridColumns: getGridColumns(),
  };
};

export default useResponsive;
