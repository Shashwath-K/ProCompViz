import React from 'react';
import Dropdown from '../common/DropDown';
import { LANGUAGE_OPTIONS } from '../../utils/languageOptions';
import '../../styles/components/editor.css';

/**
 * LanguageSelector Component
 * Dropdown for selecting programming language
 * 
 * @param {string} value - Current language
 * @param {function} onChange - Change handler
 * @param {boolean} disabled - Disabled state
 */
const LanguageSelector = ({ value, onChange, disabled = false }) => {
  /**
   * Get language options for dropdown
   */
  const getLanguageOptions = () => {
    return LANGUAGE_OPTIONS.map((lang) => ({
      value: lang.value,
      label: lang.label,
      icon: lang.icon,
    }));
  };

  return (
    <div className="language-selector">
      <Dropdown
        options={getLanguageOptions()}
        value={value}
        onChange={onChange}
        disabled={disabled}
        placeholder="Select Language"
        label="Language"
        size="md"
        className="language-dropdown"
      />

      <style jsx>{`
        .language-selector {
          min-width: 150px;
        }

        @media (max-width: 768px) {
          .language-selector {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
};

export default LanguageSelector;
