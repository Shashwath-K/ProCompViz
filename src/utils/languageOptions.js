/**
 * Programming Language Options
 * Configuration for all supported programming languages
 */

import { LANGUAGES, FILE_EXTENSIONS } from './constants';

/**
 * Language Options for Dropdown
 */
export const LANGUAGE_OPTIONS = [
  {
    value: LANGUAGES.JAVASCRIPT,
    label: 'JavaScript',
    icon: '🟨',
    extension: FILE_EXTENSIONS[LANGUAGES.JAVASCRIPT],
    monacoId: 'javascript',
    compiled: false,
    template: `// JavaScript Code
function greet(name) {
  return \`Hello, \${name}!\`;
}

console.log(greet('World'));
`,
    runCommand: 'node',
    features: ['execution', 'visualization', 'tracing'],
  },
  {
    value: LANGUAGES.PYTHON,
    label: 'Python',
    icon: '🐍',
    extension: FILE_EXTENSIONS[LANGUAGES.PYTHON],
    monacoId: 'python',
    compiled: false,
    template: `# Python Code
def greet(name):
    return f"Hello, {name}!"

print(greet("World"))
`,
    runCommand: 'python3',
    features: ['execution', 'visualization', 'tracing'],
  },
  {
    value: LANGUAGES.JAVA,
    label: 'Java',
    icon: '☕',
    extension: FILE_EXTENSIONS[LANGUAGES.JAVA],
    monacoId: 'java',
    compiled: true,
    template: `// Java Code
public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
    
    public static String greet(String name) {
        return "Hello, " + name + "!";
    }
}
`,
    runCommand: 'javac',
    features: ['execution', 'visualization'],
  },
  {
    value: LANGUAGES.CPP,
    label: 'C++',
    icon: '⚙️',
    extension: FILE_EXTENSIONS[LANGUAGES.CPP],
    monacoId: 'cpp',
    compiled: true,
    template: `// C++ Code
#include <iostream>
#include <string>
using namespace std;

string greet(string name) {
    return "Hello, " + name + "!";
}

int main() {
    cout << greet("World") << endl;
    return 0;
}
`,
    runCommand: 'g++',
    features: ['execution', 'visualization'],
  },
  {
    value: LANGUAGES.C,
    label: 'C',
    icon: '🔷',
    extension: FILE_EXTENSIONS[LANGUAGES.C],
    monacoId: 'c',
    compiled: true,
    template: `// C Code
#include <stdio.h>
#include <string.h>

void greet(char* name) {
    printf("Hello, %s!\\n", name);
}

int main() {
    greet("World");
    return 0;
}
`,
    runCommand: 'gcc',
    features: ['execution', 'visualization'],
  },
];

/**
 * Get language configuration by value
 * @param {string} language - Language value
 * @returns {Object|null} - Language configuration
 */
export const getLanguageConfig = (language) => {
  return LANGUAGE_OPTIONS.find((lang) => lang.value === language) || null;
};

/**
 * Get language label
 * @param {string} language - Language value
 * @returns {string} - Language label
 */
export const getLanguageLabel = (language) => {
  const config = getLanguageConfig(language);
  return config ? config.label : language;
};

/**
 * Get language icon
 * @param {string} language - Language value
 * @returns {string} - Language icon
 */
export const getLanguageIcon = (language) => {
  const config = getLanguageConfig(language);
  return config ? config.icon : '📝';
};

/**
 * Get file extension
 * @param {string} language - Language value
 * @returns {string} - File extension
 */
export const getFileExtension = (language) => {
  const config = getLanguageConfig(language);
  return config ? config.extension : 'txt';
};

/**
 * Get Monaco language ID
 * @param {string} language - Language value
 * @returns {string} - Monaco language ID
 */
export const getMonacoLanguageId = (language) => {
  const config = getLanguageConfig(language);
  return config ? config.monacoId : 'plaintext';
};

/**
 * Check if language is compiled
 * @param {string} language - Language value
 * @returns {boolean} - True if compiled
 */
export const isCompiledLanguage = (language) => {
  const config = getLanguageConfig(language);
  return config ? config.compiled : false;
};

/**
 * Get code template
 * @param {string} language - Language value
 * @returns {string} - Code template
 */
export const getCodeTemplate = (language) => {
  const config = getLanguageConfig(language);
  return config ? config.template : '// Start coding...';
};

/**
 * Get run command
 * @param {string} language - Language value
 * @returns {string} - Run command
 */
export const getRunCommand = (language) => {
  const config = getLanguageConfig(language);
  return config ? config.runCommand : null;
};

/**
 * Check if language supports feature
 * @param {string} language - Language value
 * @param {string} feature - Feature name
 * @returns {boolean} - True if supported
 */
export const supportsFeature = (language, feature) => {
  const config = getLanguageConfig(language);
  return config ? config.features.includes(feature) : false;
};

/**
 * Get all language values
 * @returns {Array<string>} - Array of language values
 */
export const getAllLanguageValues = () => {
  return LANGUAGE_OPTIONS.map((lang) => lang.value);
};

/**
 * Get all language labels
 * @returns {Array<string>} - Array of language labels
 */
export const getAllLanguageLabels = () => {
  return LANGUAGE_OPTIONS.map((lang) => lang.label);
};

/**
 * Language color schemes (for syntax highlighting previews)
 */
export const LANGUAGE_COLORS = {
  [LANGUAGES.JAVASCRIPT]: '#f7df1e',
  [LANGUAGES.PYTHON]: '#3776ab',
  [LANGUAGES.JAVA]: '#007396',
  [LANGUAGES.CPP]: '#00599c',
  [LANGUAGES.C]: '#a8b9cc',
};

/**
 * Get language color
 * @param {string} language - Language value
 * @returns {string} - Color hex code
 */
export const getLanguageColor = (language) => {
  return LANGUAGE_COLORS[language] || '#6c757d';
};

export default {
  LANGUAGE_OPTIONS,
  getLanguageConfig,
  getLanguageLabel,
  getLanguageIcon,
  getFileExtension,
  getMonacoLanguageId,
  isCompiledLanguage,
  getCodeTemplate,
  getRunCommand,
  supportsFeature,
  getAllLanguageValues,
  getAllLanguageLabels,
  LANGUAGE_COLORS,
  getLanguageColor,
};
