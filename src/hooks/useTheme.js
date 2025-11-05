import { useCallback } from 'react';
import { useThemeContext } from '../context/ThemeContext';

/**
 * useTheme Hook
 * Convenience hook for theme operations
 * Wraps ThemeContext with additional utilities
 */
const useTheme = () => {
  const context = useThemeContext();

  const {
    appTheme,
    editorTheme,
    resolvedTheme,
    changeAppTheme,
    changeEditorTheme,
    toggleTheme,
    isDark,
    isLight,
  } = context;

  /**
   * Set theme to light
   */
  const setLightTheme = useCallback(() => {
    changeAppTheme('light');
  }, [changeAppTheme]);

  /**
   * Set theme to dark
   */
  const setDarkTheme = useCallback(() => {
    changeAppTheme('dark');
  }, [changeAppTheme]);

  /**
   * Set theme to auto (follow system)
   */
  const setAutoTheme = useCallback(() => {
    changeAppTheme('auto');
  }, [changeAppTheme]);

  /**
   * Get CSS class for current theme
   */
  const getThemeClass = useCallback(() => {
    return `theme-${resolvedTheme}`;
  }, [resolvedTheme]);

  /**
   * Check if using auto theme
   */
  const isAutoTheme = useCallback(() => {
    return appTheme === 'auto';
  }, [appTheme]);

  /**
   * Get theme icon
   */
  const getThemeIcon = useCallback(() => {
    if (isDark) return '🌙';
    return '☀️';
  }, [isDark]);

  /**
   * Get theme label
   */
  const getThemeLabel = useCallback(() => {
    if (isAutoTheme()) return 'Auto';
    if (isDark) return 'Dark';
    return 'Light';
  }, [isDark, isAutoTheme]);

  /**
   * Sync editor theme with app theme
   */
  const syncEditorTheme = useCallback(() => {
    const monacoTheme = isDark ? 'vs-dark' : 'vs';
    changeEditorTheme(monacoTheme);
  }, [isDark, changeEditorTheme]);

  return {
    // From context
    appTheme,
    editorTheme,
    resolvedTheme,
    changeAppTheme,
    changeEditorTheme,
    toggleTheme,
    isDark,
    isLight,
    
    // Additional utilities
    setLightTheme,
    setDarkTheme,
    setAutoTheme,
    getThemeClass,
    isAutoTheme,
    getThemeIcon,
    getThemeLabel,
    syncEditorTheme,
  };
};

export default useTheme;
