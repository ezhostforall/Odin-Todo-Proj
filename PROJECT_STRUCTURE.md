# Project Structure Documentation

## Overview
This project has been refactored to follow a cleaner, more maintainable architecture with clear separation of concerns.

## New Structure

```
src/
├── index.html              # HTML template
├── index.js                # Application entry point
├── app.js                  # Main app initialization & coordinator
├── assets/
│   └── images/
│       └── logo.svg        # Application logo
├── components/             # Reusable UI components
│   ├── Header/
│   │   ├── Header.js       # Header component logic
│   │   └── Header.css      # Header-specific styles
│   └── Dashboard/
│       ├── Dashboard.js    # Dashboard component logic
│       └── Dashboard.css   # Dashboard-specific styles
├── models/
│   ├── Project.js          # Project data model
│   └── Task.js             # Task data model
├── services/               # Business logic & data operations
│   ├── ProjectService.js   # Project-related operations
│   ├── TaskService.js      # Task-related operations
│   └── StorageService.js   # Local storage operations
├── state/
│   └── AppState.js         # Centralized state management
├── styles/
│   ├── main.css            # Global styles
│   ├── variables.css       # CSS custom properties/variables
│   └── components.css      # Reusable component styles
├── utils/
│   └── dateUtils.js        # Date utility functions
└── views/                  # Page-level components
    └── DashboardView.js    # Dashboard page component
```

## Architecture Principles

### 1. **Separation of Concerns**
- **Components**: Handle UI rendering and user interactions
- **Services**: Handle business logic and data operations
- **Models**: Define data structures and validation
- **State**: Manage application state centrally
- **Views**: Compose components into full page layouts

### 2. **Component Structure**
Each component follows this pattern:
- `render()`: Returns HTML string
- `attachEventListeners()`: Handles user interactions
- Component-specific CSS file

### 3. **State Management**
- Centralized in `AppState.js`
- Services handle data persistence
- Components receive state and callbacks for updates

### 4. **Service Layer**
- `ProjectService`: Project CRUD operations
- `TaskService`: Task operations and validation
- `StorageService`: Local storage abstraction

### 5. **Styling**
- CSS variables for consistent theming
- Reusable component classes
- Component-specific styles co-located with components

## Key Features

### State Management
- Initialize default project if none exist
- Project and task CRUD operations
- Automatic persistence to localStorage
- Error handling and validation

### Component System
- Header with navigation
- Dashboard with project grid
- Task lists within projects
- Event handling with proper cleanup

### Date Handling
- UK date format display (DD/MM/YYYY)
- ISO format storage (YYYY-MM-DD)
- Date validation and sanitization

### User Interactions
- Select projects
- Delete projects (with confirmation)
- View tasks
- Clear all projects

## Development Guidelines

### Adding New Components
1. Create component directory in `src/components/`
2. Add JavaScript class with `render()` and `attachEventListeners()` methods
3. Add CSS file for component-specific styles
4. Import and use in views

### Adding New Features
1. Add business logic to appropriate service
2. Update models if new data structures needed
3. Add UI components for user interaction
4. Update state management if needed

### Styling
1. Use CSS variables from `variables.css`
2. Use reusable classes from `components.css`
3. Add component-specific styles in component CSS files

## Benefits of This Structure

1. **Maintainability**: Clear separation makes code easier to modify
2. **Reusability**: Components can be reused across different views
3. **Testability**: Services and models can be tested independently
4. **Scalability**: Easy to add new features without affecting existing code
5. **Developer Experience**: Clear conventions make onboarding easier
