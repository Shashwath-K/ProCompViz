import React from 'react';
import Button from '../common/Button';
import '../../styles/components/editor.css';

/**
 * VisualizeButton Component
 * Button to visualize or trace code execution
 * Label changes based on project type
 * 
 * @param {function} onClick - Click handler
 * @param {boolean} loading - Loading state
 * @param {boolean} disabled - Disabled state
 * @param {string} projectType - 'visualizer' or 'tracer'
 */
const VisualizeButton = ({
  onClick,
  loading = false,
  disabled = false,
  projectType = 'visualizer',
}) => {
  const isVisualizer = projectType === 'visualizer';
  const buttonText = isVisualizer ? 'Visualize' : 'Trace';
  const buttonIcon = isVisualizer ? '📊' : '🔍';

  return (
    <Button
      variant="secondary"
      size="lg"
      onClick={onClick}
      loading={loading}
      disabled={disabled}
      className="visualize-button"
    >
      {!loading && (
        <span className="button-emoji">{buttonIcon}</span>
      )}
      <span>{buttonText}</span>

      <style jsx>{`
        .visualize-button {
          min-width: 150px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: var(--space-8);
          position: relative;
        }

        .button-emoji {
          font-size: 18px;
          transition: transform var(--duration-fast) var(--ease-standard);
        }

        .visualize-button:hover .button-emoji {
          transform: scale(1.2) rotate(5deg);
        }

        .visualize-button:active .button-emoji {
          transform: scale(0.9);
        }

        @media (max-width: 768px) {
          .visualize-button {
            width: 100%;
          }
        }
      `}</style>
    </Button>
  );
};

export default VisualizeButton;
