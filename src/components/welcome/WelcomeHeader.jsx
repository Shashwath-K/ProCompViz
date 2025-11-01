import React from 'react';
import { useWelcomeMessage } from '../../hooks/useWelcomeMessage';
import '../../styles/components/welcome.css';

/**
 * WelcomeHeader Component
 * Displays dynamic welcome message based on time/username
 * 
 * Features:
 * - Time-based greetings (morning, afternoon, evening)
 * - Username personalization
 * - Funny puns/professional tone (random variation)
 * - Animated entrance
 */
const WelcomeHeader = () => {
  const { greeting, message, username, emoji } = useWelcomeMessage();

  return (
    <div className="welcome-header">
      <div className="welcome-header-content">
        {/* Emoji Icon */}
        <div className="welcome-emoji" role="img" aria-label="greeting emoji">
          {emoji}
        </div>

        {/* Main Greeting */}
        <h1 className="welcome-greeting">
          {greeting}, <span className="welcome-username">{username}</span>!
        </h1>

        {/* Subtext Message */}
        <p className="welcome-message">{message}</p>

        {/* Decorative Divider */}
        <div className="welcome-divider">
          <span className="divider-line"></span>
          <span className="divider-icon">✨</span>
          <span className="divider-line"></span>
        </div>
      </div>

      <style jsx>{`
        .welcome-header {
          text-align: center;
          padding: var(--space-32) 0;
          animation: fadeInUp 0.6s ease-out;
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .welcome-header-content {
          max-width: 800px;
          margin: 0 auto;
        }

        .welcome-emoji {
          font-size: 64px;
          margin-bottom: var(--space-16);
          animation: wave 2s ease-in-out infinite;
          display: inline-block;
        }

        @keyframes wave {
          0%, 100% {
            transform: rotate(0deg);
          }
          25% {
            transform: rotate(20deg);
          }
          75% {
            transform: rotate(-20deg);
          }
        }

        .welcome-greeting {
          font-size: var(--font-size-4xl);
          font-weight: var(--font-weight-bold);
          color: var(--color-text);
          margin: 0 0 var(--space-12) 0;
          line-height: 1.2;
        }

        .welcome-username {
          background: linear-gradient(135deg, var(--color-primary), var(--color-primary-hover));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          position: relative;
        }

        .welcome-message {
          font-size: var(--font-size-xl);
          color: var(--color-text-secondary);
          margin: 0 0 var(--space-24) 0;
          line-height: 1.6;
        }

        .welcome-divider {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: var(--space-16);
          margin-top: var(--space-24);
        }

        .divider-line {
          flex: 1;
          max-width: 200px;
          height: 1px;
          background: linear-gradient(
            to right,
            transparent,
            var(--color-border),
            transparent
          );
        }

        .divider-icon {
          font-size: var(--font-size-xl);
          animation: sparkle 2s ease-in-out infinite;
        }

        @keyframes sparkle {
          0%, 100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.6;
            transform: scale(1.2);
          }
        }

        @media (max-width: 768px) {
          .welcome-emoji {
            font-size: 48px;
          }

          .welcome-greeting {
            font-size: var(--font-size-3xl);
          }

          .welcome-message {
            font-size: var(--font-size-lg);
          }

          .divider-line {
            max-width: 100px;
          }
        }
      `}</style>
    </div>
  );
};

export default WelcomeHeader;
