import { formatDate } from '../../utils/dateUtils';
import './EditTaskModal.css';

export class EditTaskModal {
  constructor(appState, rerenderCallback) {
    this.appState = appState;
    this.rerender = rerenderCallback;
    this.currentTask = null;
  }

  show(task) {
    if (!task) return;

    this.currentTask = task;
    this.render();
    this.attachEventListeners();
  }

  hide() {
    const modal = document.getElementById('edit-task-modal');
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

    const taskData = this.currentTask.toJSON();
    const dueDate = taskData.due || '';

    const modalHTML = `
      <div id="edit-task-modal" class="modal-overlay">
        <div class="modal-content">
          <div class="modal-header">
            <h2>Edit Task</h2>
            <button class="modal-close" id="close-edit-modal">&times;</button>
          </div>
          
          <form id="edit-task-form">
            <div class="form-group">
              <label for="edit-task-title">Task Title*</label>
              <input type="text" id="edit-task-title" name="title" required value="${this.currentTask.title}">
            </div>
            
            <div class="form-row">
              <div class="form-group">
                <label for="edit-task-due">Due Date</label>
                <input type="date" id="edit-task-due" name="due" value="${dueDate}">
              </div>
              <div class="form-group">
                <label for="edit-task-priority">Priority</label>
                <select id="edit-task-priority" name="priority">
                  <option value="low" ${this.currentTask.priority === 'low' ? 'selected' : ''}>Low</option>
                  <option value="normal" ${this.currentTask.priority === 'normal' ? 'selected' : ''}>Normal</option>
                  <option value="high" ${this.currentTask.priority === 'high' ? 'selected' : ''}>High</option>
                </select>
              </div>
            </div>
            
            <div class="form-group">
              <label for="edit-task-notes">Notes</label>
              <textarea id="edit-task-notes" name="notes" rows="3" placeholder="Add notes">${this.currentTask.notes.join('\n')}</textarea>
            </div>
            
            <div class="form-group">
              <label>
                <input type="checkbox" id="edit-task-done" name="done" ${this.currentTask.done ? 'checked' : ''}>
                Mark as completed
              </label>
            </div>

            <div class="modal-actions">
              <button type="submit" class="btn btn-primary">Save Changes</button>
              <button type="button" class="btn btn-secondary" id="cancel-edit">Cancel</button>
            </div>
          </form>
        </div>
      </div>
    `;

    document.body.insertAdjacentHTML('beforeend', modalHTML);
  }

  attachEventListeners() {
    const modal = document.getElementById('edit-task-modal');
    const form = document.getElementById('edit-task-form');
    const closeBtn = document.getElementById('close-edit-modal');
    const cancelBtn = document.getElementById('cancel-edit');

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
    const notes = formData.get('notes').trim();
    
    try {
      // Update task properties
      this.currentTask.title = formData.get('title').trim();
      this.currentTask.priority = formData.get('priority');
      this.currentTask.done = formData.has('done');
      
      // Handle due date
      const dueValue = formData.get('due');
      if (dueValue) {
        // Keep it as ISO string for storage
        this.currentTask.due = new Date(dueValue);
      } else {
        this.currentTask.due = null;
      }
      
      // Handle notes
      if (notes) {
        this.currentTask.notes = notes.split('\n').filter(note => note.trim());
      } else {
        this.currentTask.notes = [];
      }

      // Save to storage
      this.appState.projectService.saveProjects(this.appState.getProjects());
      
      this.hide();
      this.rerender();
      
      this.showSuccessMessage('Task updated successfully!');
      
    } catch (error) {
      console.error('Error updating task:', error);
      alert('Error updating task: ' + error.message);
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
