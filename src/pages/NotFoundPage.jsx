import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../config/routes';

// Components
import Container from '../components/layout/Container';
import Button from '../components/common/Button';

/**
 * NotFoundPage Component
 * 404 error page for invalid routes
 */
const NotFoundPage = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate(ROUTES.HOME);
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="not-found-page">
      <Container>
        <div className="not-found-content">
          <div className="not-found-icon">🔍</div>
          <h1 className="not-found-title">404</h1>
          <h2 className="not-found-subtitle">Page Not Found</h2>
          <p className="not-found-description">
            Oops! The page you're looking for doesn't exist or has been moved.
          </p>
          
          <div className="not-found-actions">
            <Button
              variant="primary"
              size="lg"
              onClick={handleGoHome}
            >
              Go to Home
            </Button>
            
            <Button
              variant="secondary"
              size="lg"
              onClick={handleGoBack}
            >
              Go Back
            </Button>
          </div>
        </div>
      </Container>

      <style jsx>{`
        .not-found-page {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: var(--color-background);
        }

        .not-found-content {
          text-align: center;
          padding: var(--space-32);
        }

        .not-found-icon {
          font-size: 80px;
          margin-bottom: var(--space-24);
          animation: float 3s ease-in-out infinite;
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        .not-found-title {
          font-size: var(--font-size-4xl);
          font-weight: var(--font-weight-bold);
          color: var(--color-primary);
          margin-bottom: var(--space-16);
        }

        .not-found-subtitle {
          font-size: var(--font-size-3xl);
          font-weight: var(--font-weight-semibold);
          color: var(--color-text);
          margin-bottom: var(--space-16);
        }

        .not-found-description {
          font-size: var(--font-size-lg);
          color: var(--color-text-secondary);
          margin-bottom: var(--space-32);
          max-width: 500px;
          margin-left: auto;
          margin-right: auto;
        }

        .not-found-actions {
          display: flex;
          gap: var(--space-16);
          justify-content: center;
          flex-wrap: wrap;
        }
      `}</style>
    </div>
  );
};

export default NotFoundPage;
