import React from 'react';
import '../../styles/components/common.css';

/**
 * Loader Component
 * Reusable loading spinner
 * 
 * @param {string} size - 'sm' | 'md' | 'lg'
 * @param {string} message - Loading message
 * @param {boolean} fullScreen - Full screen overlay
 * @param {string} variant - 'spinner' | 'dots' | 'pulse'
 */
const Loader = ({
  size = 'md',
  message = '',
  fullScreen = false,
  variant = 'spinner',
  className = '',
}) => {
  const loaderClasses = [
    'loader',
    `loader--${size}`,
    `loader--${variant}`,
    fullScreen ? 'loader--fullscreen' : '',
    className,
  ].filter(Boolean).join(' ');

  /**
   * Spinner variant
   */
  const renderSpinner = () => (
    <div className="loader-spinner">
      <svg
        className="spinner"
        viewBox="0 0 50 50"
        width="40"
        height="40"
      >
        <circle
          className="spinner-path"
          cx="25"
          cy="25"
          r="20"
          fill="none"
          strokeWidth="4"
        />
      </svg>
    </div>
  );

  /**
   * Dots variant
   */
  const renderDots = () => (
    <div className="loader-dots">
      <span className="dot"></span>
      <span className="dot"></span>
      <span className="dot"></span>
    </div>
  );

  /**
   * Pulse variant
   */
  const renderPulse = () => (
    <div className="loader-pulse">
      <div className="pulse-ring"></div>
      <div className="pulse-ring"></div>
      <div className="pulse-ring"></div>
    </div>
  );

  const renderLoader = () => {
    switch (variant) {
      case 'dots':
        return renderDots();
      case 'pulse':
        return renderPulse();
      case 'spinner':
      default:
        return renderSpinner();
    }
  };

  const content = (
    <div className={loaderClasses}>
      {renderLoader()}
      {message && <p className="loader-message">{message}</p>}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="loader-overlay">
        {content}
      </div>
    );
  }

  return content;
};

export default Loader;
