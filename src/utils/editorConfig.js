/**
 * Monaco Editor Configuration
 * Default configuration and presets for Monaco Editor
 */

import { EDITOR_THEMES } from './constants';

/**
 * Default Monaco Editor Options
 */
export const DEFAULT_EDITOR_OPTIONS = {
  // Font settings
  fontSize: 14,
  fontFamily: "'Fira Code', 'Cascadia Code', 'Consolas', 'Monaco', 'Courier New', monospace",
  fontLigatures: true,
  fontWeight: '400',
  letterSpacing: 0,
  lineHeight: 22,

  // Line numbers
  lineNumbers: 'on',
  lineNumbersMinChars: 3,
  lineDecorationsWidth: 10,

  // Editor behavior
  automaticLayout: true,
  autoClosingBrackets: 'always',
  autoClosingQuotes: 'always',
  autoIndent: 'full',
  formatOnPaste: true,
  formatOnType: true,
  
  // Selection
  roundedSelection: true,
  selectOnLineNumbers: true,
  
  // Scrolling
  scrollBeyondLastLine: false,
  smoothScrolling: true,
  mouseWheelZoom: true,
  
  // Cursor
  cursorBlinking: 'smooth',
  cursorSmoothCaretAnimation: true,
  cursorStyle: 'line',
  cursorWidth: 2,
  
  // Minimap
  minimap: {
    enabled: true,
    side: 'right',
    showSlider: 'mouseover',
    renderCharacters: true,
    maxColumn: 120,
  },
  
  // Word wrap
  wordWrap: 'on',
  wordWrapColumn: 120,
  wrappingIndent: 'indent',
  
  // Suggestions
  quickSuggestions: {
    other: true,
    comments: false,
    strings: false,
  },
  suggestOnTriggerCharacters: true,
  acceptSuggestionOnEnter: 'on',
  tabCompletion: 'on',
  wordBasedSuggestions: true,
  
  // Parameter hints
  parameterHints: {
    enabled: true,
    cycle: true,
  },
  
  // Hover
  hover: {
    enabled: true,
    delay: 300,
    sticky: true,
  },
  
  // Find
  find: {
    seedSearchStringFromSelection: 'always',
    autoFindInSelection: 'never',
  },
  
  // Folding
  folding: true,
  foldingStrategy: 'indentation',
  showFoldingControls: 'mouseover',
  foldingHighlight: true,
  
  // Indentation
  tabSize: 2,
  insertSpaces: true,
  detectIndentation: true,
  trimAutoWhitespace: true,
  
  // Rendering
  renderWhitespace: 'selection',
  renderControlCharacters: false,
  renderIndentGuides: true,
  highlightActiveIndentGuide: true,
  renderLineHighlight: 'all',
  renderLineHighlightOnlyWhenFocus: false,
  
  // Scrollbar
  scrollbar: {
    vertical: 'auto',
    horizontal: 'auto',
    verticalScrollbarSize: 10,
    horizontalScrollbarSize: 10,
    alwaysConsumeMouseWheel: false,
  },
  
  // Padding
  padding: {
    top: 16,
    bottom: 16,
  },
  
  // Behavior
  readOnly: false,
  contextmenu: true,
  links: true,
  matchBrackets: 'always',
  bracketPairColorization: {
    enabled: true,
  },
  
  // Performance
  disableLayerHinting: false,
  disableMonospaceOptimizations: false,
};

/**
 * Theme configurations
 */
export const THEME_CONFIGS = {
  [EDITOR_THEMES.VS_LIGHT]: {
    base: 'vs',
    inherit: true,
    colors: {},
    rules: [],
  },
  [EDITOR_THEMES.VS_DARK]: {
    base: 'vs-dark',
    inherit: true,
    colors: {},
    rules: [],
  },
  [EDITOR_THEMES.HC_BLACK]: {
    base: 'hc-black',
    inherit: true,
    colors: {},
    rules: [],
  },
  [EDITOR_THEMES.HC_LIGHT]: {
    base: 'hc-light',
    inherit: true,
    colors: {},
    rules: [],
  },
};

/**
 * Language-specific configurations
 */
export const LANGUAGE_CONFIGS = {
  javascript: {
    tabSize: 2,
    insertSpaces: true,
    autoClosingBrackets: 'always',
    autoClosingQuotes: 'always',
  },
  python: {
    tabSize: 4,
    insertSpaces: true,
    autoClosingBrackets: 'languageDefined',
    autoClosingQuotes: 'languageDefined',
  },
  java: {
    tabSize: 4,
    insertSpaces: true,
    autoClosingBrackets: 'always',
    autoClosingQuotes: 'always',
  },
  cpp: {
    tabSize: 2,
    insertSpaces: true,
    autoClosingBrackets: 'always',
    autoClosingQuotes: 'always',
  },
  c: {
    tabSize: 2,
    insertSpaces: true,
    autoClosingBrackets: 'always',
    autoClosingQuotes: 'always',
  },
};

/**
 * Get editor options for specific language
 * @param {string} language - Programming language
 * @returns {Object} - Editor options
 */
export const getEditorOptionsForLanguage = (language) => {
  const languageConfig = LANGUAGE_CONFIGS[language] || {};
  return {
    ...DEFAULT_EDITOR_OPTIONS,
    ...languageConfig,
  };
};

/**
 * Accessibility preset
 */
export const ACCESSIBILITY_PRESET = {
  ...DEFAULT_EDITOR_OPTIONS,
  fontSize: 16,
  lineHeight: 24,
  renderWhitespace: 'all',
  renderControlCharacters: true,
  cursorBlinking: 'solid',
  cursorWidth: 3,
  accessibilitySupport: 'on',
  screenReaderAnnounceInlineSuggestion: true,
};

/**
 * Minimal preset (for low-end devices)
 */
export const MINIMAL_PRESET = {
  ...DEFAULT_EDITOR_OPTIONS,
  minimap: {
    enabled: false,
  },
  smoothScrolling: false,
  cursorSmoothCaretAnimation: false,
  renderLineHighlight: 'none',
  hover: {
    enabled: false,
  },
  folding: false,
  renderIndentGuides: false,
};

/**
 * Vim mode preset
 */
export const VIM_MODE_PRESET = {
  ...DEFAULT_EDITOR_OPTIONS,
  cursorStyle: 'block',
  cursorBlinking: 'solid',
};

/**
 * Read-only preset
 */
export const READ_ONLY_PRESET = {
  ...DEFAULT_EDITOR_OPTIONS,
  readOnly: true,
  contextmenu: false,
  quickSuggestions: false,
  parameterHints: {
    enabled: false,
  },
  hover: {
    enabled: true,
  },
};

/**
 * Export all configurations
 */
export default {
  DEFAULT_EDITOR_OPTIONS,
  THEME_CONFIGS,
  LANGUAGE_CONFIGS,
  getEditorOptionsForLanguage,
  ACCESSIBILITY_PRESET,
  MINIMAL_PRESET,
  VIM_MODE_PRESET,
  READ_ONLY_PRESET,
};
