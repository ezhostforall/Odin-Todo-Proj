import { Header } from '../components/Header/Header';
import { TaskList } from '../components/TaskList/TaskList';
import { AddTaskForm } from '../components/AddTaskForm/AddTaskForm';
import { EditProjectModal } from '../components/EditProjectModal/EditProjectModal';

export class ProjectView {
  constructor(appState, rerenderCallback, navigateCallback) {
    this.appState = appState;
    this.rerender = rerenderCallback;
    this.navigate = navigateCallback;
    this.header = new Header(navigateCallback);
    this.taskList = new TaskList(appState, rerenderCallback);
    this.addTaskForm = new AddTaskForm(appState, rerenderCallback);
    this.editProjectModal = null;
  }

  render() {
    const selectedProject = this.appState.getSelectedProject();
    
    if (!selectedProject) {
      return `
        ${this.header.render()}
        <main class="container">
          <div class="project-not-found">
            <h1>Project Not Found</h1>
            <p>The selected project could not be found.</p>
            <button class="btn btn-primary" id="back-to-dashboard">Back to Dashboard</button>
          </div>
        </main>
      `;
    }

    return `
      ${this.header.render()}
      <main class="container">
        <div class="project-header">
          <div class="project-info">
            <h1>${selectedProject.name}</h1>
            <p class="project-description">${selectedProject.description}</p>
            <div class="project-stats">
              <span class="stat">
                <strong>${selectedProject.tasks.length}</strong> total tasks
              </span>
              <span class="stat">
                <strong>${selectedProject.tasks.filter(t => t.done).length}</strong> completed
              </span>
              <span class="stat">
                <strong>${selectedProject.tasks.filter(t => !t.done).length}</strong> remaining
              </span>
            </div>
          </div>
          <div class="project-actions">
            <button class="btn btn-secondary" id="back-to-dashboard">Back to Dashboard</button>
            <button class="btn btn-primary" id="edit-project">Edit Project</button>
          </div>
        </div>

        <div class="project-content">
          <div class="add-task-section">
            <h2>Add New Task</h2>
            ${this.addTaskForm.render()}
          </div>

          <div class="tasks-section">
            <h2>Tasks</h2>
            ${this.taskList.render()}
          </div>
        </div>
      </main>
    `;
  }

  attachEventListeners() {
    this.header.attachEventListeners();
    
    const selectedProject = this.appState.getSelectedProject();
    if (selectedProject) {
      this.taskList.attachEventListeners();
      this.addTaskForm.attachEventListeners();
    }

    this.attachProjectEventListeners();
  }

  attachProjectEventListeners() {
    // Back to dashboard button
    const backBtn = document.getElementById('back-to-dashboard');
    if (backBtn) {
      backBtn.addEventListener('click', () => {
        this.navigate('dashboard');
      });
    }

    // Edit project button
    const editBtn = document.getElementById('edit-project');
    if (editBtn) {
      editBtn.addEventListener('click', () => {
        const selectedProject = this.appState.getSelectedProject();
        if (selectedProject) {
          // Close existing modal if open
          if (this.editProjectModal) {
            this.editProjectModal.close();
          }
          
          // Create and show edit modal
          this.editProjectModal = new EditProjectModal(this.appState, this.rerender);
          this.editProjectModal.show(selectedProject);
        }
      });
    }
  }
}
