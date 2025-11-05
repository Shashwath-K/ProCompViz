/**
 * Project Service
 * API calls for project CRUD operations
 * (Currently using localStorage, MongoDB integration ready)
 */

import apiClient from './apiClient';
import { API_ENDPOINTS } from '../../utils/constants';
import { CONFIG } from '../../config/environment';

/**
 * Fetch all projects
 * @returns {Promise} - Projects array
 */
export const fetchProjects = async () => {
  if (CONFIG.DATABASE.ENABLED) {
    // MongoDB API call
    return apiClient.get(API_ENDPOINTS.PROJECTS);
  }

  // localStorage fallback
  return {
    success: true,
    data: [],
  };
};

/**
 * Fetch project by ID
 * @param {string} projectId - Project ID
 * @returns {Promise} - Project object
 */
export const fetchProjectById = async (projectId) => {
  if (CONFIG.DATABASE.ENABLED) {
    // MongoDB API call
    return apiClient.get(`${API_ENDPOINTS.PROJECTS}/${projectId}`);
  }

  // localStorage fallback
  return {
    success: true,
    data: null,
  };
};

/**
 * Create new project
 * @param {Object} projectData - Project data
 * @returns {Promise} - Created project
 */
export const createProject = async (projectData) => {
  if (CONFIG.DATABASE.ENABLED) {
    // MongoDB API call
    return apiClient.post(API_ENDPOINTS.PROJECTS, projectData);
  }

  // localStorage fallback - handled in ProjectContext
  return {
    success: true,
    data: projectData,
  };
};

/**
 * Update project
 * @param {string} projectId - Project ID
 * @param {Object} updates - Project updates
 * @returns {Promise} - Updated project
 */
export const updateProject = async (projectId, updates) => {
  if (CONFIG.DATABASE.ENABLED) {
    // MongoDB API call
    return apiClient.put(`${API_ENDPOINTS.PROJECTS}/${projectId}`, updates);
  }

  // localStorage fallback - handled in ProjectContext
  return {
    success: true,
    data: updates,
  };
};

/**
 * Delete project
 * @param {string} projectId - Project ID
 * @returns {Promise} - Success status
 */
export const deleteProject = async (projectId) => {
  if (CONFIG.DATABASE.ENABLED) {
    // MongoDB API call
    return apiClient.delete(`${API_ENDPOINTS.PROJECTS}/${projectId}`);
  }

  // localStorage fallback - handled in ProjectContext
  return {
    success: true,
    data: { id: projectId },
  };
};

/**
 * Search projects
 * @param {string} query - Search query
 * @returns {Promise} - Matching projects
 */
export const searchProjects = async (query) => {
  if (CONFIG.DATABASE.ENABLED) {
    // MongoDB API call
    return apiClient.get(`${API_ENDPOINTS.PROJECTS}/search?q=${encodeURIComponent(query)}`);
  }

  // localStorage fallback - handled in ProjectContext
  return {
    success: true,
    data: [],
  };
};

export default {
  fetchProjects,
  fetchProjectById,
  createProject,
  updateProject,
  deleteProject,
  searchProjects,
};
