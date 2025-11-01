/**
 * Environment Configuration
 * Manages environment variables and app configuration
 */

/**
 * Get environment variable with fallback
 * @param {string} key - Environment variable key
 * @param {any} defaultValue - Default value if not found
 * @returns {any} - Environment variable value
 */
const getEnvVar = (key, defaultValue = '') => {
  return import.meta.env[key] || defaultValue;
};

/**
 * Application Configuration
 */
export const CONFIG = {
  // API Configuration
  API: {
    BASE_URL: getEnvVar('VITE_API_BASE_URL', 'http://localhost:3000/api'),
    TIMEOUT: parseInt(getEnvVar('VITE_API_TIMEOUT', '30000')),
    CODE_EXECUTION_URL: getEnvVar('VITE_CODE_EXECUTION_URL', 'http://localhost:3001/execute'),
  },

  // MongoDB Configuration (for future use)
  DATABASE: {
    ENABLED: getEnvVar('VITE_DB_ENABLED', 'false') === 'true',
    CONNECTION_STRING: getEnvVar('VITE_MONGODB_URI', ''),
  },

  // Local Storage Keys
  STORAGE_KEYS: {
    PROJECTS: 'visualizer_tracer_projects',
    USER_PREFERENCES: 'visualizer_tracer_preferences',
    THEME: 'visualizer_tracer_theme',
    LAST_LANGUAGE: 'visualizer_tracer_last_language',
    USERNAME: 'visualizer_tracer_username',
  },

  // Application Settings
  APP: {
    NAME: 'Visualizer & Tracer',
    VERSION: '1.0.0',
    MAX_PROJECTS_DISPLAY: 9, // 3 rows × 3 columns
    PROJECTS_PER_ROW: 3,
    DEFAULT_USERNAME: 'Developer',
  },

  // Editor Configuration
  EDITOR: {
    DEFAULT_LANGUAGE: 'javascript',
    DEFAULT_THEME: 'vs-dark',
    AUTO_SAVE_INTERVAL: 30000, // 30 seconds
    MIN_PADDING: 16, // px
    MAX_PADDING: 64, // px
  },

  // Feature Flags
  FEATURES: {
    ENABLE_AUTO_SAVE: true,
    ENABLE_CODE_EXECUTION: true,
    ENABLE_VISUALIZATION: true,
    ENABLE_TRACER: true,
    ENABLE_EXPORT: true,
  },

  // Development
  DEV: {
    ENABLE_LOGGING: getEnvVar('VITE_ENABLE_LOGGING', 'true') === 'true',
    MOCK_API: getEnvVar('VITE_MOCK_API', 'false') === 'true',
  },
};

/**
 * Check if running in development mode
 */
export const isDevelopment = () => {
  return import.meta.env.MODE === 'development';
};

/**
 * Check if running in production mode
 */
export const isProduction = () => {
  return import.meta.env.MODE === 'production';
};

/**
 * Log helper for development
 */
export const devLog = (...args) => {
  if (isDevelopment() && CONFIG.DEV.ENABLE_LOGGING) {
    console.log('[DEV]', ...args);
  }
};

/**
 * Error log helper
 */
export const errorLog = (...args) => {
  console.error('[ERROR]', ...args);
};

export default CONFIG;
