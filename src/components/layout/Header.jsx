import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useThemeContext } from '../../context/ThemeContext';
import { ROUTES } from '../../config/routes';
import Button from '../common/Button';
import '../../styles/components/common.css';

/**
 * Header Component
 * Application header with logo, navigation, and theme toggle
 * 
 * @param {boolean} showBackButton - Show back button for editor page
 * @param {function} onBack - Back button handler
 */
const Header = ({ showBackButton = false, onBack }) => {
  const navigate = useNavigate();
  const { toggleTheme, isDark } = useThemeContext();

  const handleLogoClick = () => {
    navigate(ROUTES.HOME);
  };

  const handleBackClick = () => {
    if (onBack) {
      onBack();
    } else {
      navigate(-1);
    }
  };

  return (
    <header className="app-header">
      <div className="header-container">
        {/* Left Section - Logo/Back Button */}
        <div className="header-left">
          {showBackButton ? (
            <button
              className="back-button"
              onClick={handleBackClick}
              aria-label="Go back"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="15 18 9 12 15 6" />
              </svg>
              <span className="back-text">Back</span>
            </button>
          ) : (
            <div className="header-logo" onClick={handleLogoClick}>
              <div className="logo-icon">
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M12 2L2 7l10 5 10-5-10-5z" />
                  <path d="M2 17l10 5 10-5" />
                  <path d="M2 12l10 5 10-5" />
                </svg>
              </div>
              <div className="logo-text">
                <span className="logo-title">Visualizer & Tracer</span>
                <span className="logo-subtitle">Code Insight Tool</span>
              </div>
            </div>
          )}
        </div>

        {/* Right Section - Theme Toggle & Actions */}
        <div className="header-right">
          {/* Theme Toggle */}
          <button
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
            title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
          >
            {isDark ? (
              // Sun icon for light mode
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="5" />
                <line x1="12" y1="1" x2="12" y2="3" />
                <line x1="12" y1="21" x2="12" y2="23" />
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                <line x1="1" y1="12" x2="3" y2="12" />
                <line x1="21" y1="12" x2="23" y2="12" />
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
              </svg>
            ) : (
              // Moon icon for dark mode
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            )}
          </button>

          {/* User Info (Optional - for future enhancement) */}
          <div className="header-user">
            <div className="user-avatar">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .app-header {
          background-color: var(--color-surface);
          border-bottom: 1px solid var(--color-border);
          position: sticky;
          top: 0;
          z-index: 100;
          box-shadow: var(--shadow-sm);
        }

        .header-container {
          max-width: 100%;
          padding: var(--space-16) var(--space-24);
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .header-left {
          display: flex;
          align-items: center;
        }

        .back-button {
          display: flex;
          align-items: center;
          gap: var(--space-8);
          background: transparent;
          border: none;
          color: var(--color-text);
          font-size: var(--font-size-base);
          font-weight: var(--font-weight-medium);
          cursor: pointer;
          padding: var(--space-8) var(--space-12);
          border-radius: var(--radius-base);
          transition: all var(--duration-fast) var(--ease-standard);
        }

        .back-button:hover {
          background-color: var(--color-secondary);
        }

        .back-text {
          font-size: var(--font-size-base);
        }

        .header-logo {
          display: flex;
          align-items: center;
          gap: var(--space-12);
          cursor: pointer;
          user-select: none;
        }

        .logo-icon {
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, var(--color-primary), var(--color-primary-hover));
          border-radius: var(--radius-base);
          color: var(--color-btn-primary-text);
        }

        .logo-text {
          display: flex;
          flex-direction: column;
        }

        .logo-title {
          font-size: var(--font-size-lg);
          font-weight: var(--font-weight-bold);
          color: var(--color-text);
          line-height: 1.2;
        }

        .logo-subtitle {
          font-size: var(--font-size-xs);
          color: var(--color-text-secondary);
          line-height: 1.2;
        }

        .header-right {
          display: flex;
          align-items: center;
          gap: var(--space-16);
        }

        .theme-toggle {
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: transparent;
          border: 1px solid var(--color-border);
          border-radius: var(--radius-base);
          color: var(--color-text);
          cursor: pointer;
          transition: all var(--duration-fast) var(--ease-standard);
        }

        .theme-toggle:hover {
          background-color: var(--color-secondary);
          border-color: var(--color-primary);
        }

        .header-user {
          display: flex;
          align-items: center;
        }

        .user-avatar {
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: var(--color-secondary);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-full);
          color: var(--color-text-secondary);
          cursor: pointer;
          transition: all var(--duration-fast) var(--ease-standard);
        }

        .user-avatar:hover {
          background-color: var(--color-secondary-hover);
          border-color: var(--color-primary);
        }

        @media (max-width: 768px) {
          .logo-text {
            display: none;
          }

          .back-text {
            display: none;
          }

          .header-container {
            padding: var(--space-12) var(--space-16);
          }
        }
      `}</style>
    </header>
  );
};

export default Header;
