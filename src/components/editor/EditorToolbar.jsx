import React from 'react';
import LanguageSelector from './LanguageSelector';
import ThemeSelector from './ThemeSelector';
import '../../styles/components/editor.css';

/**
 * EditorToolbar Component
 * Top toolbar with language and theme selectors
 * Positioned at the top as per PO2 requirement
 * 
 * @param {string} language - Current language
 * @param {string} theme - Current theme
 * @param {function} onLanguageChange - Language change handler
 * @param {function} onThemeChange - Theme change handler
 * @param {string} projectName - Current project name
 * @param {string} projectType - Project type (visualizer/tracer)
 */
const EditorToolbar = ({
  language,
  theme,
  onLanguageChange,
  onThemeChange,
  projectName,
  projectType,
}) => {
  return (
    <div className="editor-toolbar">
      <div className="toolbar-left">
        {/* Project Info */}
        <div className="project-info">
          <div className="project-icon">
            {projectType === 'visualizer' ? '📊' : '🔍'}
          </div>
          <div className="project-details">
            <h2 className="project-name">{projectName}</h2>
            <span className="project-type">{projectType}</span>
          </div>
        </div>
      </div>

      <div className="toolbar-right">
        {/* Language Selector */}
        <LanguageSelector
          value={language}
          onChange={onLanguageChange}
        />

        {/* Theme Selector */}
        <ThemeSelector
          value={theme}
          onChange={onThemeChange}
        />

        {/* Editor Actions */}
        <div className="toolbar-actions">
          <button
            className="toolbar-action-btn"
            title="Format Code (Shift+Alt+F)"
            onClick={() => window.monacoEditor?.format()}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <polyline points="4 7 4 4 20 4 20 7" />
              <line x1="9" y1="20" x2="15" y2="20" />
              <line x1="12" y1="4" x2="12" y2="20" />
            </svg>
          </button>

          <button
            className="toolbar-action-btn"
            title="Settings"
            onClick={() => {
              // Open settings modal (to be implemented)
              window.dispatchEvent(new CustomEvent('editor:settings'));
            }}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="12" cy="12" r="3" />
              <path d="M12 1v6m0 6v6m5.657-13.657l-4.243 4.243m-2.828 2.828l-4.243 4.243m16.97 1.313l-6-1.732m-6 1.732l-6-1.732m13.86-13.86l-1.732 6m1.732 6l-1.732 6" />
            </svg>
          </button>
        </div>
      </div>

      <style jsx>{`
        .editor-toolbar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: var(--space-12) var(--space-16);
          background-color: var(--color-surface);
          border-bottom: 1px solid var(--color-border);
          gap: var(--space-16);
          flex-wrap: wrap;
        }

        .toolbar-left,
        .toolbar-right {
          display: flex;
          align-items: center;
          gap: var(--space-16);
        }

        .project-info {
          display: flex;
          align-items: center;
          gap: var(--space-12);
        }

        .project-icon {
          font-size: 24px;
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: var(--color-secondary);
          border-radius: var(--radius-base);
        }

        .project-details {
          display: flex;
          flex-direction: column;
        }

        .project-name {
          font-size: var(--font-size-lg);
          font-weight: var(--font-weight-semibold);
          color: var(--color-text);
          margin: 0;
          line-height: 1.2;
        }

        .project-type {
          font-size: var(--font-size-xs);
          color: var(--color-text-secondary);
          text-transform: capitalize;
          line-height: 1.2;
        }

        .toolbar-actions {
          display: flex;
          align-items: center;
          gap: var(--space-8);
        }

        .toolbar-action-btn {
          width: 36px;
          height: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: transparent;
          border: 1px solid var(--color-border);
          border-radius: var(--radius-base);
          color: var(--color-text-secondary);
          cursor: pointer;
          transition: all var(--duration-fast) var(--ease-standard);
        }

        .toolbar-action-btn:hover {
          background-color: var(--color-secondary);
          border-color: var(--color-primary);
          color: var(--color-primary);
        }

        @media (max-width: 768px) {
          .editor-toolbar {
            flex-direction: column;
            align-items: stretch;
          }

          .toolbar-left,
          .toolbar-right {
            width: 100%;
            justify-content: space-between;
          }

          .project-details {
            flex: 1;
          }
        }
      `}</style>
    </div>
  );
};

export default EditorToolbar;
