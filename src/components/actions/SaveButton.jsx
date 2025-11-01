import React, { useState, useEffect } from 'react';
import Button from '../common/Button';
import '../../styles/components/editor.css';

/**
 * SaveButton Component
 * Button to save project with success feedback
 * 
 * @param {function} onClick - Click handler
 * @param {boolean} loading - Loading state
 * @param {boolean} disabled - Disabled state
 */
const SaveButton = ({ onClick, loading = false, disabled = false }) => {
  const [saved, setSaved] = useState(false);

  /**
   * Handle save click
   */
  const handleClick = async () => {
    await onClick();
    
    // Show success state
    setSaved(true);
    
    // Reset after 2 seconds
    setTimeout(() => {
      setSaved(false);
    }, 2000);
  };

  /**
   * Listen for save events
   */
  useEffect(() => {
    const handleSaveEvent = () => {
      handleClick();
    };

    window.addEventListener('editor:save', handleSaveEvent);
    
    return () => {
      window.removeEventListener('editor:save', handleSaveEvent);
    };
  }, [onClick]);

  return (
    <Button
      variant={saved ? 'primary' : 'outline'}
      size="lg"
      onClick={handleClick}
      loading={loading}
      disabled={disabled}
      className={`save-button ${saved ? 'save-button--saved' : ''}`}
    >
      {!loading && (
        <svg
          className="button-icon"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {saved ? (
            // Checkmark icon for saved state
            <polyline points="20 6 9 17 4 12" />
          ) : (
            // Save icon for normal state
            <>
              <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
              <polyline points="17 21 17 13 7 13 7 21" />
              <polyline points="7 3 7 8 15 8" />
            </>
          )}
        </svg>
      )}
      <span>{saved ? 'Saved!' : 'Save'}</span>

      <style jsx>{`
        .save-button {
          min-width: 150px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: var(--space-8);
          position: relative;
          transition: all var(--duration-normal) var(--ease-standard);
        }

        .save-button--saved {
          animation: successPulse 0.5s ease-out;
        }

        @keyframes successPulse {
          0% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
          100% {
            transform: scale(1);
          }
        }

        .button-icon {
          transition: all var(--duration-fast) var(--ease-standard);
        }

        .save-button:hover .button-icon {
          transform: translateY(-2px);
        }

        .save-button--saved .button-icon {
          animation: checkmark 0.5s ease-out;
        }

        @keyframes checkmark {
          0% {
            transform: scale(0) rotate(-45deg);
            opacity: 0;
          }
          50% {
            transform: scale(1.2) rotate(0deg);
          }
          100% {
            transform: scale(1) rotate(0deg);
            opacity: 1;
          }
        }

        @media (max-width: 768px) {
          .save-button {
            width: 100%;
          }
        }
      `}</style>
    </Button>
  );
};

export default SaveButton;
