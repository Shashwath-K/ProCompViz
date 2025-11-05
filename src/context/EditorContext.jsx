import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { CONFIG } from '../config/environment';
import { devLog } from '../config/environment';

/**
 * Editor Context
 * Manages editor state (code, language, theme, settings)
 */

const EditorContext = createContext(undefined);

/**
 * Default code templates for different languages
 */
const CODE_TEMPLATES = {
  javascript: `// JavaScript Code
function greet(name) {
  return \`Hello, \${name}!\`;
}

console.log(greet('World'));
`,
  python: `# Python Code
def greet(name):
    return f"Hello, {name}!"

print(greet("World"))
`,
  java: `// Java Code
public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}
`,
  cpp: `// C++ Code
#include <iostream>
using namespace std;

int main() {
    cout << "Hello, World!" << endl;
    return 0;
}
`,
  c: `// C Code
#include <stdio.h>

int main() {
    printf("Hello, World!\\n");
    return 0;
}
`,
};

/**
 * EditorProvider Component
 * Provides editor state and controls
 */
export const EditorProvider = ({ children }) => {
  // Editor state
  const [code, setCode] = useState(CODE_TEMPLATES.javascript);
  const [language, setLanguage] = useState(CONFIG.EDITOR.DEFAULT_LANGUAGE);
  const [theme, setTheme] = useState(CONFIG.EDITOR.DEFAULT_THEME);
  const [fontSize, setFontSize] = useState(14);
  const [wordWrap, setWordWrap] = useState(true);
  const [minimap, setMinimap] = useState(true);
  const [autoSave, setAutoSave] = useState(CONFIG.FEATURES.ENABLE_AUTO_SAVE);
  
  // Editor metadata
  const [cursorPosition, setCursorPosition] = useState({ line: 1, column: 1 });
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [lastSavedAt, setLastSavedAt] = useState(null);

  /**
   * Change language and update code template
   */
  const changeLanguage = useCallback((newLanguage) => {
    setLanguage(newLanguage);
    
    // Save last used language
    localStorage.setItem(CONFIG.STORAGE_KEYS.LAST_LANGUAGE, newLanguage);
    
    // Update code template if current code is empty or default
    const isDefaultCode = Object.values(CODE_TEMPLATES).some(template => 
      code.trim() === template.trim()
    );
    
    if (code.trim() === '' || isDefaultCode) {
      setCode(CODE_TEMPLATES[newLanguage] || '// Start coding...\n');
    }
    
    devLog('Language changed to:', newLanguage);
  }, [code]);

  /**
   * Change editor theme
   */
  const changeTheme = useCallback((newTheme) => {
    setTheme(newTheme);
    devLog('Editor theme changed to:', newTheme);
  }, []);

  /**
   * Update code
   */
  const updateCode = useCallback((newCode) => {
    setCode(newCode);
    setHasUnsavedChanges(true);
  }, []);

  /**
   * Load project into editor
   */
  const loadProject = useCallback((project) => {
    setCode(project.code || '');
    setLanguage(project.language || CONFIG.EDITOR.DEFAULT_LANGUAGE);
    setTheme(project.theme || CONFIG.EDITOR.DEFAULT_THEME);
    setHasUnsavedChanges(false);
    setLastSavedAt(project.updatedAt ? new Date(project.updatedAt) : null);
    devLog('Project loaded into editor:', project.id);
  }, []);

  /**
   * Reset editor to defaults
   */
  const resetEditor = useCallback(() => {
    setCode(CODE_TEMPLATES[language] || '');
    setLanguage(CONFIG.EDITOR.DEFAULT_LANGUAGE);
    setTheme(CONFIG.EDITOR.DEFAULT_THEME);
    setHasUnsavedChanges(false);
    setLastSavedAt(null);
    setCursorPosition({ line: 1, column: 1 });
    devLog('Editor reset to defaults');
  }, [language]);

  /**
   * Clear editor
   */
  const clearEditor = useCallback(() => {
    setCode('');
    setHasUnsavedChanges(true);
  }, []);

  /**
   * Mark as saved
   */
  const markAsSaved = useCallback(() => {
    setHasUnsavedChanges(false);
    setLastSavedAt(new Date());
  }, []);

  /**
   * Update cursor position
   */
  const updateCursorPosition = useCallback((position) => {
    setCursorPosition(position);
  }, []);

  /**
   * Toggle word wrap
   */
  const toggleWordWrap = useCallback(() => {
    setWordWrap(prev => !prev);
  }, []);

  /**
   * Toggle minimap
   */
  const toggleMinimap = useCallback(() => {
    setMinimap(prev => !prev);
  }, []);

  /**
   * Change font size
   */
  const changeFontSize = useCallback((size) => {
    setFontSize(size);
  }, []);

  /**
   * Get editor configuration
   */
  const getEditorConfig = useCallback(() => {
    return {
      language,
      theme,
      fontSize,
      wordWrap,
      minimap,
      autoSave,
    };
  }, [language, theme, fontSize, wordWrap, minimap, autoSave]);

  /**
   * Auto-save functionality
   */
  useEffect(() => {
    if (!autoSave || !hasUnsavedChanges) return;

    const timer = setTimeout(() => {
      // Trigger auto-save event
      window.dispatchEvent(new CustomEvent('editor:autosave', {
        detail: { code, language, theme }
      }));
      devLog('Auto-save triggered');
    }, CONFIG.EDITOR.AUTO_SAVE_INTERVAL);

    return () => clearTimeout(timer);
  }, [code, language, theme, autoSave, hasUnsavedChanges]);

  const value = {
    // State
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
    
    // Actions
    setCode: updateCode,
    setLanguage: changeLanguage,
    setTheme: changeTheme,
    setFontSize: changeFontSize,
    setAutoSave,
    loadProject,
    resetEditor,
    clearEditor,
    markAsSaved,
    updateCursorPosition,
    toggleWordWrap,
    toggleMinimap,
    getEditorConfig,
  };

  return (
    <EditorContext.Provider value={value}>
      {children}
    </EditorContext.Provider>
  );
};

/**
 * Custom hook to use editor context
 */
export const useEditorContext = () => {
  const context = useContext(EditorContext);
  if (context === undefined) {
    throw new Error('useEditorContext must be used within an EditorProvider');
  }
  return context;
};

export default EditorContext;
