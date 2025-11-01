import React, { useEffect } from 'react';
import Button from './Button';
import '../../styles/components/common.css';

/**
 * Modal Component
 * Reusable modal dialog
 * 
 * @param {boolean} isOpen - Modal open state (deprecated, presence determines visibility)
 * @param {function} onClose - Close handler
 * @param {function} onConfirm - Confirm handler
 * @param {string} title - Modal title
 * @param {React.ReactNode} children - Modal content
 * @param {string} confirmText - Confirm button text
 * @param {string} cancelText - Cancel button text
 * @param {boolean} loading - Loading state
 * @param {string} size - 'sm' | 'md' | 'lg'
 * @param {boolean} showFooter - Show footer with buttons
 * @param {string} variant - 'default' | 'danger'
 */
const Modal = ({
  onClose,
  onConfirm,
  title,
  children,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  loading = false,
  size = 'md',
  showFooter = true,
  variant = 'default',
  className = '',
}) => {
  /**
   * Handle escape key press
   */
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && !loading) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClose, loading]);

  /**
   * Prevent body scroll when modal is open
   */
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  /**
   * Handle backdrop click
   */
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget && !loading) {
      onClose();
    }
  };

  /**
   * Handle confirm with input value if applicable
   */
  const handleConfirm = () => {
    // Get input value if exists
    const input = document.querySelector('.modal-content input');
    const value = input ? input.value : null;
    onConfirm(value);
  };

  const modalClasses = [
    'modal',
    `modal--${size}`,
    `modal--${variant}`,
    className,
  ].filter(Boolean).join(' ');

  return (
    <div className="modal-overlay" onClick={handleBackdropClick}>
      <div className={modalClasses}>
        {/* Modal Header */}
        <div className="modal-header">
          <h3 className="modal-title">{title}</h3>
          <button
            className="modal-close"
            onClick={onClose}
            disabled={loading}
            aria-label="Close modal"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Modal Body */}
        <div className="modal-body">
          {children}
        </div>

        {/* Modal Footer */}
        {showFooter && (
          <div className="modal-footer">
            <Button
              variant="secondary"
              onClick={onClose}
              disabled={loading}
            >
              {cancelText}
            </Button>
            <Button
              variant={variant === 'danger' ? 'danger' : 'primary'}
              onClick={handleConfirm}
              loading={loading}
            >
              {confirmText}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;
