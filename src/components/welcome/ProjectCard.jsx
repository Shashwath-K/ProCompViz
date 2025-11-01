import React from 'react';
import '../../styles/components/welcome.css';

/**
 * ProjectCard Component
 * Individual project card for visualizers and tracers
 * 
 * @param {Object} project - Project data
 * @param {function} onClick - Click handler
 */
const ProjectCard = ({ project, onClick }) => {
  const {
    id,
    name,
    type,
    language,
    updatedAt,
    createdAt,
    code = '',
  } = project;

  /**
   * Format date to relative time
   */
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 30) return `${diffDays}d ago`;
    return date.toLocaleDateString();
  };

  /**
   * Get icon based on project type
   */
  const getTypeIcon = () => {
    return type === 'visualizer' ? '📊' : '🔍';
  };

  /**
   * Get language icon/color
   */
  const getLanguageColor = () => {
    const colors = {
      javascript: '#f7df1e',
      python: '#3776ab',
      java: '#007396',
      cpp: '#00599c',
      c: '#a8b9cc',
    };
    return colors[language] || '#6c757d';
  };

  /**
   * Get code preview (first 3 lines)
   */
  const getCodePreview = () => {
    const lines = code.split('\n').filter(line => line.trim());
    return lines.slice(0, 3).join('\n') || '// No code yet...';
  };

  const handleClick = () => {
    onClick(id);
  };

  return (
    <div className="project-card" onClick={handleClick}>
      {/* Card Header */}
      <div className="project-card-header">
        <div className="project-type-badge">
          <span className="type-icon">{getTypeIcon()}</span>
          <span className="type-text">{type}</span>
        </div>
        <div className="project-language-badge" style={{ '--lang-color': getLanguageColor() }}>
          {language}
        </div>
      </div>

      {/* Card Body */}
      <div className="project-card-body">
        <h3 className="project-name" title={name}>
          {name}
        </h3>

        {/* Code Preview */}
        <div className="project-code-preview">
          <pre>
            <code>{getCodePreview()}</code>
          </pre>
        </div>
      </div>

      {/* Card Footer */}
      <div className="project-card-footer">
        <div className="project-meta">
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
          </svg>
          <span className="project-date">{formatDate(updatedAt || createdAt)}</span>
        </div>

        <div className="project-arrow">
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </div>
      </div>

      <style jsx>{`
        .project-card {
          background-color: var(--color-surface);
          border: 1px solid var(--color-card-border);
          border-radius: var(--radius-lg);
          padding: var(--space-16);
          cursor: pointer;
          transition: all var(--duration-normal) var(--ease-standard);
          display: flex;
          flex-direction: column;
          gap: var(--space-12);
          height: 100%;
          position: relative;
          overflow: hidden;
        }

        .project-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: linear-gradient(135deg, var(--color-primary), var(--color-primary-hover));
          transform: scaleX(0);
          transform-origin: left;
          transition: transform var(--duration-normal) var(--ease-standard);
        }

        .project-card:hover {
          border-color: var(--color-primary);
          box-shadow: var(--shadow-md);
          transform: translateY(-2px);
        }

        .project-card:hover::before {
          transform: scaleX(1);
        }

        .project-card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: var(--space-8);
        }

        .project-type-badge {
          display: flex;
          align-items: center;
          gap: var(--space-4);
          padding: var(--space-4) var(--space-8);
          background-color: var(--color-secondary);
          border-radius: var(--radius-sm);
          font-size: var(--font-size-xs);
          font-weight: var(--font-weight-medium);
          color: var(--color-text-secondary);
          text-transform: capitalize;
        }

        .type-icon {
          font-size: var(--font-size-sm);
        }

        .project-language-badge {
          padding: var(--space-4) var(--space-8);
          background-color: var(--lang-color, var(--color-secondary));
          color: white;
          border-radius: var(--radius-sm);
          font-size: var(--font-size-xs);
          font-weight: var(--font-weight-medium);
          text-transform: uppercase;
          opacity: 0.9;
        }

        .project-card-body {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: var(--space-12);
        }

        .project-name {
          font-size: var(--font-size-lg);
          font-weight: var(--font-weight-semibold);
          color: var(--color-text);
          margin: 0;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .project-code-preview {
          flex: 1;
          background-color: var(--color-secondary);
          border-radius: var(--radius-sm);
          padding: var(--space-8);
          overflow: hidden;
        }

        .project-code-preview pre {
          margin: 0;
          font-size: var(--font-size-xs);
          font-family: var(--font-family-mono);
          color: var(--color-text-secondary);
          line-height: 1.4;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .project-code-preview code {
          white-space: pre;
          display: block;
          overflow: hidden;
        }

        .project-card-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: var(--space-8);
          border-top: 1px solid var(--color-card-border-inner);
        }

        .project-meta {
          display: flex;
          align-items: center;
          gap: var(--space-4);
          color: var(--color-text-secondary);
        }

        .project-date {
          font-size: var(--font-size-xs);
        }

        .project-arrow {
          color: var(--color-text-secondary);
          transition: transform var(--duration-fast) var(--ease-standard);
        }

        .project-card:hover .project-arrow {
          transform: translateX(4px);
          color: var(--color-primary);
        }
      `}</style>
    </div>
  );
};

export default ProjectCard;
