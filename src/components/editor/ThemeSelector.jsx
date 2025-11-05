import React from 'react';
import Dropdown from '../common/DropDown';
import { EDITOR_THEME_OPTIONS } from '../../utils/themeOptions';
import '../../styles/components/editor.css';

/**
 * ThemeSelector Component
 * Dropdown for selecting editor theme
 * 
 * @param {string} value - Current theme
 * @param {function} onChange - Change handler
 * @param {boolean} disabled - Disabled state
 */
const ThemeSelector = ({ value, onChange, disabled = false }) => {
  /**
   * Get theme options for dropdown
   */
  const getThemeOptions = () => {
    return EDITOR_THEME_OPTIONS.map((theme) => ({
      value: theme.value,
      label: theme.label,
      icon: theme.icon,
    }));
  };

  return (
    <div className="theme-selector">
      <Dropdown
        options={getThemeOptions()}
        value={value}
        onChange={onChange}
        disabled={disabled}
        placeholder="Select Theme"
        label="Theme"
        size="md"
        className="theme-dropdown"
      />

      <style jsx>{`
        .theme-selector {
          min-width: 150px;
        }

        @media (max-width: 768px) {
          .theme-selector {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
};

export default ThemeSelector;
