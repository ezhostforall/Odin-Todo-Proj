import { formatDate } from '../../utils/dateUtils';
import './Dashboard.css';

export class Dashboard {
  constructor(appState, rerenderCallback, navigateCallback) {
    this.appState = appState;
    this.rerender = rerenderCallback;
    this.navigate = navigateCallback;
  }

  render() {
    const projects = this.appState.getProjects().map(p => p.toJSON());
    
    return `
      <div class="dashboard-header">
        <h1>Dashboard</h1>
        <button class="btn btn-primary" id="add-project-btn">
          <span class="btn-icon">+</span>
          Add Project
        </button>
      </div>
      <div class="grid grid-auto-fit">
        ${projects.map(project => `
          <div class="card" data-project-id="${project.id}">
            <div class="card-header">
              <h2 class="card-title">${project.name}</h2>
              <p class="card-description">${project.description}</p>
            </div>
            <ul class="list">
              ${project.tasks.map(task => `
                <li class='list-item' data-task-id="${task.id}">
                  <div class="list-item-content">
                    <h3>${task.title}</h3> 
                    <p>Due: ${task.due ? formatDate(new Date(task.due)) : 'No due date'}</p>
                  </div>
                  <button class='btn btn-success btn-sm' data-task-id="${task.id}">View</button>
                </li>
              `).join('')}
            </ul>
            <div class='card-actions'>
              <button class='btn btn-primary' data-project-id="${project.id}">View Project</button>
              <button class='btn btn-danger' data-project-id="${project.id}">Delete Project</button>
            </div>
          </div>
        `).join('')}
      </div>
    `;
  }

  attachEventListeners() {
    // Add Project button
    const addProjectBtn = document.getElementById('add-project-btn');
    if (addProjectBtn) {
      addProjectBtn.addEventListener('click', () => {
        if (this.navigate) {
          this.navigate('add-project');
        }
      });
    }

    // View Project buttons
    document.querySelectorAll('.btn-primary').forEach(button => {
      const projectId = button.getAttribute('data-project-id');
      if (projectId) {
        button.addEventListener('click', (e) => {
          this.appState.selectProject(projectId);
          console.log(`Navigating to project: ${projectId}`);
          if (this.navigate) {
            this.navigate('project');
          }
        });
      }
    });

    // Delete Project buttons
    document.querySelectorAll('.btn-danger').forEach(button => {
      const projectId = button.getAttribute('data-project-id');
      if (projectId) {
        button.addEventListener('click', (e) => {
          if (confirm('Are you sure you want to delete this project?')) {
            this.appState.removeProject(projectId);
            if (this.rerender) this.rerender();
          }
        });
      }
    });

    // View Task buttons - Navigate to project with task highlighted
    document.querySelectorAll('.btn-success').forEach(button => {
      const taskId = button.getAttribute('data-task-id');
      if (taskId) {
        button.addEventListener('click', (e) => {
          // Find which project contains this task
          const projects = this.appState.getProjects();
          const projectWithTask = projects.find(project => 
            project.tasks.some(task => task.id === taskId)
          );
          
          if (projectWithTask) {
            this.appState.selectProject(projectWithTask.id);
            this.navigate('project');
          }
        });
      }
    });
  }
}
