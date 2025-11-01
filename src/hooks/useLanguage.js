import { useState, useCallback, useEffect } from 'react';
import { useEditorContext } from '../context/EditorContext';
import { LANGUAGE_OPTIONS, getLanguageConfig } from '../utils/languageOptions';
import { CONFIG } from '../config/environment';
import { devLog } from '../config/environment';

/**
 * useLanguage Hook
 * Manages programming language selection and configuration
 */
const useLanguage = () => {
  const { language, setLanguage } = useEditorContext();
  const [languageConfig, setLanguageConfig] = useState(null);

  /**
   * Load language configuration when language changes
   */
  useEffect(() => {
    const config = getLanguageConfig(language);
    setLanguageConfig(config);
    devLog('Language config loaded:', language, config);
  }, [language]);

  /**
   * Change language
   */
  const changeLanguage = useCallback(
    (newLanguage) => {
      setLanguage(newLanguage);
      devLog('Language changed to:', newLanguage);
    },
    [setLanguage]
  );

  /**
   * Get available languages
   */
  const getAvailableLanguages = useCallback(() => {
    return LANGUAGE_OPTIONS;
  }, []);

  /**
   * Get language display name
   */
  const getLanguageName = useCallback(() => {
    return languageConfig?.label || language;
  }, [language, languageConfig]);

  /**
   * Get language icon
   */
  const getLanguageIcon = useCallback(() => {
    return languageConfig?.icon || '📝';
  }, [languageConfig]);

  /**
   * Get file extension for current language
   */
  const getFileExtension = useCallback(() => {
    return languageConfig?.extension || 'txt';
  }, [languageConfig]);

  /**
   * Check if language supports feature
   */
  const supportsFeature = useCallback(
    (feature) => {
      return languageConfig?.features?.includes(feature) || false;
    },
    [languageConfig]
  );

  /**
   * Get language-specific Monaco editor options
   */
  const getMonacoLanguage = useCallback(() => {
    // Map our language IDs to Monaco language IDs
    const monacoLanguageMap = {
      javascript: 'javascript',
      python: 'python',
      java: 'java',
      cpp: 'cpp',
      c: 'c',
    };

    return monacoLanguageMap[language] || 'plaintext';
  }, [language]);

  /**
   * Get syntax highlighting rules (if custom)
   */
  const getSyntaxRules = useCallback(() => {
    return languageConfig?.syntaxRules || null;
  }, [languageConfig]);

  /**
   * Get language-specific code template
   */
  const getCodeTemplate = useCallback(() => {
    return languageConfig?.template || '// Start coding...';
  }, [languageConfig]);

  /**
   * Check if language is compiled
   */
  const isCompiled = useCallback(() => {
    return languageConfig?.compiled || false;
  }, [languageConfig]);

  /**
   * Check if language is interpreted
   */
  const isInterpreted = useCallback(() => {
    return !isCompiled();
  }, [isCompiled]);

  /**
   * Get run command for language
   */
  const getRunCommand = useCallback(() => {
    return languageConfig?.runCommand || null;
  }, [languageConfig]);

  return {
    // Current language
    language,
    languageConfig,
    
    // Actions
    changeLanguage,
    
    // Utilities
    getAvailableLanguages,
    getLanguageName,
    getLanguageIcon,
    getFileExtension,
    supportsFeature,
    getMonacoLanguage,
    getSyntaxRules,
    getCodeTemplate,
    isCompiled,
    isInterpreted,
    getRunCommand,
  };
};

export default useLanguage;
