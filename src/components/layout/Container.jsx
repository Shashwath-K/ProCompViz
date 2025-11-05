import React from 'react';

/**
 * Container Component
 * Responsive container wrapper with max-width constraints
 * 
 * @param {React.ReactNode} children - Child components
 * @param {string} size - 'sm' | 'md' | 'lg' | 'xl' | 'full'
 * @param {boolean} fullWidth - Ignore max-width, use full width
 * @param {string} className - Additional CSS classes
 * @param {string} as - HTML element to render (default: 'div')
 */
const Container = ({
  children,
  size = 'xl',
  fullWidth = false,
  className = '',
  as: Component = 'div',
  ...props
}) => {
  const containerClasses = [
    'container',
    !fullWidth && `container--${size}`,
    fullWidth && 'container--full',
    className,
  ].filter(Boolean).join(' ');

  return (
    <Component className={containerClasses} {...props}>
      {children}

      <style jsx>{`
        .container {
          width: 100%;
          margin-right: auto;
          margin-left: auto;
          padding-right: var(--space-16);
          padding-left: var(--space-16);
        }

        .container--sm {
          max-width: var(--container-sm);
        }

        .container--md {
          max-width: var(--container-md);
        }

        .container--lg {
          max-width: var(--container-lg);
        }

        .container--xl {
          max-width: var(--container-xl);
        }

        .container--full {
          max-width: 100%;
          padding: 0;
        }

        @media (min-width: 640px) {
          .container {
            padding-right: var(--space-20);
            padding-left: var(--space-20);
          }
        }

        @media (min-width: 768px) {
          .container {
            padding-right: var(--space-24);
            padding-left: var(--space-24);
          }
        }

        @media (min-width: 1024px) {
          .container {
            padding-right: var(--space-32);
            padding-left: var(--space-32);
          }
        }
      `}</style>
    </Component>
  );
};

export default Container;
