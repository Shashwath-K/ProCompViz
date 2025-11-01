import React from 'react';
import ProjectCard from './ProjectCard';
import '../../styles/components/welcome.css';

/**
 * ProjectGrid Component
 * Grid layout for displaying project cards
 * 
 * @param {Array} projects - Array of project objects
 * @param {function} onProjectClick - Project click handler
 * @param {number} columns - Number of columns (default: 3)
 */
const ProjectGrid = ({ projects, onProjectClick, columns = 3 }) => {
  if (!projects || projects.length === 0) {
    return null;
  }

  return (
    <div className="project-grid" style={{ '--grid-columns': columns }}>
      {projects.map((project, index) => (
        <div
          key={project.id}
          className="project-grid-item"
          style={{ '--animation-delay': `${index * 0.1}s` }}
        >
          <ProjectCard project={project} onClick={onProjectClick} />
        </div>
      ))}

      <style jsx>{`
        .project-grid {
          display: grid;
          grid-template-columns: repeat(var(--grid-columns, 3), 1fr);
          gap: var(--space-24);
          margin-top: var(--space-24);
        }

        .project-grid-item {
          animation: fadeInScale 0.5s ease-out forwards;
          animation-delay: var(--animation-delay, 0s);
          opacity: 0;
        }

        @keyframes fadeInScale {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        /* Responsive Grid */
        @media (max-width: 1200px) {
          .project-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 768px) {
          .project-grid {
            grid-template-columns: 1fr;
            gap: var(--space-16);
          }
        }

        /* Empty State Spacing */
        .project-grid:empty {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default ProjectGrid;
