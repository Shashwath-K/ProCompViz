import React, { useState, useRef, useEffect } from 'react';
import '../../styles/components/common.css';

/**
 * Dropdown Component
 * Reusable dropdown/select component
 * 
 * @param {Array} options - Array of {value, label, icon?}
 * @param {string} value - Selected value
 * @param {function} onChange - Change handler
 * @param {string} placeholder - Placeholder text
 * @param {string} label - Label text
 * @param {boolean} disabled - Disabled state
 * @param {string} className - Additional CSS classes
 */
const Dropdown = ({
  options = [],
  value,
  onChange,
  placeholder = 'Select...',
  label,
  disabled = false,
  className = '',
  size = 'md',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const selectedOption = options.find(opt => opt.value === value);

  /**
   * Close dropdown when clicking outside
   */
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  /**
   * Handle option selection
   */
  const handleSelect = (optionValue) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  /**
   * Toggle dropdown
   */
  const handleToggle = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
    }
  };

  const dropdownClasses = [
    'dropdown',
    `dropdown--${size}`,
    isOpen ? 'dropdown--open' : '',
    disabled ? 'dropdown--disabled' : '',
    className,
  ].filter(Boolean).join(' ');

  return (
    <div className={dropdownClasses} ref={dropdownRef}>
      {label && <label className="dropdown-label">{label}</label>}
      
      <div className="dropdown-trigger" onClick={handleToggle}>
        <div className="dropdown-value">
          {selectedOption?.icon && (
            <span className="dropdown-icon">{selectedOption.icon}</span>
          )}
          <span className="dropdown-text">
            {selectedOption?.label || placeholder}
          </span>
        </div>
        <svg
          className="dropdown-arrow"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </div>

      {isOpen && (
        <div className="dropdown-menu">
          {options.map((option) => (
            <div
              key={option.value}
              className={`dropdown-item ${option.value === value ? 'dropdown-item--selected' : ''}`}
              onClick={() => handleSelect(option.value)}
            >
              {option.icon && (
                <span className="dropdown-item-icon">{option.icon}</span>
              )}
              <span className="dropdown-item-label">{option.label}</span>
              {option.value === value && (
                <svg
                  className="dropdown-check"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
