import React from 'react';
import Button from '../common/Button';
import '../../styles/components/editor.css';

/**
 * RunButton Component
 * Button to execute code
 * 
 * @param {function} onClick - Click handler
 * @param {boolean} loading - Loading state
 * @param {boolean} disabled - Disabled state
 */
const RunButton = ({ onClick, loading = false, disabled = false }) => {
  return (
    <Button
      variant="primary"
      size="lg"
      onClick={onClick}
      loading={loading}
      disabled={disabled}
      className="run-button"
    >
      {!loading && (
        <svg
          className="button-icon"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <polygon points="5 3 19 12 5 21 5 3" />
        </svg>
      )}
      <span>Run Code</span>

      <style jsx>{`
        .run-button {
          min-width: 150px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: var(--space-8);
          position: relative;
        }

        .button-icon {
          transition: transform var(--duration-fast) var(--ease-standard);
        }

        .run-button:hover .button-icon {
          transform: scale(1.1);
        }

        .run-button:active .button-icon {
          transform: scale(0.95);
        }

        @media (max-width: 768px) {
          .run-button {
            width: 100%;
          }
        }
      `}</style>
    </Button>
  );
};

export default RunButton;
