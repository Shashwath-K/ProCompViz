import React from 'react';
import RunButton from './RunButton';
import VisualizeButton from './VisualizeButton';
import SaveButton from './SaveButton';
import '../../styles/components/editor.css';

/**
 * ActionButtons Component
 * Container for Run, Visualize/Trace, and Save buttons
 * Implements PO3 requirement: "provide 3 options - Run, Visualize/Trace, Save"
 * 
 * @param {function} onRun - Run handler
 * @param {function} onVisualize - Visualize/Trace handler
 * @param {function} onSave - Save handler
 * @param {boolean} executing - Execution state
 * @param {boolean} saving - Saving state
 * @param {string} projectType - 'visualizer' or 'tracer'
 */
const ActionButtons = ({
  onRun,
  onVisualize,
  onSave,
  executing = false,
  saving = false,
  projectType = 'visualizer',
}) => {
  return (
    <div className="action-buttons">
      <div className="action-buttons-container">
        {/* Run Button */}
        <RunButton
          onClick={onRun}
          loading={executing}
          disabled={saving}
        />

        {/* Visualize/Trace Button */}
        <VisualizeButton
          onClick={onVisualize}
          loading={executing}
          disabled={saving}
          projectType={projectType}
        />

        {/* Save Button */}
        <SaveButton
          onClick={onSave}
          loading={saving}
          disabled={executing}
        />
      </div>

      {/* Keyboard Shortcuts Info */}
      <div className="keyboard-shortcuts">
        <span className="shortcut-hint">
          <kbd>Ctrl</kbd> + <kbd>Enter</kbd> to Run
        </span>
        <span className="shortcut-divider">•</span>
        <span className="shortcut-hint">
          <kbd>Ctrl</kbd> + <kbd>S</kbd> to Save
        </span>
      </div>

      <style jsx>{`
        .action-buttons {
          padding: var(--space-24) var(--space-16);
          background-color: var(--color-surface);
          border-top: 1px solid var(--color-border);
        }

        .action-buttons-container {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: var(--space-16);
          flex-wrap: wrap;
          max-width: 800px;
          margin: 0 auto;
        }

        .keyboard-shortcuts {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: var(--space-12);
          margin-top: var(--space-16);
          font-size: var(--font-size-sm);
          color: var(--color-text-secondary);
        }

        .shortcut-hint {
          display: flex;
          align-items: center;
          gap: var(--space-4);
        }

        kbd {
          display: inline-block;
          padding: 2px 6px;
          font-family: var(--font-family-mono);
          font-size: var(--font-size-xs);
          color: var(--color-text);
          background-color: var(--color-secondary);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-sm);
          box-shadow: var(--shadow-xs);
        }

        .shortcut-divider {
          opacity: 0.5;
        }

        @media (max-width: 768px) {
          .action-buttons-container {
            flex-direction: column;
            width: 100%;
          }

          .keyboard-shortcuts {
            flex-direction: column;
            gap: var(--space-8);
          }
        }
      `}</style>
    </div>
  );
};

export default ActionButtons;
