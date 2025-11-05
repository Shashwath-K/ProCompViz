/**
 * Application Constants
 * Centralized constants for the entire application
 */

/**
 * Project Types
 */
export const PROJECT_TYPES = {
  VISUALIZER: 'visualizer',
  TRACER: 'tracer',
};

/**
 * Project Type Labels
 */
export const PROJECT_TYPE_LABELS = {
  [PROJECT_TYPES.VISUALIZER]: 'Visualizer',
  [PROJECT_TYPES.TRACER]: 'Tracer',
};

/**
 * Project Type Icons
 */
export const PROJECT_TYPE_ICONS = {
  [PROJECT_TYPES.VISUALIZER]: '📊',
  [PROJECT_TYPES.TRACER]: '🔍',
};

/**
 * Programming Languages
 */
export const LANGUAGES = {
  JAVASCRIPT: 'javascript',
  PYTHON: 'python',
  JAVA: 'java',
  CPP: 'cpp',
  C: 'c',
};

/**
 * Editor Themes
 */
export const EDITOR_THEMES = {
  VS_LIGHT: 'vs',
  VS_DARK: 'vs-dark',
  HC_BLACK: 'hc-black',
  HC_LIGHT: 'hc-light',
};

/**
 * Time of Day
 */
export const TIME_OF_DAY = {
  MORNING: 'morning',
  AFTERNOON: 'afternoon',
  EVENING: 'evening',
  NIGHT: 'night',
};

/**
 * Message Types
 */
export const MESSAGE_TYPES = {
  FUNNY: 'funny',
  PROFESSIONAL: 'professional',
  MOTIVATIONAL: 'motivational',
};

/**
 * Status Types
 */
export const STATUS_TYPES = {
  SUCCESS: 'success',
  ERROR: 'error',
  WARNING: 'warning',
  INFO: 'info',
};

/**
 * Execution States
 */
export const EXECUTION_STATES = {
  IDLE: 'idle',
  RUNNING: 'running',
  SUCCESS: 'success',
  ERROR: 'error',
};

/**
 * Breakpoints (pixels)
 */
export const BREAKPOINTS = {
  XS: 0,
  SM: 640,
  MD: 768,
  LG: 1024,
  XL: 1280,
  XXL: 1536,
};

/**
 * Animation Durations (milliseconds)
 */
export const ANIMATION_DURATION = {
  FAST: 150,
  NORMAL: 250,
  SLOW: 400,
};

/**
 * Grid Configurations
 */
export const GRID_CONFIG = {
  COLUMNS_MOBILE: 1,
  COLUMNS_TABLET: 2,
  COLUMNS_DESKTOP: 3,
  GAP: 24,
};

/**
 * Editor Configuration Constants
 */
export const EDITOR_CONFIG = {
  DEFAULT_FONT_SIZE: 14,
  MIN_FONT_SIZE: 10,
  MAX_FONT_SIZE: 24,
  DEFAULT_TAB_SIZE: 2,
  DEFAULT_LINE_HEIGHT: 1.5,
};

/**
 * Code Limits
 */
export const CODE_LIMITS = {
  MAX_LENGTH: 100000, // 100k characters
  MAX_LINES: 5000,
  PREVIEW_LINES: 3,
  EXCERPT_LENGTH: 100,
};

/**
 * LocalStorage Keys (backup - main ones in CONFIG)
 */
export const STORAGE_KEYS = {
  PROJECTS: 'visualizer_tracer_projects',
  PREFERENCES: 'visualizer_tracer_preferences',
  THEME: 'visualizer_tracer_theme',
  LANGUAGE: 'visualizer_tracer_last_language',
  USERNAME: 'visualizer_tracer_username',
  EDITOR_STATE: 'visualizer_tracer_editor_state',
};

/**
 * API Endpoints
 */
export const API_ENDPOINTS = {
  PROJECTS: '/projects',
  EXECUTE: '/execute',
  VISUALIZE: '/visualize',
  TRACE: '/trace',
};

/**
 * HTTP Methods
 */
export const HTTP_METHODS = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  PATCH: 'PATCH',
  DELETE: 'DELETE',
};

/**
 * Error Messages
 */
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network error. Please check your connection.',
  TIMEOUT_ERROR: 'Request timeout. Please try again.',
  SERVER_ERROR: 'Server error. Please try again later.',
  VALIDATION_ERROR: 'Validation error. Please check your input.',
  NOT_FOUND: 'Resource not found.',
  UNAUTHORIZED: 'Unauthorized access.',
  FORBIDDEN: 'Access forbidden.',
  UNKNOWN_ERROR: 'An unknown error occurred.',
};

/**
 * Success Messages
 */
export const SUCCESS_MESSAGES = {
  PROJECT_SAVED: 'Project saved successfully!',
  PROJECT_DELETED: 'Project deleted successfully!',
  PROJECT_EXPORTED: 'Project exported successfully!',
  PROJECT_IMPORTED: 'Project imported successfully!',
  CODE_EXECUTED: 'Code executed successfully!',
  CODE_FORMATTED: 'Code formatted successfully!',
};

/**
 * Validation Rules
 */
export const VALIDATION_RULES = {
  PROJECT_NAME: {
    MIN_LENGTH: 1,
    MAX_LENGTH: 100,
    PATTERN: /^[a-zA-Z0-9\s\-_()]+$/,
  },
  USERNAME: {
    MIN_LENGTH: 1,
    MAX_LENGTH: 50,
    PATTERN: /^[a-zA-Z0-9\s]+$/,
  },
};

/**
 * Keyboard Shortcuts
 */
export const KEYBOARD_SHORTCUTS = {
  SAVE: { key: 's', ctrl: true, shift: false, alt: false },
  RUN: { key: 'Enter', ctrl: true, shift: false, alt: false },
  FORMAT: { key: 'f', ctrl: false, shift: true, alt: true },
  FIND: { key: 'f', ctrl: true, shift: false, alt: false },
  REPLACE: { key: 'h', ctrl: true, shift: false, alt: false },
};

/**
 * Date Formats
 */
export const DATE_FORMATS = {
  SHORT: 'MMM dd, yyyy',
  LONG: 'MMMM dd, yyyy',
  TIME: 'HH:mm',
  DATETIME: 'MMM dd, yyyy HH:mm',
  ISO: "yyyy-MM-dd'T'HH:mm:ss",
};

/**
 * File Extensions
 */
export const FILE_EXTENSIONS = {
  [LANGUAGES.JAVASCRIPT]: 'js',
  [LANGUAGES.PYTHON]: 'py',
  [LANGUAGES.JAVA]: 'java',
  [LANGUAGES.CPP]: 'cpp',
  [LANGUAGES.C]: 'c',
  JSON: 'json',
  TEXT: 'txt',
};

/**
 * MIME Types
 */
export const MIME_TYPES = {
  JSON: 'application/json',
  TEXT: 'text/plain',
  JAVASCRIPT: 'text/javascript',
  PYTHON: 'text/x-python',
};

/**
 * Feature Flags (can be overridden by environment)
 */
export const FEATURES = {
  ENABLE_AUTO_SAVE: true,
  ENABLE_CODE_EXECUTION: true,
  ENABLE_VISUALIZATION: true,
  ENABLE_TRACER: true,
  ENABLE_EXPORT: true,
  ENABLE_IMPORT: true,
  ENABLE_SHARE: false, // Future feature
  ENABLE_COLLABORATION: false, // Future feature
};

/**
 * Export all constants
 */
export default {
  PROJECT_TYPES,
  PROJECT_TYPE_LABELS,
  PROJECT_TYPE_ICONS,
  LANGUAGES,
  EDITOR_THEMES,
  TIME_OF_DAY,
  MESSAGE_TYPES,
  STATUS_TYPES,
  EXECUTION_STATES,
  BREAKPOINTS,
  ANIMATION_DURATION,
  GRID_CONFIG,
  EDITOR_CONFIG,
  CODE_LIMITS,
  STORAGE_KEYS,
  API_ENDPOINTS,
  HTTP_METHODS,
  ERROR_MESSAGES,
  SUCCESS_MESSAGES,
  VALIDATION_RULES,
  KEYBOARD_SHORTCUTS,
  DATE_FORMATS,
  FILE_EXTENSIONS,
  MIME_TYPES,
  FEATURES,
};
