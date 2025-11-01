import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/global.css';
import './styles/variables.css';

// Import context providers
import { ThemeProvider } from './context/ThemeContext';
import { ProjectProvider } from './context/ProjectContext';
import { EditorProvider } from './context/EditorContext';

// Error boundary for development
import ErrorBoundary from './components/common/ErrorBoundary';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ErrorBoundary>
      <ThemeProvider>
        <ProjectProvider>
          <EditorProvider>
            <App />
          </EditorProvider>
        </ProjectProvider>
      </ThemeProvider>
    </ErrorBoundary>
  </React.StrictMode>
);
