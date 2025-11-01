import React, { useRef, useEffect } from 'react';
import Editor from '@monaco-editor/react';
import { CONFIG } from '../../config/environment';
import { devLog } from '../../config/environment';
import Loader from '../common/Loader';
import '../../styles/components/editor.css';

/**
 * MonacoEditor Component
 * Wrapper for Monaco Editor with configuration
 * 
 * @param {string} value - Code content
 * @param {string} language - Programming language
 * @param {string} theme - Editor theme
 * @param {function} onChange - Change handler
 * @param {Object} options - Additional Monaco editor options
 */
const MonacoEditor = ({
  value,
  language = 'javascript',
  theme = 'vs-dark',
  onChange,
  options = {},
  height = '600px',
  className = '',
}) => {
  const editorRef = useRef(null);
  const monacoRef = useRef(null);

  /**
   * Handle editor mount
   */
  const handleEditorDidMount = (editor, monaco) => {
    editorRef.current = editor;
    monacoRef.current = monaco;

    devLog('Monaco Editor mounted');

    // Focus editor
    editor.focus();

    // Add keyboard shortcuts
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS, () => {
      // Trigger save event
      window.dispatchEvent(new CustomEvent('editor:save'));
    });

    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter, () => {
      // Trigger run event
      window.dispatchEvent(new CustomEvent('editor:run'));
    });

    // Track cursor position changes
    editor.onDidChangeCursorPosition((e) => {
      window.dispatchEvent(
        new CustomEvent('editor:cursorchange', {
          detail: {
            line: e.position.lineNumber,
            column: e.position.column,
          },
        })
      );
    });
  };

  /**
   * Handle editor change
   */
  const handleEditorChange = (newValue) => {
    if (onChange) {
      onChange(newValue || '');
    }
  };

  /**
   * Handle editor validation
   */
  const handleEditorValidation = (markers) => {
    // markers = syntax errors, warnings, etc.
    if (markers.length > 0) {
      devLog('Editor validation markers:', markers);
    }
  };

  /**
   * Default editor options
   */
  const defaultOptions = {
    fontSize: 14,
    fontFamily: CONFIG.EDITOR.FONT_FAMILY || 'Consolas, Monaco, "Courier New", monospace',
    lineNumbers: 'on',
    roundedSelection: true,
    scrollBeyondLastLine: false,
    readOnly: false,
    automaticLayout: true,
    minimap: {
      enabled: true,
    },
    wordWrap: 'on',
    tabSize: 2,
    insertSpaces: true,
    formatOnPaste: true,
    formatOnType: true,
    suggestOnTriggerCharacters: true,
    acceptSuggestionOnEnter: 'on',
    quickSuggestions: true,
    parameterHints: {
      enabled: true,
    },
    folding: true,
    foldingStrategy: 'indentation',
    showFoldingControls: 'always',
    smoothScrolling: true,
    cursorBlinking: 'smooth',
    cursorSmoothCaretAnimation: true,
    renderLineHighlight: 'all',
    padding: {
      top: 16,
      bottom: 16,
    },
  };

  /**
   * Merge default options with custom options
   */
  const editorOptions = {
    ...defaultOptions,
    ...options,
  };

  /**
   * Loading component
   */
  const LoadingComponent = () => (
    <div className="monaco-loading">
      <Loader message="Loading editor..." size="lg" />
    </div>
  );

  /**
   * Get editor instance (for parent component access)
   */
  const getEditorInstance = () => editorRef.current;

  /**
   * Get Monaco instance (for parent component access)
   */
  const getMonacoInstance = () => monacoRef.current;

  /**
   * Format code
   */
  const formatCode = () => {
    if (editorRef.current) {
      editorRef.current.getAction('editor.action.formatDocument').run();
    }
  };

  /**
   * Insert text at cursor
   */
  const insertTextAtCursor = (text) => {
    if (editorRef.current) {
      const selection = editorRef.current.getSelection();
      const id = { major: 1, minor: 1 };
      const op = {
        identifier: id,
        range: selection,
        text: text,
        forceMoveMarkers: true,
      };
      editorRef.current.executeEdits('insert-text', [op]);
    }
  };

  /**
   * Expose methods via window for external access
   */
  useEffect(() => {
    window.monacoEditor = {
      getInstance: getEditorInstance,
      getMonaco: getMonacoInstance,
      format: formatCode,
      insertText: insertTextAtCursor,
    };

    return () => {
      delete window.monacoEditor;
    };
  }, []);

  return (
    <div className={`monaco-editor-container ${className}`}>
      <Editor
        height={height}
        language={language}
        theme={theme}
        value={value}
        options={editorOptions}
        onChange={handleEditorChange}
        onMount={handleEditorDidMount}
        onValidate={handleEditorValidation}
        loading={<LoadingComponent />}
      />

      <style jsx>{`
        .monaco-editor-container {
          width: 100%;
          border: 1px solid var(--color-border);
          border-radius: var(--radius-lg);
          overflow: hidden;
          background-color: var(--color-surface);
        }

        .monaco-loading {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 600px;
          background-color: var(--color-surface);
        }
      `}</style>
    </div>
  );
};

export default MonacoEditor;
