import React from 'react';
import '../../styles/components/editor.css';

/**
 * EditorContainer Component
 * Wrapper for Monaco editor with dynamic padding based on screen dimensions
 * Implements PO2 requirement: "variable left and right padding based on screen dimensions"
 * 
 * @param {React.ReactNode} children - Monaco editor component
 * @param {number} padding - Dynamic padding value from useResponsive hook
 * @param {string} className - Additional CSS classes
 */
const EditorContainer = ({ children, padding = 16, className = '' }) => {
  return (
    <div
      className={`editor-container ${className}`}
      style={{
        '--editor-padding-x': `${padding}px`,
      }}
    >
      <div className="editor-wrapper">
        {children}
      </div>

      <style jsx>{`
        .editor-container {
          width: 100%;
          padding: var(--space-16) var(--editor-padding-x, 16px);
          background-color: var(--color-background);
        }

        .editor-wrapper {
          max-width: 100%;
          margin: 0 auto;
          position: relative;
        }

        /* Responsive adjustments */
        @media (max-width: 768px) {
          .editor-container {
            padding: var(--space-12) var(--space-8);
          }
        }

        @media (min-width: 1440px) {
          .editor-wrapper {
            max-width: 1400px;
          }
        }

        /* Editor status bar (optional enhancement) */
        .editor-container::after {
          content: '';
          display: block;
          height: 1px;
          background: linear-gradient(
            90deg,
            transparent,
            var(--color-border),
            transparent
          );
          margin-top: var(--space-16);
        }
      `}</style>
    </div>
  );
};

export default EditorContainer;
