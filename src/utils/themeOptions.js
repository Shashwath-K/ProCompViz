/**
 * Theme Options
 * Configuration for editor themes
 */

import { EDITOR_THEMES } from './constants';

/**
 * Editor Theme Options for Dropdown
 */
export const EDITOR_THEME_OPTIONS = [
  {
    value: EDITOR_THEMES.VS_DARK,
    label: 'Dark',
    icon: '🌙',
    description: 'Visual Studio Dark theme',
    type: 'dark',
  },
  {
    value: EDITOR_THEMES.VS_LIGHT,
    label: 'Light',
    icon: '☀️',
    description: 'Visual Studio Light theme',
    type: 'light',
  },
  {
    value: EDITOR_THEMES.HC_BLACK,
    label: 'High Contrast Dark',
    icon: '⬛',
    description: 'High contrast dark theme for accessibility',
    type: 'dark',
  },
  {
    value: EDITOR_THEMES.HC_LIGHT,
    label: 'High Contrast Light',
    icon: '⬜',
    description: 'High contrast light theme for accessibility',
    type: 'light',
  },
];

/**
 * App Theme Options
 */
export const APP_THEME_OPTIONS = [
  {
    value: 'light',
    label: 'Light',
    icon: '☀️',
    description: 'Light application theme',
  },
  {
    value: 'dark',
    label: 'Dark',
    icon: '🌙',
    description: 'Dark application theme',
  },
  {
    value: 'auto',
    label: 'Auto',
    icon: '🔄',
    description: 'Follow system preference',
  },
];

/**
 * Get theme configuration by value
 * @param {string} theme - Theme value
 * @returns {Object|null} - Theme configuration
 */
export const getThemeConfig = (theme) => {
  return EDITOR_THEME_OPTIONS.find((t) => t.value === theme) || null;
};

/**
 * Get theme label
 * @param {string} theme - Theme value
 * @returns {string} - Theme label
 */
export const getThemeLabel = (theme) => {
  const config = getThemeConfig(theme);
  return config ? config.label : theme;
};

/**
 * Get theme icon
 * @param {string} theme - Theme value
 * @returns {string} - Theme icon
 */
export const getThemeIcon = (theme) => {
  const config = getThemeConfig(theme);
  return config ? config.icon : '🎨';
};

/**
 * Get theme type (light/dark)
 * @param {string} theme - Theme value
 * @returns {string} - Theme type
 */
export const getThemeType = (theme) => {
  const config = getThemeConfig(theme);
  return config ? config.type : 'dark';
};

/**
 * Check if theme is dark
 * @param {string} theme - Theme value
 * @returns {boolean} - True if dark
 */
export const isDarkTheme = (theme) => {
  return getThemeType(theme) === 'dark';
};

/**
 * Check if theme is light
 * @param {string} theme - Theme value
 * @returns {boolean} - True if light
 */
export const isLightTheme = (theme) => {
  return getThemeType(theme) === 'light';
};

/**
 * Get opposite theme
 * @param {string} theme - Current theme value
 * @returns {string} - Opposite theme value
 */
export const getOppositeTheme = (theme) => {
  if (isDarkTheme(theme)) {
    return EDITOR_THEMES.VS_LIGHT;
  }
  return EDITOR_THEMES.VS_DARK;
};

/**
 * Map app theme to editor theme
 * @param {string} appTheme - App theme (light/dark/auto)
 * @param {boolean} systemIsDark - System preference
 * @returns {string} - Editor theme
 */
export const mapAppThemeToEditor = (appTheme, systemIsDark = false) => {
  if (appTheme === 'auto') {
    return systemIsDark ? EDITOR_THEMES.VS_DARK : EDITOR_THEMES.VS_LIGHT;
  }
  return appTheme === 'dark' ? EDITOR_THEMES.VS_DARK : EDITOR_THEMES.VS_LIGHT;
};

/**
 * Get all theme values
 * @returns {Array<string>} - Array of theme values
 */
export const getAllThemeValues = () => {
  return EDITOR_THEME_OPTIONS.map((theme) => theme.value);
};

/**
 * Get all theme labels
 * @returns {Array<string>} - Array of theme labels
 */
export const getAllThemeLabels = () => {
  return EDITOR_THEME_OPTIONS.map((theme) => theme.label);
};

/**
 * Theme presets with custom colors
 */
export const THEME_PRESETS = {
  [EDITOR_THEMES.VS_DARK]: {
    background: '#1e1e1e',
    foreground: '#d4d4d4',
    selection: '#264f78',
    lineHighlight: '#2a2a2a',
    cursor: '#aeafad',
  },
  [EDITOR_THEMES.VS_LIGHT]: {
    background: '#ffffff',
    foreground: '#000000',
    selection: '#add6ff',
    lineHighlight: '#f5f5f5',
    cursor: '#000000',
  },
  [EDITOR_THEMES.HC_BLACK]: {
    background: '#000000',
    foreground: '#ffffff',
    selection: '#ffffff',
    lineHighlight: '#ffffff',
    cursor: '#ffffff',
  },
  [EDITOR_THEMES.HC_LIGHT]: {
    background: '#ffffff',
    foreground: '#000000',
    selection: '#0f4a85',
    lineHighlight: '#f0f0f0',
    cursor: '#000000',
  },
};

/**
 * Get theme preset colors
 * @param {string} theme - Theme value
 * @returns {Object} - Color preset
 */
export const getThemePreset = (theme) => {
  return THEME_PRESETS[theme] || THEME_PRESETS[EDITOR_THEMES.VS_DARK];
};

export default {
  EDITOR_THEME_OPTIONS,
  APP_THEME_OPTIONS,
  getThemeConfig,
  getThemeLabel,
  getThemeIcon,
  getThemeType,
  isDarkTheme,
  isLightTheme,
  getOppositeTheme,
  mapAppThemeToEditor,
  getAllThemeValues,
  getAllThemeLabels,
  THEME_PRESETS,
  getThemePreset,
};
