# PROCOMPVIZ (Gamma Project arch)

### UNSTABLE (VER_0.0.1)

#### Project Architecture
``` text
 visualizer-tracer/
│
├── public/
│   ├── index.html
│   └── favicon.ico
│
├── src/
│   ├── App.jsx                          # Routing only
│   │
│   ├── pages/
│   │   ├── WelcomePage.jsx             # Main landing page
│   │   ├── EditorPage.jsx              # Code editor page
│   │   └── NotFoundPage.jsx            # 404 page
│   │
│   ├── components/
│   │   ├── welcome/
│   │   │   ├── WelcomeHeader.jsx       # Dynamic welcome message
│   │   │   ├── ProjectCard.jsx         # Individual project card
│   │   │   ├── ProjectGrid.jsx         # Grid layout for projects
│   │   │   └── ShowMoreButton.jsx      # Show more functionality
│   │   │
│   │   ├── editor/
│   │   │   ├── MonacoEditor.jsx        # Monaco editor wrapper
│   │   │   ├── EditorToolbar.jsx       # Language & theme selector
│   │   │   ├── LanguageSelector.jsx    # Language dropdown
│   │   │   ├── ThemeSelector.jsx       # Theme dropdown
│   │   │   └── EditorContainer.jsx     # Editor layout wrapper
│   │   │
│   │   ├── actions/
│   │   │   ├── ActionButtons.jsx       # Run, Visualize, Save buttons
│   │   │   ├── RunButton.jsx           # Run code functionality
│   │   │   ├── VisualizeButton.jsx     # Visualize/Trace functionality
│   │   │   └── SaveButton.jsx          # Save project functionality
│   │   │
│   │   ├── common/
│   │   │   ├── Button.jsx              # Reusable button component
│   │   │   ├── Dropdown.jsx            # Reusable dropdown component
│   │   │   ├── Modal.jsx               # Modal component
│   │   │   ├── Loader.jsx              # Loading spinner
│   │   │   └── ErrorBoundary.jsx       # Error boundary wrapper
│   │   │
│   │   └── layout/
│   │       ├── Header.jsx              # App header
│   │       ├── Footer.jsx              # App footer
│   │       └── Container.jsx           # Responsive container
│   │
│   ├── hooks/
│   │   ├── useWelcomeMessage.js        # Dynamic welcome message logic
│   │   ├── useProjects.js              # Fetch/manage projects
│   │   ├── useEditor.js                # Editor state management
│   │   ├── useTheme.js                 # Theme switching logic
│   │   ├── useLanguage.js              # Language switching logic
│   │   ├── useCodeExecution.js         # Code execution logic
│   │   ├── useLocalStorage.js          # Local storage operations
│   │   └── useResponsive.js            # Responsive padding/layout
│   │
│   ├── context/
│   │   ├── EditorContext.jsx           # Editor global state
│   │   ├── ProjectContext.jsx          # Project management state
│   │   └── ThemeContext.jsx            # Global theme state
│   │
│   ├── services/
│   │   ├── api/
│   │   │   ├── projectService.js       # API calls for projects
│   │   │   ├── codeExecutionService.js # Code execution API
│   │   │   └── apiClient.js            # Axios/fetch wrapper
│   │   │
│   │   └── storage/
│   │       ├── localStorageService.js  # Local storage operations
│   │       └── indexedDBService.js     # IndexedDB for large data
│   │
│   ├── utils/
│   │   ├── constants.js                # App-wide constants
│   │   ├── welcomeMessages.js          # Welcome message templates
│   │   ├── editorConfig.js             # Monaco editor config
│   │   ├── languageOptions.js          # Language configurations
│   │   ├── themeOptions.js             # Theme configurations
│   │   ├── dateTimeUtils.js            # Time-based utilities
│   │   ├── validators.js               # Input validators
│   │   └── helpers.js                  # General helper functions
│   │
│   ├── styles/
│   │   ├── global.css                  # Global styles
│   │   ├── variables.css               # CSS variables
│   │   ├── themes/
│   │   │   ├── light.css               # Light theme
│   │   │   └── dark.css                # Dark theme
│   │   └── components/
│   │       ├── welcome.css             # Welcome page styles
│   │       ├── editor.css              # Editor page styles
│   │       └── common.css              # Common component styles
│   │
│   ├── assets/
│   │   ├── icons/                      # Icon files
│   │   └── images/                     # Image files
│   │
│   ├── config/
│   │   ├── routes.js                   # Route configurations
│   │   └── environment.js              # Environment variables
│   │
│   └── main.jsx                        # Entry point
│
├── .env                                 # Environment variables
├── .env.example                        # Example env file
├── .gitignore
├── package.json
├── vite.config.js                      # Vite configuration
└── README.md

 ```