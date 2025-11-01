import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Import pages
import WelcomePage from './pages/WelcomePage';
import EditorPage from './pages/EditorPage';
import NotFoundPage from './pages/NotFoundPage';

// Import routes configuration
import { ROUTES } from './config/routes';

/**
 * App Component - Routing Only
 * This component handles ONLY routing logic
 * No business logic, no state management, no UI elements
 */
function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Welcome/Home Page */}
        <Route path={ROUTES.HOME} element={<WelcomePage />} />
        
        {/* Editor Page - for new projects */}
        <Route path={ROUTES.EDITOR_NEW} element={<EditorPage />} />
        
        {/* Editor Page - for existing projects with ID */}
        <Route path={ROUTES.EDITOR_EDIT} element={<EditorPage />} />
        
        {/* Redirect root to home */}
        <Route path="/" element={<Navigate to={ROUTES.HOME} replace />} />
        
        {/* 404 Not Found Page */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
