import React from 'react';
import Button from '../common/Button';
import '../../styles/components/welcome.css';

/**
 * ShowMoreButton Component
 * Button to load more projects
 * 
 * @param {function} onClick - Click handler
 * @param {boolean} loading - Loading state
 * @param {string} text - Button text
 */
const ShowMoreButton = ({
  onClick,
  loading = false,
  text = 'Show More Projects',
}) => {
  return (
    <div className="show-more-container">
      <Button
        variant="outline"
        size="lg"
        onClick={onClick}
        loading={loading}
        className="show-more-button"
      >
        {!loading && (
          <svg
            className="show-more-icon"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        )}
        <span>{loading ? 'Loading...' : text}</span>
      </Button>

      <style jsx>{`
        .show-more-container {
          display: flex;
          justify-content: center;
          margin-top: var(--space-32);
          margin-bottom: var(--space-24);
        }

        .show-more-button {
          min-width: 200px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: var(--space-8);
        }

        .show-more-icon {
          transition: transform var(--duration-fast) var(--ease-standard);
        }

        .show-more-button:hover .show-more-icon {
          transform: translateY(3px);
        }
      `}</style>
    </div>
  );
};

export default ShowMoreButton;
