import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useEditor from '../hooks/useEditor';
import useProjects from '../hooks/useProjects';
import useResponsive from '../hooks/useResponsive';
import { ROUTES } from '../config/routes';

// Components
import Header from '../components/layout/Header';
import Container from '../components/layout/Container';
import EditorContainer from '../components/editor/EditorContainer';
import EditorToolbar from '../components/editor/EditorToolbar';
import MonacoEditor from '../components/editor/MonacoEditor';
import ActionButtons from '../components/actions/ActionButtons';
import Loader from '../components/common/Loader';
import Modal from '../components/common/Modal';

// Styles
import '../styles/components/editor.css';

/**
 * EditorPage Component
 * Main code editor page with Monaco Editor integration
 * 
 * Features:
 * - Monaco editor with language and theme selection
 * - Dynamic padding based on screen size
 * - Run, Visualize/Trace, Save functionality
 * - Load existing projects or create new ones
 */
const EditorPage = () => {
  const { projectId, projectType } = useParams();
  const navigate = useNavigate();
  const { padding } = useResponsive();
  
  const {
    code,
    language,
    theme,
    setCode,
    setLanguage,
    setTheme,
    loadProject,
  } = useEditor();

  const { getProjectById, saveProject } = useProjects();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [executing, setExecuting] = useState(false);
  const [projectName, setProjectName] = useState('');
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [currentProjectType, setCurrentProjectType] = useState(projectType || 'visualizer');

  /**
   * Load existing project or initialize new one
   */
  useEffect(() => {
    const initializeEditor = async () => {
      try {
        setLoading(true);

        if (projectId && projectId !== 'new') {
          // Load existing project
          const project = await getProjectById(projectId);
          if (project) {
            loadProject(project);
            setProjectName(project.name);
            setCurrentProjectType(project.type);
          } else {
            // Project not found, redirect to home
            navigate(ROUTES.HOME);
          }
        } else {
          // New project - set defaults
          setProjectName(`Untitled ${currentProjectType}`);
        }
      } catch (error) {
        console.error('Error initializing editor:', error);
      } finally {
        setLoading(false);
      }
    };

    initializeEditor();
  }, [projectId, projectType]);

  /**
   * Handle code change
   */
  const handleCodeChange = (newCode) => {
    setCode(newCode);
  };

  /**
   * Handle language change
   */
  const handleLanguageChange = (newLanguage) => {
    setLanguage(newLanguage);
  };

  /**
   * Handle theme change
   */
  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
  };

  /**
   * Handle Run button click
   */
  const handleRun = async () => {
    setExecuting(true);
    try {
      // Code execution logic will be implemented in RunButton component
      console.log('Running code:', code);
    } catch (error) {
      console.error('Error running code:', error);
    } finally {
      setExecuting(false);
    }
  };

  /**
   * Handle Visualize/Trace button click
   */
  const handleVisualize = async () => {
    setExecuting(true);
    try {
      // Visualization/Tracing logic will be implemented in VisualizeButton component
      console.log('Visualizing code:', code);
    } catch (error) {
      console.error('Error visualizing code:', error);
    } finally {
      setExecuting(false);
    }
  };

  /**
   * Handle Save button click
   */
  const handleSave = () => {
    setShowSaveModal(true);
  };

  /**
   * Confirm save with project name
   */
  const handleConfirmSave = async (name) => {
    setSaving(true);
    try {
      await saveProject({
        id: projectId && projectId !== 'new' ? projectId : undefined,
        name: name || projectName,
        type: currentProjectType,
        code,
        language,
        theme,
      });
      setShowSaveModal(false);
      // Optionally show success message
    } catch (error) {
      console.error('Error saving project:', error);
    } finally {
      setSaving(false);
    }
  };

  /**
   * Handle back navigation
   */
  const handleBack = () => {
    navigate(ROUTES.HOME);
  };

  if (loading) {
    return (
      <div className="editor-page-loading">
        <Loader message="Loading editor..." />
      </div>
    );
  }

  return (
    <div className="editor-page">
      <Header showBackButton onBack={handleBack} />

      <main className="editor-main">
        <Container fullWidth>
          {/* Editor Toolbar - Language and Theme Selectors */}
          <EditorToolbar
            language={language}
            theme={theme}
            onLanguageChange={handleLanguageChange}
            onThemeChange={handleThemeChange}
            projectName={projectName}
            projectType={currentProjectType}
          />

          {/* Editor Container with dynamic padding */}
          <EditorContainer padding={padding}>
            <MonacoEditor
              value={code}
              language={language}
              theme={theme}
              onChange={handleCodeChange}
            />
          </EditorContainer>

          {/* Action Buttons - Run, Visualize, Save */}
          <ActionButtons
            onRun={handleRun}
            onVisualize={handleVisualize}
            onSave={handleSave}
            executing={executing}
            saving={saving}
            projectType={currentProjectType}
          />
        </Container>
      </main>

      {/* Save Modal */}
      {showSaveModal && (
        <Modal
          title="Save Project"
          onClose={() => setShowSaveModal(false)}
          onConfirm={handleConfirmSave}
          loading={saving}
        >
          <div className="save-modal-content">
            <label htmlFor="project-name">Project Name</label>
            <input
              id="project-name"
              type="text"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              placeholder="Enter project name"
              className="form-control"
            />
          </div>
        </Modal>
      )}
    </div>
  );
};

export default EditorPage;
