import './EditProjectModal.css';

export class EditProjectModal {
  constructor(appState, rerenderCallback) {
    this.appState = appState;
    this.rerender = rerenderCallback;
    this.currentProject = null;
  }

  show(project) {
    if (!project) return;

    this.currentProject = project;
    this.render();
    this.attachEventListeners();
  }

  hide() {
    const modal = document.getElementById('edit-project-modal');
    if (modal) {
      modal.remove();
    }
  }

  close() {
    this.hide();
  }

  render() {
    // Remove existing modal if any
    this.hide();

    const modalHTML = `
      <div id="edit-project-modal" class="modal-overlay">
        <div class="modal-content">
          <div class="modal-header">
            <h2>Edit Project</h2>
            <button class="modal-close" id="close-edit-project-modal">&times;</button>
          </div>
          
          <form id="edit-project-form">
            <div class="form-group">
              <label for="edit-project-name">Project Name*</label>
              <input type="text" id="edit-project-name" name="name" required value="${this.currentProject.name}">
            </div>
            
            <div class="form-group">
              <label for="edit-project-description">Description</label>
              <textarea id="edit-project-description" name="description" rows="3" placeholder="Enter project description">${this.currentProject.description}</textarea>
            </div>

            <div class="modal-actions">
              <button type="submit" class="btn btn-primary">Save Changes</button>
              <button type="button" class="btn btn-secondary" id="cancel-edit-project">Cancel</button>
            </div>
          </form>
        </div>
      </div>
    `;

    document.body.insertAdjacentHTML('beforeend', modalHTML);
  }

  attachEventListeners() {
    const modal = document.getElementById('edit-project-modal');
    const form = document.getElementById('edit-project-form');
    const closeBtn = document.getElementById('close-edit-project-modal');
    const cancelBtn = document.getElementById('cancel-edit-project');

    // Close modal when clicking outside
    if (modal) {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          this.hide();
        }
      });
    }

    // Close modal buttons
    if (closeBtn) {
      closeBtn.addEventListener('click', () => this.hide());
    }

    if (cancelBtn) {
      cancelBtn.addEventListener('click', () => this.hide());
    }

    // Handle form submission
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        this.handleSubmit(e);
      });
    }

    // Close modal on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.hide();
      }
    });
  }

  handleSubmit(e) {
    const formData = new FormData(e.target);
    
    try {
      // Update project properties
      this.currentProject.name = formData.get('name').trim();
      this.currentProject.description = formData.get('description').trim() || 'No description provided';
      
      // Validation
      if (!this.currentProject.name) {
        alert('Project name is required');
        return;
      }

      // Save to storage
      this.appState.projectService.saveProjects(this.appState.getProjects());
      
      this.hide();
      this.rerender();
      
      this.showSuccessMessage('Project updated successfully!');
      
    } catch (error) {
      console.error('Error updating project:', error);
      alert('Error updating project: ' + error.message);
    }
  }

  showSuccessMessage(message) {
    const successDiv = document.createElement('div');
    successDiv.className = 'floating-success-message';
    successDiv.textContent = message;
    
    document.body.appendChild(successDiv);
    
    setTimeout(() => {
      if (successDiv.parentNode) {
        successDiv.parentNode.removeChild(successDiv);
      }
    }, 3000);
  }
}
