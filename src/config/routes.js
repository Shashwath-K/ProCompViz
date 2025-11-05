/**
 * Application Route Configuration
 * Centralized route paths for easy maintenance
 */

export const ROUTES = {
  // Home/Welcome page
  HOME: '/welcome',
  
  // Editor routes
  EDITOR_NEW: '/editor/new/:projectType', // projectType: 'visualizer' or 'tracer'
  EDITOR_EDIT: '/editor/:projectId',
  
  // Utility routes
  NOT_FOUND: '/404',
};

/**
 * Project Types
 */
export const PROJECT_TYPES = {
  VISUALIZER: 'visualizer',
  TRACER: 'tracer',
};

/**
 * Helper function to generate editor route for new project
 * @param {string} projectType - 'visualizer' or 'tracer'
 * @returns {string} - Route path
 */
export const getNewEditorRoute = (projectType) => {
  return `/editor/new/${projectType}`;
};

/**
 * Helper function to generate editor route for existing project
 * @param {string} projectId - Project ID
 * @returns {string} - Route path
 */
export const getEditEditorRoute = (projectId) => {
  return `/editor/${projectId}`;
};

/**
 * Route metadata for navigation
 */
export const ROUTE_META = {
  [ROUTES.HOME]: {
    title: 'Welcome - Visualizer & Tracer',
    requiresAuth: false,
  },
  [ROUTES.EDITOR_NEW]: {
    title: 'New Project - Visualizer & Tracer',
    requiresAuth: false,
  },
  [ROUTES.EDITOR_EDIT]: {
    title: 'Edit Project - Visualizer & Tracer',
    requiresAuth: false,
  },
};
