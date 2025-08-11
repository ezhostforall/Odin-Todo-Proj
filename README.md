# Todo Project Management Application

A comprehensive todo and project management application built with vanilla JavaScript, featuring a component-based architecture and modern CSS styling.

## 🚀 Features

### Project Management
- **Create Projects**: Add new projects with name and description
- **View Projects**: Browse all projects in a grid layout on the dashboard
- **Delete Projects**: Remove projects with confirmation dialog
- **Project Details**: Navigate to detailed project view with statistics

### Task Management
- **Create Tasks**: Add tasks with title, description, due date, and priority
- **Edit Tasks**: Modify existing tasks with a modal interface
- **Complete Tasks**: Toggle task completion with checkboxes
- **Delete Tasks**: Remove tasks with confirmation
- **Task Organization**: Separate pending and completed task sections
- **Priority Levels**: Low, Medium, High priority classification

### Navigation & UI
- **Responsive Design**: Works on desktop and mobile devices
- **Navigation Header**: Breadcrumb navigation between views
- **Modern UI**: Clean, modern interface with CSS variables
- **Interactive Elements**: Hover effects, smooth transitions
- **Form Validation**: Proper validation for all input fields

### Data Management
- **Persistent Storage**: Data saved to localStorage
- **Real-time Updates**: Immediate UI updates when data changes
- **Data Integrity**: Proper model validation and error handling
- **JSON Serialization**: Clean data export/import capabilities

## 🏗️ Architecture

### Component Structure
```
src/
├── components/           # Reusable UI components
│   ├── AddProjectForm/   # Project creation form
│   ├── AddTaskForm/      # Task creation form
│   ├── Dashboard/        # Project grid view
│   ├── EditTaskModal/    # Task editing modal
│   ├── Header/          # Navigation header
│   └── TaskList/        # Task display and management
├── views/               # Application views/pages
│   ├── AddProjectView/  # Add project page
│   ├── DashboardView/   # Main dashboard page
│   └── ProjectView/     # Project detail page
├── services/            # Business logic layer
│   ├── ProjectService/  # Project CRUD operations
│   ├── StorageService/  # localStorage abstraction
│   └── TaskService/     # Task CRUD operations
├── models/              # Data models
│   ├── Project.js       # Project entity model
│   └── Task.js         # Task entity model
├── state/              # Application state management
│   └── AppState.js     # Centralized state container
├── utils/              # Utility functions
│   └── dateUtils.js    # Date formatting and parsing
└── styles/             # CSS styling
    ├── components.css  # Component-specific styles
    ├── main.css       # Global styles
    └── variables.css  # CSS custom properties
```

### Design Patterns
- **Component Pattern**: Modular, reusable UI components
- **Service Layer**: Separation of business logic from UI
- **State Management**: Centralized application state
- **Observer Pattern**: Callback-based re-rendering
- **Module Pattern**: ES6 modules for clean imports

## 🛠️ Technology Stack

- **JavaScript**: ES6+ features, classes, modules
- **CSS**: Custom properties, Grid, Flexbox
- **HTML**: Semantic markup, accessibility
- **Webpack**: Module bundling and development server
- **LocalStorage**: Client-side data persistence

## 📱 Usage

### Getting Started
1. **Start the Application**:
   ```bash
   npm start
   ```
2. **Open Browser**: Navigate to `http://localhost:8083`

### Using the Application

#### Creating Projects
1. Click "Add Project" on the dashboard
2. Enter project name and description
3. Click "Create Project"
4. You'll be redirected to the dashboard

#### Managing Tasks
1. Navigate to a project by clicking "View Project"
2. Use the "Add Task" form to create new tasks
3. Click the checkbox to mark tasks as complete
4. Click "Edit" to modify task details
5. Click "Delete" to remove tasks

#### Navigation
- Use the breadcrumb navigation in the header
- Click "Dashboard" to return to project overview
- Click project names to navigate to project details

## 🎨 Styling

The application uses a modern CSS architecture with:
- **CSS Custom Properties**: Consistent theming
- **Component-Scoped CSS**: Isolated styling per component
- **Responsive Design**: Mobile-first approach
- **Modern Layout**: CSS Grid and Flexbox
- **Interactive Elements**: Hover states and transitions

## 🔧 Development

### Project Structure
- Components are self-contained with their own CSS
- Services handle all data operations
- Views coordinate between components
- State management provides data consistency

### Adding New Features
1. Create new components in `/src/components/`
2. Add business logic to appropriate services
3. Update state management if needed
4. Create or update views as required

### Customization
- Modify CSS variables in `src/styles/variables.css`
- Update component styles in respective CSS files
- Add new routes in `src/app.js`

## 📋 Future Enhancements

- [ ] Task filtering and sorting
- [ ] Project templates
- [ ] Task attachments
- [ ] Due date notifications
- [ ] Export/import functionality
- [ ] Collaboration features
- [ ] Dark mode theme
- [ ] Keyboard shortcuts

## 🏆 Features Implemented

✅ **Core Functionality**
- Project CRUD operations
- Task CRUD operations
- Navigation system
- Data persistence

✅ **User Interface**
- Responsive design
- Modern styling
- Interactive elements
- Form validation

✅ **Architecture**
- Component-based structure
- Service layer separation
- State management
- Modular CSS

✅ **Developer Experience**
- Webpack build system
- Hot reload development
- Organized file structure
- Clean code patterns

This application demonstrates modern web development practices with vanilla JavaScript, showcasing how to build complex applications without frameworks while maintaining clean, maintainable code.
