import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProjects } from '../hooks/useProjects';
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
 * Main landing page with welcome message and project grid
 * 
 * Features:
 * - Dynamic welcome message based on time/username
 * - Display saved projects (3 rows initially)
 * - New Project buttons (Visualizer/Tracer)
 * - Show More functionality
 */
const WelcomePage = () => {
  const navigate = useNavigate();
  const { projects, loading, error, loadMore, hasMore } = useProjects();
  const [showingAll, setShowingAll] = useState(false);

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
  const handleShowMore = () => {
    if (!showingAll) {
      loadMore();
      setShowingAll(true);
    }
  };

  /**
   * Handle project card click
   * @param {string} projectId - ID of the clicked project
   */
  const handleProjectClick = (projectId) => {
    navigate(`/editor/${projectId}`);
  };

  return (
    <div className="welcome-page">
      <Header />
      
      <main className="welcome-main">
        <Container>
          {/* Welcome Header with dynamic message */}
          <WelcomeHeader />

          {/* New Project Buttons */}
          <div className="new-project-section">
            <h2 className="section-title">Start a New Project</h2>
            <div className="new-project-buttons">
              <Button
                variant="primary"
                size="lg"
                onClick={() => handleNewProject(PROJECT_TYPES.VISUALIZER)}
                className="new-project-btn"
              >
                <span className="btn-icon">📊</span>
                New Visualizer
              </Button>
              
              <Button
                variant="primary"
                size="lg"
                onClick={() => handleNewProject(PROJECT_TYPES.TRACER)}
                className="new-project-btn"
              >
                <span className="btn-icon">🔍</span>
                New Tracer
              </Button>
            </div>
          </div>

          {/* Recent Projects Section */}
          <div className="recent-projects-section">
            <h2 className="section-title">Recent Projects</h2>
            
            {loading && <Loader message="Loading projects..." />}
            
            {error && (
              <div className="error-message">
                <p>⚠️ {error}</p>
              </div>
            )}
            
            {!loading && !error && projects.length === 0 && (
              <div className="empty-state">
                <div className="empty-icon">📁</div>
                <h3>No projects yet</h3>
                <p>Create your first visualizer or tracer project to get started!</p>
              </div>
            )}
            
            {!loading && !error && projects.length > 0 && (
              <>
                <ProjectGrid
                  projects={projects}
                  onProjectClick={handleProjectClick}
                />
                
                {hasMore && (
                  <ShowMoreButton
                    onClick={handleShowMore}
                    loading={loading}
                  />
                )}
              </>
            )}
          </div>
        </Container>
      </main>

      <Footer />
    </div>
  );
};

export default WelcomePage;
