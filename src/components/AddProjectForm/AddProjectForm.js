import Project from '../../models/Project';
import './AddProjectForm.css';

export class AddProjectForm {
  constructor(appState, rerenderCallback, navigateCallback) {
    this.appState = appState;
    this.rerender = rerenderCallback;
    this.navigate = navigateCallback;
  }

  render() {
    return `
      <div class="add-project-form">
        <h2>Create New Project</h2>
        <form id="add-project-form">
          <div class="form-group">
            <label for="project-name">Project Name*</label>
            <input type="text" id="project-name" name="name" required placeholder="Enter project name">
          </div>
          
          <div class="form-group">
            <label for="project-description">Description</label>
            <textarea id="project-description" name="description" rows="3" placeholder="Enter project description (optional)"></textarea>
          </div>

          <div class="form-actions">
            <button type="submit" class="btn btn-primary">Create Project</button>
            <button type="button" class="btn btn-secondary" id="cancel-project">Cancel</button>
          </div>
        </form>
      </div>
    `;
  }

  attachEventListeners() {
    const form = document.getElementById('add-project-form');
    const cancelBtn = document.getElementById('cancel-project');

    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        this.handleSubmit(e);
      });
    }

    if (cancelBtn) {
      cancelBtn.addEventListener('click', () => {
        this.navigate('dashboard');
      });
    }
  }

  handleSubmit(e) {
    const formData = new FormData(e.target);
    const projectData = {
      name: formData.get('name').trim(),
      description: formData.get('description').trim() || 'No description provided'
    };

    // Validation
    if (!projectData.name) {
      alert('Project name is required');
      return;
    }

    try {
      const project = new Project(projectData);
      this.appState.addProject(project);
      this.appState.selectProject(project.id);
      
      this.showSuccessMessage('Project created successfully!');
      
      // Navigate to the new project after a short delay
      setTimeout(() => {
        this.navigate('project');
      }, 1000);
      
    } catch (error) {
      console.error('Error creating project:', error);
      alert('Error creating project: ' + error.message);
    }
  }

  showSuccessMessage(message) {
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.textContent = message;
    
    const form = document.querySelector('.add-project-form');
    if (form) {
      form.appendChild(successDiv);
      
      setTimeout(() => {
        if (successDiv.parentNode) {
          successDiv.parentNode.removeChild(successDiv);
        }
      }, 3000);
    }
  }
}
