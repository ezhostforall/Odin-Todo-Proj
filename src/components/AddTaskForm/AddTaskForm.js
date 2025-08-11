import Task from '../../models/Task';
import './AddTaskForm.css';

export class AddTaskForm {
  constructor(appState, rerenderCallback) {
    this.appState = appState;
    this.rerender = rerenderCallback;
  }

  render() {
    return `
      <div class="add-task-form">
        <form id="add-task-form">
          <div class="form-row">
            <div class="form-group">
              <label for="task-title">Task Title*</label>
              <input type="text" id="task-title" name="title" required placeholder="Enter task title">
            </div>
            <div class="form-group">
              <label for="task-due">Due Date</label>
              <input type="date" id="task-due" name="due">
            </div>
          </div>
          
          <div class="form-row">
            <div class="form-group">
              <label for="task-priority">Priority</label>
              <select id="task-priority" name="priority">
                <option value="low">Low</option>
                <option value="normal" selected>Normal</option>
                <option value="high">High</option>
              </select>
            </div>
            <div class="form-group">
              <label for="task-notes">Notes (optional)</label>
              <input type="text" id="task-notes" name="notes" placeholder="Add a note">
            </div>
          </div>

          <div class="form-actions">
            <button type="submit" class="btn btn-primary">Add Task</button>
            <button type="button" class="btn btn-secondary" id="clear-form">Clear</button>
          </div>
        </form>
      </div>
    `;
  }

  attachEventListeners() {
    const form = document.getElementById('add-task-form');
    const clearBtn = document.getElementById('clear-form');

    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        this.handleSubmit(e);
      });
    }

    if (clearBtn) {
      clearBtn.addEventListener('click', () => {
        this.clearForm();
      });
    }
  }

  handleSubmit(e) {
    const formData = new FormData(e.target);
    const taskData = {
      title: formData.get('title').trim(),
      due: formData.get('due') || null,
      priority: formData.get('priority'),
      notes: formData.get('notes') ? [formData.get('notes').trim()] : []
    };

    // Validation
    if (!taskData.title) {
      alert('Task title is required');
      return;
    }

    try {
      const selectedProject = this.appState.getSelectedProject();
      if (!selectedProject) {
        alert('No project selected');
        return;
      }

      const task = new Task(taskData);
      this.appState.addTaskToProject(selectedProject.id, task);
      
      this.clearForm();
      this.rerender();
      
      // Show success message
      this.showSuccessMessage('Task added successfully!');
      
    } catch (error) {
      console.error('Error adding task:', error);
      alert('Error adding task: ' + error.message);
    }
  }

  clearForm() {
    const form = document.getElementById('add-task-form');
    if (form) {
      form.reset();
      // Set default priority back to normal
      const prioritySelect = document.getElementById('task-priority');
      if (prioritySelect) {
        prioritySelect.value = 'normal';
      }
    }
  }

  showSuccessMessage(message) {
    // Create a temporary success message
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.textContent = message;
    
    const form = document.querySelector('.add-task-form');
    if (form) {
      form.appendChild(successDiv);
      
      // Remove after 3 seconds
      setTimeout(() => {
        if (successDiv.parentNode) {
          successDiv.parentNode.removeChild(successDiv);
        }
      }, 3000);
    }
  }
}
