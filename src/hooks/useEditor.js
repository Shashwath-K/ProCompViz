import { useCallback } from 'react';
import { useEditorContext } from '../context/EditorContext';
import { devLog } from '../config/environment';

/**
 * useEditor Hook
 * Convenience hook for accessing editor operations
 * Wraps EditorContext with additional utilities
 */
const useEditor = () => {
  const context = useEditorContext();

  const {
    code,
    language,
    theme,
    fontSize,
    wordWrap,
    minimap,
    autoSave,
    cursorPosition,
    hasUnsavedChanges,
    lastSavedAt,
    setCode,
    setLanguage,
    setTheme,
    setFontSize,
    setAutoSave,
    loadProject,
    resetEditor,
    clearEditor,
    markAsSaved,
    updateCursorPosition,
    toggleWordWrap,
    toggleMinimap,
    getEditorConfig,
  } = context;

  /**
   * Get current line count
   */
  const getLineCount = useCallback(() => {
    return code.split('\n').length;
  }, [code]);

  /**
   * Get character count
   */
  const getCharacterCount = useCallback(() => {
    return code.length;
  }, [code]);

  /**
   * Get word count
   */
  const getWordCount = useCallback(() => {
    const words = code.trim().split(/\s+/);
    return code.trim() === '' ? 0 : words.length;
  }, [code]);

  /**
   * Insert text at cursor position
   */
  const insertText = useCallback(
    (text) => {
      // This would need Monaco editor instance to work properly
      // For now, append to end
      setCode(code + text);
      devLog('Text inserted:', text);
    },
    [code, setCode]
  );

  /**
   * Format code (basic)
   */
  const formatCode = useCallback(() => {
    // Basic formatting - can be enhanced with prettier or similar
    try {
      let formatted = code;
      
      // Remove trailing spaces
      formatted = formatted
        .split('\n')
        .map((line) => line.trimEnd())
        .join('\n');
      
      // Remove multiple empty lines
      formatted = formatted.replace(/\n\n\n+/g, '\n\n');
      
      setCode(formatted);
      devLog('Code formatted');
    } catch (error) {
      console.error('Error formatting code:', error);
    }
  }, [code, setCode]);

  /**
   * Get editor statistics
   */
  const getStats = useCallback(() => {
    return {
      lines: getLineCount(),
      characters: getCharacterCount(),
      words: getWordCount(),
      language,
      theme,
      hasUnsavedChanges,
      lastSavedAt,
    };
  }, [
    getLineCount,
    getCharacterCount,
    getWordCount,
    language,
    theme,
    hasUnsavedChanges,
    lastSavedAt,
  ]);

  /**
   * Copy code to clipboard
   */
  const copyToClipboard = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(code);
      devLog('Code copied to clipboard');
      return true;
    } catch (error) {
      console.error('Error copying to clipboard:', error);
      return false;
    }
  }, [code]);

  /**
   * Download code as file
   */
  const downloadCode = useCallback(
    (filename) => {
      const extensions = {
        javascript: 'js',
        python: 'py',
        java: 'java',
        cpp: 'cpp',
        c: 'c',
      };

      const extension = extensions[language] || 'txt';
      const finalFilename = filename || `code.${extension}`;

      const blob = new Blob([code], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = url;
      link.download = finalFilename;
      link.click();
      
      URL.revokeObjectURL(url);
      devLog('Code downloaded:', finalFilename);
    },
    [code, language]
  );

  /**
   * Check if code is empty
   */
  const isEmpty = useCallback(() => {
    return code.trim() === '';
  }, [code]);

  /**
   * Get code excerpt (first N characters)
   */
  const getExcerpt = useCallback(
    (length = 100) => {
      if (code.length <= length) return code;
      return code.substring(0, length) + '...';
    },
    [code]
  );

  return {
    // From context
    code,
    language,
    theme,
    fontSize,
    wordWrap,
    minimap,
    autoSave,
    cursorPosition,
    hasUnsavedChanges,
    lastSavedAt,
    setCode,
    setLanguage,
    setTheme,
    setFontSize,
    setAutoSave,
    loadProject,
    resetEditor,
    clearEditor,
    markAsSaved,
    updateCursorPosition,
    toggleWordWrap,
    toggleMinimap,
    getEditorConfig,
    
    // Additional utilities
    getLineCount,
    getCharacterCount,
    getWordCount,
    insertText,
    formatCode,
    getStats,
    copyToClipboard,
    downloadCode,
    isEmpty,
    getExcerpt,
  };
};

export default useEditor;
