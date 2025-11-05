import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { CONFIG } from '../config/environment';
import { devLog, errorLog } from '../config/environment';

/**
 * Project Context
 * Manages all projects (saved visualizers and tracers)
 */

const ProjectContext = createContext(undefined);

/**
 * ProjectProvider Component
 * Provides project state and CRUD operations
 */
export const ProjectProvider = ({ children }) => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  /**
   * Load projects from localStorage (or future: MongoDB)
   */
  const loadProjects = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      // For now, load from localStorage
      // Later: Replace with API call to MongoDB
      const storedProjects = localStorage.getItem(CONFIG.STORAGE_KEYS.PROJECTS);
      
      if (storedProjects) {
        const parsedProjects = JSON.parse(storedProjects);
        setProjects(parsedProjects);
        devLog('Loaded projects:', parsedProjects.length);
      } else {
        setProjects([]);
      }
    } catch (err) {
      errorLog('Error loading projects:', err);
      setError('Failed to load projects');
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Load projects on mount
   */
  useEffect(() => {
    loadProjects();
  }, [loadProjects]);

  /**
   * Save projects to localStorage
   */
  const persistProjects = useCallback((projectsToSave) => {
    try {
      localStorage.setItem(CONFIG.STORAGE_KEYS.PROJECTS, JSON.stringify(projectsToSave));
      devLog('Projects persisted:', projectsToSave.length);
    } catch (err) {
      errorLog('Error persisting projects:', err);
      throw new Error('Failed to save projects');
    }
  }, []);

  /**
   * Get project by ID
   */
  const getProjectById = useCallback((projectId) => {
    return projects.find(p => p.id === projectId);
  }, [projects]);

  /**
   * Create new project
   */
  const createProject = useCallback((projectData) => {
    try {
      const newProject = {
        id: `project_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        name: projectData.name || 'Untitled Project',
        type: projectData.type || 'visualizer',
        code: projectData.code || '',
        language: projectData.language || CONFIG.EDITOR.DEFAULT_LANGUAGE,
        theme: projectData.theme || CONFIG.EDITOR.DEFAULT_THEME,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        ...projectData,
      };

      const updatedProjects = [newProject, ...projects];
      setProjects(updatedProjects);
      persistProjects(updatedProjects);
      
      devLog('Project created:', newProject.id);
      return newProject;
    } catch (err) {
      errorLog('Error creating project:', err);
      throw new Error('Failed to create project');
    }
  }, [projects, persistProjects]);

  /**
   * Update existing project
   */
  const updateProject = useCallback((projectId, updates) => {
    try {
      const updatedProjects = projects.map(project => {
        if (project.id === projectId) {
          return {
            ...project,
            ...updates,
            updatedAt: new Date().toISOString(),
          };
        }
        return project;
      });

      setProjects(updatedProjects);
      persistProjects(updatedProjects);
      
      devLog('Project updated:', projectId);
      return updatedProjects.find(p => p.id === projectId);
    } catch (err) {
      errorLog('Error updating project:', err);
      throw new Error('Failed to update project');
    }
  }, [projects, persistProjects]);

  /**
   * Delete project
   */
  const deleteProject = useCallback((projectId) => {
    try {
      const updatedProjects = projects.filter(p => p.id !== projectId);
      setProjects(updatedProjects);
      persistProjects(updatedProjects);
      
      devLog('Project deleted:', projectId);
    } catch (err) {
      errorLog('Error deleting project:', err);
      throw new Error('Failed to delete project');
    }
  }, [projects, persistProjects]);

  /**
   * Save or update project (smart save)
   */
  const saveProject = useCallback((projectData) => {
    if (projectData.id) {
      // Update existing
      return updateProject(projectData.id, projectData);
    } else {
      // Create new
      return createProject(projectData);
    }
  }, [createProject, updateProject]);

  /**
   * Get recent projects (limited)
   */
  const getRecentProjects = useCallback((limit = CONFIG.APP.MAX_PROJECTS_DISPLAY) => {
    return projects
      .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
      .slice(0, limit);
  }, [projects]);

  /**
   * Search projects
   */
  const searchProjects = useCallback((query) => {
    if (!query) return projects;
    
    const lowerQuery = query.toLowerCase();
    return projects.filter(project => 
      project.name.toLowerCase().includes(lowerQuery) ||
      project.type.toLowerCase().includes(lowerQuery) ||
      project.language.toLowerCase().includes(lowerQuery)
    );
  }, [projects]);

  /**
   * Get projects by type
   */
  const getProjectsByType = useCallback((type) => {
    return projects.filter(p => p.type === type);
  }, [projects]);

  const value = {
    projects,
    loading,
    error,
    loadProjects,
    getProjectById,
    createProject,
    updateProject,
    deleteProject,
    saveProject,
    getRecentProjects,
    searchProjects,
    getProjectsByType,
  };

  return (
    <ProjectContext.Provider value={value}>
      {children}
    </ProjectContext.Provider>
  );
};

/**
 * Custom hook to use project context
 */
export const useProjectContext = () => {
  const context = useContext(ProjectContext);
  if (context === undefined) {
    throw new Error('useProjectContext must be used within a ProjectProvider');
  }
  return context;
};

export default ProjectContext;
