import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useEditor from '../hooks/useEditor';
import useProjects from '../hooks/useProjects';
import useResponsive from '../hooks/useResponsive';
import useCodeExecution from '../hooks/useCodeExecution';
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
 * EditorPage Component - Enhanced Version
 * Main code editor page with working execution, visualization, and tracing
 * 
 * Features:
 * - Monaco editor with language and theme selection
 * - Working code execution with output display
 * - Visualization and tracing functionality
 * - Split-panel layout (editor + output)
 * - Dynamic padding based on screen size
 * - Auto-save functionality
 * - Keyboard shortcuts (Ctrl+S to save, Ctrl+Enter to run)
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
    hasUnsavedChanges,
    markAsSaved,
  } = useEditor();

  const { getProjectById, saveProject } = useProjects();
  
  const {
    executing,
    result,
    error: executionError,
    output,
    visualizationData,
    traceData,
    run,
    visualize,
    trace,
    reset: resetExecution,
  } = useCodeExecution();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [projectName, setProjectName] = useState('');
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [currentProjectType, setCurrentProjectType] = useState(projectType || 'visualizer');
  const [showOutput, setShowOutput] = useState(false);
  const [outputMode, setOutputMode] = useState('console'); // 'console', 'visualization', 'trace'
  const [currentProjectId, setCurrentProjectId] = useState(null);

  /**
   * Load existing project or initialize new one
   */
  useEffect(() => {
    const initializeEditor = async () => {
      try {
        setLoading(true);

        if (projectId && projectId !== 'new') {
          // Load existing project
          const project = getProjectById(projectId);
          if (project) {
            loadProject(project);
            setProjectName(project.name);
            setCurrentProjectType(project.type);
            setCurrentProjectId(project.id);
          } else {
            // Project not found, redirect to home
            navigate(ROUTES.HOME);
          }
        } else {
          // New project - set defaults
          const defaultName = `Untitled ${currentProjectType}`;
          setProjectName(defaultName);
          setCurrentProjectType(projectType || 'visualizer');
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
    if (!code || code.trim() === '') {
      alert('Please write some code first!');
      return;
    }

    resetExecution();
    setShowOutput(true);
    setOutputMode('console');
    
    const response = await run(code, language);
    
    if (response && response.success) {
      console.log('Code executed successfully:', response);
    }
  };

  /**
   * Handle Visualize/Trace button click
   */
  const handleVisualize = async () => {
    if (!code || code.trim() === '') {
      alert('Please write some code first!');
      return;
    }

    resetExecution();
    setShowOutput(true);
    
    if (currentProjectType === 'visualizer') {
      setOutputMode('visualization');
      const response = await visualize(code, language);
      console.log('Visualization response:', response);
    } else {
      setOutputMode('trace');
      const response = await trace(code, language);
      console.log('Trace response:', response);
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
      const savedProject = saveProject({
        id: currentProjectId,
        name: name || projectName,
        type: currentProjectType,
        code,
        language,
        theme,
      });
      
      if (savedProject && savedProject.id) {
        setCurrentProjectId(savedProject.id);
        setProjectName(name || projectName);
        markAsSaved();
        
        // Update URL if new project
        if (!currentProjectId || projectId === 'new') {
          navigate(`/editor/${savedProject.id}`, { replace: true });
        }
      }
      
      setShowSaveModal(false);
    } catch (error) {
      console.error('Error saving project:', error);
      alert('Failed to save project. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  /**
   * Handle back navigation with unsaved changes check
   */
  const handleBack = () => {
    if (hasUnsavedChanges) {
      const confirm = window.confirm('You have unsaved changes. Are you sure you want to leave?');
      if (!confirm) return;
    }
    navigate(ROUTES.HOME);
  };

  /**
   * Keyboard shortcuts
   */
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Ctrl+S or Cmd+S to save
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        handleSave();
      }
      
      // Ctrl+Enter or Cmd+Enter to run
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        handleRun();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [code, language]);

  if (loading) {
    return (
      <div className="editor-page-loading">
        <Loader size="lg" message="Loading editor..." />
      </div>
    );
  }

  return (
    <div className="editor-page">
      <Header showBackButton onBack={handleBack} />

      <main className="editor-main">
        {/* Editor Toolbar */}
        <EditorToolbar
          language={language}
          theme={theme}
          onLanguageChange={handleLanguageChange}
          onThemeChange={handleThemeChange}
          projectName={projectName}
          projectType={currentProjectType}
        />

        {/* Split Panel Layout */}
        <div className="editor-workspace">
          {/* Left Panel - Code Editor */}
          <div className={`editor-panel ${showOutput ? 'with-output' : 'full-width'}`}>
            <EditorContainer padding={padding}>
              <MonacoEditor
                value={code}
                language={language}
                theme={theme}
                onChange={handleCodeChange}
                height={showOutput ? '70vh' : '75vh'}
              />
            </EditorContainer>
          </div>

          {/* Right Panel - Output/Visualization/Trace */}
          {showOutput && (
            <div className="output-panel">
              <div className="output-header">
                <div className="output-tabs">
                  <button
                    className={`output-tab ${outputMode === 'console' ? 'active' : ''}`}
                    onClick={() => setOutputMode('console')}
                  >
                    Console
                  </button>
                  <button
                    className={`output-tab ${outputMode === 'visualization' ? 'active' : ''}`}
                    onClick={() => setOutputMode('visualization')}
                  >
                    Visualization
                  </button>
                  <button
                    className={`output-tab ${outputMode === 'trace' ? 'active' : ''}`}
                    onClick={() => setOutputMode('trace')}
                  >
                    Trace
                  </button>
                </div>
                <button
                  className="close-output-btn"
                  onClick={() => setShowOutput(false)}
                  aria-label="Close output panel"
                >
                  ✕
                </button>
              </div>

              <div className="output-content">
                {executing && (
                  <div className="output-loading">
                    <Loader message={`${outputMode === 'console' ? 'Executing' : outputMode === 'visualization' ? 'Visualizing' : 'Tracing'} code...`} />
                  </div>
                )}

                {!executing && outputMode === 'console' && (
                  <div className="console-output">
                    {executionError && (
                      <div className="output-error">
                        <strong>Error:</strong>
                        <pre>{executionError}</pre>
                      </div>
                    )}
                    
                    {!executionError && output && (
                      <div className="output-success">
                        <strong>Output:</strong>
                        <pre>{output}</pre>
                      </div>
                    )}
                    
                    {!executionError && !output && !executing && (
                      <div className="output-empty">
                        <p>No output yet. Click "Run Code" to execute.</p>
                      </div>
                    )}
                  </div>
                )}

                {!executing && outputMode === 'visualization' && (
                  <div className="visualization-output">
                    {visualizationData ? (
                      <div className="viz-container">
                        <h3>Execution Steps</h3>
                        {visualizationData.steps && visualizationData.steps.map((step, index) => (
                          <div key={index} className="viz-step">
                            <div className="step-number">{index + 1}</div>
                            <div className="step-content">
                              <div className="step-line">Line {step.line}</div>
                              <div className="step-action">{step.action}</div>
                              {step.state && (
                                <div className="step-state">
                                  <strong>Variables:</strong>
                                  <pre>{JSON.stringify(step.state.variables, null, 2)}</pre>
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="output-empty">
                        <p>No visualization data. Click "Visualize" to generate.</p>
                      </div>
                    )}
                  </div>
                )}

                {!executing && outputMode === 'trace' && (
                  <div className="trace-output">
                    {traceData ? (
                      <div className="trace-container">
                        <h3>Execution Trace</h3>
                        {traceData.trace && traceData.trace.map((trace, index) => (
                          <div key={index} className="trace-step">
                            <div className="trace-step-header">
                              <span className="trace-step-number">Step {trace.step}</span>
                              <span className="trace-line">Line {trace.line}</span>
                              <span className="trace-time">{trace.timestamp}s</span>
                            </div>
                            <div className="trace-code">{trace.lineContent}</div>
                            <div className="trace-action">{trace.action}</div>
                            {trace.variables && Object.keys(trace.variables).length > 0 && (
                              <div className="trace-variables">
                                <strong>Variables:</strong>
                                <pre>{JSON.stringify(trace.variables, null, 2)}</pre>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="output-empty">
                        <p>No trace data. Click "Trace" to generate.</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <ActionButtons
          onRun={handleRun}
          onVisualize={handleVisualize}
          onSave={handleSave}
          executing={executing}
          saving={saving}
          projectType={currentProjectType}
        />
      </main>

      {/* Save Modal */}
      {showSaveModal && (
        <Modal
          title="Save Project"
          onClose={() => setShowSaveModal(false)}
          size="sm"
        >
          <div className="save-modal-content">
            <label htmlFor="project-name" className="form-label">
              Project Name
            </label>
            <input
              id="project-name"
              type="text"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              placeholder="Enter project name"
              className="form-control"
              autoFocus
            />
          </div>
          <div className="modal-footer">
            <button
              className="btn btn--secondary"
              onClick={() => setShowSaveModal(false)}
              disabled={saving}
            >
              Cancel
            </button>
            <button
              className="btn btn--primary"
              onClick={() => handleConfirmSave(projectName)}
              disabled={saving || !projectName.trim()}
            >
              {saving ? 'Saving...' : 'Save'}
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default EditorPage;
