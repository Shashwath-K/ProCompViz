import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useProjects from '../hooks/useProjects';
import { getNewEditorRoute } from '../config/routes';
import { PROJECT_TYPES } from '../config/routes';

// Components
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import Container from '../components/layout/Container';
import WelcomeHeader from '../components/welcome/WelcomeHeader';
import ProjectGrid from '../components/welcome/ProjectGrid';
import ShowMoreButton from '../components/welcome/ShowMoreButton';
import Button from '../components/common/Button';
import Loader from '../components/common/Loader';

// Styles
import '../styles/components/welcome.css';

/**
 * WelcomePage Component
 * Enhanced main landing page with welcome message and project grid
 * 
 * Features:
 * - Dynamic welcome message based on time/username
 * - Display saved projects (3 rows initially)
 * - Animated new project buttons (Visualizer/Tracer)
 * - Show More functionality
 * - Keyboard shortcuts (Ctrl+1 for Visualizer, Ctrl+2 for Tracer)
 * - Loading states with animations
 * - Empty state with call-to-action
 */
const WelcomePage = () => {
  const navigate = useNavigate();
  const { 
    projects, 
    loading, 
    error, 
    getInitialProjects,
    hasMore 
  } = useProjects();
  
  const [showingAll, setShowingAll] = useState(false);
  const [displayProjects, setDisplayProjects] = useState([]);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  /**
   * Initialize displayed projects
   */
  useEffect(() => {
    if (projects.length > 0) {
      const initial = getInitialProjects();
      setDisplayProjects(showingAll ? projects : initial);
    } else {
      setDisplayProjects([]);
    }
  }, [projects, showingAll, getInitialProjects]);

  /**
   * Handle creating a new project
   * @param {string} projectType - 'visualizer' or 'tracer'
   */
  const handleNewProject = (projectType) => {
    const route = getNewEditorRoute(projectType);
    navigate(route);
  };

  /**
   * Handle show more button click
   */
  const handleShowMore = async () => {
    if (!showingAll && hasMore) {
      setIsLoadingMore(true);
      
      // Simulate loading delay for smooth UX
      await new Promise(resolve => setTimeout(resolve, 300));
      
      setShowingAll(true);
      setDisplayProjects(projects);
      setIsLoadingMore(false);
    }
  };

  /**
   * Handle project card click
   * @param {string} projectId - ID of the clicked project
   */
  const handleProjectClick = (projectId) => {
    navigate(`/editor/${projectId}`);
  };

  /**
   * Keyboard shortcuts
   * Ctrl+1: New Visualizer
   * Ctrl+2: New Tracer
   */
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Ctrl+1 or Cmd+1 for Visualizer
      if ((e.ctrlKey || e.metaKey) && e.key === '1') {
        e.preventDefault();
        handleNewProject(PROJECT_TYPES.VISUALIZER);
      }
      
      // Ctrl+2 or Cmd+2 for Tracer
      if ((e.ctrlKey || e.metaKey) && e.key === '2') {
        e.preventDefault();
        handleNewProject(PROJECT_TYPES.TRACER);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  /**
   * Render loading state
   */
  if (loading && projects.length === 0) {
    return (
      <div className="welcome-page">
        <Header />
        <main className="welcome-main loading">
          <Loader size="lg" message="Loading your workspace..." />
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="welcome-page">
      <Header />
      
      <main className="welcome-main">
        <Container>
          {/* Welcome Header with dynamic message */}
          <WelcomeHeader />

          {/* New Project Buttons */}
          <section className="new-project-section">
            <h2 className="section-title">
              Start a New Project
              <span className="gradient-accent">✨</span>
            </h2>
            
            <div className="new-project-buttons">
              <button
                className="new-project-btn"
                onClick={() => handleNewProject(PROJECT_TYPES.VISUALIZER)}
                aria-label="Create new visualizer project"
              >
                <span className="btn-icon">📊</span>
                <span className="btn-text">
                  <strong>New Visualizer</strong>
                  <small>Ctrl+1</small>
                </span>
              </button>
              
              <button
                className="new-project-btn"
                onClick={() => handleNewProject(PROJECT_TYPES.TRACER)}
                aria-label="Create new tracer project"
              >
                <span className="btn-icon">🔍</span>
                <span className="btn-text">
                  <strong>New Tracer</strong>
                  <small>Ctrl+2</small>
                </span>
              </button>
            </div>

            {/* Keyboard shortcuts hint */}
            <div className="keyboard-hint">
              <kbd>Ctrl</kbd> + <kbd>1</kbd> for Visualizer • <kbd>Ctrl</kbd> + <kbd>2</kbd> for Tracer
            </div>
          </section>

          {/* Recent Projects Section */}
          <section className="recent-projects-section">
            <div className="section-header">
              <h2 className="section-title section-title--secondary">
                Recent Projects
              </h2>
              {displayProjects.length > 0 && (
                <span className="project-count">
                  {displayProjects.length} {displayProjects.length === 1 ? 'project' : 'projects'}
                </span>
              )}
            </div>
            
            {/* Error State */}
            {error && (
              <div className="error-message" role="alert">
                <p>{error}</p>
              </div>
            )}
            
            {/* Empty State */}
            {!loading && !error && projects.length === 0 && (
              <div className="empty-state animate-fadeIn">
                <div className="empty-icon">📁</div>
                <h3>No projects yet</h3>
                <p>Create your first visualizer or tracer project to get started!</p>
                
                <div className="empty-actions">
                  <Button
                    variant="primary"
                    size="lg"
                    onClick={() => handleNewProject(PROJECT_TYPES.VISUALIZER)}
                  >
                    Create Your First Project
                  </Button>
                </div>
              </div>
            )}
            
            {/* Projects Grid */}
            {!loading && !error && displayProjects.length > 0 && (
              <>
                <ProjectGrid
                  projects={displayProjects}
                  onProjectClick={handleProjectClick}
                />
                
                {/* Show More Button */}
                {hasMore && !showingAll && (
                  <ShowMoreButton
                    onClick={handleShowMore}
                    loading={isLoadingMore}
                    text={`Show ${projects.length - displayProjects.length} More Projects`}
                  />
                )}
                
                {/* Showing All Message */}
                {showingAll && (
                  <div className="showing-all-message">
                    <p>Showing all {projects.length} projects</p>
                  </div>
                )}
              </>
            )}
          </section>

          {/* Quick Stats (if projects exist) */}
          {displayProjects.length > 0 && (
            <section className="quick-stats">
              <div className="stat-card">
                <span className="stat-icon">📊</span>
                <div className="stat-content">
                  <span className="stat-value">
                    {projects.filter(p => p.type === PROJECT_TYPES.VISUALIZER).length}
                  </span>
                  <span className="stat-label">Visualizers</span>
                </div>
              </div>
              
              <div className="stat-card">
                <span className="stat-icon">🔍</span>
                <div className="stat-content">
                  <span className="stat-value">
                    {projects.filter(p => p.type === PROJECT_TYPES.TRACER).length}
                  </span>
                  <span className="stat-label">Tracers</span>
                </div>
              </div>
              
              <div className="stat-card">
                <span className="stat-icon">💾</span>
                <div className="stat-content">
                  <span className="stat-value">{projects.length}</span>
                  <span className="stat-label">Total Projects</span>
                </div>
              </div>
            </section>
          )}
        </Container>
      </main>

      <Footer />
    </div>
  );
};

export default WelcomePage;
