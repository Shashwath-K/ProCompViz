import React, { createContext, useContext, useState, useEffect } from 'react';
import { CONFIG } from '../config/environment';

/**
 * Theme Context
 * Manages global theme state (light/dark mode and editor theme)
 */

const ThemeContext = createContext(undefined);

/**
 * Available app themes
 */
export const APP_THEMES = {
  LIGHT: 'light',
  DARK: 'dark',
  AUTO: 'auto', // Follows system preference
};

/**
 * Available editor themes (Monaco)
 */
export const EDITOR_THEMES = {
  VS_LIGHT: 'vs',
  VS_DARK: 'vs-dark',
  HC_BLACK: 'hc-black',
  HC_LIGHT: 'hc-light',
};

/**
 * ThemeProvider Component
 * Provides theme state and controls to the entire app
 */
export const ThemeProvider = ({ children }) => {
  // App theme (light/dark)
  const [appTheme, setAppTheme] = useState(() => {
    const saved = localStorage.getItem(CONFIG.STORAGE_KEYS.THEME);
    return saved || APP_THEMES.AUTO;
  });

  // Editor theme (Monaco)
  const [editorTheme, setEditorTheme] = useState(() => {
    const saved = localStorage.getItem(`${CONFIG.STORAGE_KEYS.THEME}_editor`);
    return saved || EDITOR_THEMES.VS_DARK;
  });

  // Resolved theme (actual light/dark based on system if AUTO)
  const [resolvedTheme, setResolvedTheme] = useState(APP_THEMES.DARK);

  /**
   * Get system theme preference
   */
  const getSystemTheme = () => {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return APP_THEMES.DARK;
    }
    return APP_THEMES.LIGHT;
  };

  /**
   * Resolve theme based on preference
   */
  useEffect(() => {
    if (appTheme === APP_THEMES.AUTO) {
      setResolvedTheme(getSystemTheme());
    } else {
      setResolvedTheme(appTheme);
    }
  }, [appTheme]);

  /**
   * Apply theme to document
   */
  useEffect(() => {
    document.documentElement.setAttribute('data-color-scheme', resolvedTheme);
  }, [resolvedTheme]);

  /**
   * Listen for system theme changes
   */
  useEffect(() => {
    if (appTheme !== APP_THEMES.AUTO) return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e) => {
      setResolvedTheme(e.matches ? APP_THEMES.DARK : APP_THEMES.LIGHT);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [appTheme]);

  /**
   * Change app theme
   */
  const changeAppTheme = (newTheme) => {
    setAppTheme(newTheme);
    localStorage.setItem(CONFIG.STORAGE_KEYS.THEME, newTheme);
  };

  /**
   * Change editor theme
   */
  const changeEditorTheme = (newTheme) => {
    setEditorTheme(newTheme);
    localStorage.setItem(`${CONFIG.STORAGE_KEYS.THEME}_editor`, newTheme);
  };

  /**
   * Toggle between light and dark
   */
  const toggleTheme = () => {
    const newTheme = resolvedTheme === APP_THEMES.LIGHT ? APP_THEMES.DARK : APP_THEMES.LIGHT;
    changeAppTheme(newTheme);
  };

  const value = {
    appTheme,
    editorTheme,
    resolvedTheme,
    changeAppTheme,
    changeEditorTheme,
    toggleTheme,
    isDark: resolvedTheme === APP_THEMES.DARK,
    isLight: resolvedTheme === APP_THEMES.LIGHT,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

/**
 * Custom hook to use theme context
 */
export const useThemeContext = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useThemeContext must be used within a ThemeProvider');
  }
  return context;
};

export default ThemeContext;
