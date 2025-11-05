import React from 'react';
import { CONFIG } from '../../config/environment';

/**
 * Footer Component
 * Application footer with copyright and links
 */
const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="app-footer">
      <div className="footer-container">
        {/* Footer Content */}
        <div className="footer-content">
          <div className="footer-section">
            <p className="footer-copyright">
              &copy; {currentYear} {CONFIG.APP.NAME}. All rights reserved.
            </p>
            <p className="footer-version">
              Version {CONFIG.APP.VERSION}
            </p>
          </div>

          <div className="footer-links">
            <a href="#" className="footer-link">Documentation</a>
            <span className="footer-divider">•</span>
            <a href="#" className="footer-link">GitHub</a>
            <span className="footer-divider">•</span>
            <a href="#" className="footer-link">Report Issue</a>
          </div>
        </div>

        {/* Footer Note */}
        <div className="footer-note">
          <p>Built with ❤️ for developers who love code visualization</p>
        </div>
      </div>

      <style jsx>{`
        .app-footer {
          background-color: var(--color-surface);
          border-top: 1px solid var(--color-border);
          margin-top: auto;
          padding: var(--space-24) 0;
        }

        .footer-container {
          max-width: var(--container-xl);
          margin: 0 auto;
          padding: 0 var(--space-24);
        }

        .footer-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: var(--space-16);
          margin-bottom: var(--space-16);
        }

        .footer-section {
          display: flex;
          flex-direction: column;
          gap: var(--space-4);
        }

        .footer-copyright {
          font-size: var(--font-size-sm);
          color: var(--color-text-secondary);
          margin: 0;
        }

        .footer-version {
          font-size: var(--font-size-xs);
          color: var(--color-text-secondary);
          font-family: var(--font-family-mono);
          margin: 0;
        }

        .footer-links {
          display: flex;
          align-items: center;
          gap: var(--space-12);
          flex-wrap: wrap;
        }

        .footer-link {
          font-size: var(--font-size-sm);
          color: var(--color-text-secondary);
          text-decoration: none;
          transition: color var(--duration-fast) var(--ease-standard);
        }

        .footer-link:hover {
          color: var(--color-primary);
        }

        .footer-divider {
          color: var(--color-text-secondary);
          opacity: 0.5;
        }

        .footer-note {
          text-align: center;
          padding-top: var(--space-16);
          border-top: 1px solid var(--color-border);
        }

        .footer-note p {
          font-size: var(--font-size-sm);
          color: var(--color-text-secondary);
          margin: 0;
        }

        @media (max-width: 768px) {
          .footer-content {
            flex-direction: column;
            align-items: flex-start;
          }

          .footer-links {
            width: 100%;
          }
        }
      `}</style>
    </footer>
  );
};

export default Footer;
