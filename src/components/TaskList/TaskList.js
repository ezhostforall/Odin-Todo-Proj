import { formatDate } from '../../utils/dateUtils';
import { EditTaskModal } from '../EditTaskModal/EditTaskModal';
import './TaskList.css';

export class TaskList {
  constructor(appState, rerenderCallback) {
    this.appState = appState;
    this.rerender = rerenderCallback;
    this.editTaskModal = null;
  }

  render() {
    const selectedProject = this.appState.getSelectedProject();
    if (!selectedProject) {
      return `
        <div class="empty-state">
          <p>No project selected.</p>
        </div>
      `;
    }

    if (selectedProject.tasks.length === 0) {
      return `
        <div class="empty-state">
          <p>No tasks yet. Add your first task above!</p>
        </div>
      `;
    }

    return `
      ${this.renderFilters()}
      ${this.renderTasksContent()}
    `;
  }

  renderFilters() {
    const currentFilter = this.appState.getTaskFilter();
    const currentSort = this.appState.getTaskSort();
    
    return `
      <div class="task-filters">
        <div class="filter-group">
          <label for="task-filter">Filter:</label>
          <select id="task-filter" name="filter">
            <option value="all" ${currentFilter === 'all' ? 'selected' : ''}>All Tasks</option>
            <option value="pending" ${currentFilter === 'pending' ? 'selected' : ''}>Pending</option>
            <option value="completed" ${currentFilter === 'completed' ? 'selected' : ''}>Completed</option>
            <option value="overdue" ${currentFilter === 'overdue' ? 'selected' : ''}>Overdue</option>
          </select>
        </div>
        
        <div class="filter-group">
          <label for="task-sort">Sort by:</label>
          <select id="task-sort" name="sort">
            <option value="created" ${currentSort === 'created' ? 'selected' : ''}>Date Created</option>
            <option value="due" ${currentSort === 'due' ? 'selected' : ''}>Due Date</option>
            <option value="priority" ${currentSort === 'priority' ? 'selected' : ''}>Priority</option>
            <option value="title" ${currentSort === 'title' ? 'selected' : ''}>Title</option>
          </select>
        </div>
      </div>
    `;
  }

  renderTasksContent() {
    const selectedProject = this.appState.getSelectedProject();
    if (!selectedProject) return '';

    // Apply filters and sorting
    const filteredTasks = this.filterTasks(selectedProject.tasks);
    const currentFilter = this.appState.getTaskFilter();

    return `
      <div class="task-list">
        ${currentFilter === 'all' ? this.renderGroupedTasks(filteredTasks) : this.renderFilteredTasks(filteredTasks, currentFilter)}
      </div>
    `;
  }

  filterTasks(tasks) {
    let filtered = [...tasks];
    const now = new Date();
    const currentFilter = this.appState.getTaskFilter();

    switch (currentFilter) {
      case 'pending':
        filtered = filtered.filter(task => !task.done);
        break;
      case 'completed':
        filtered = filtered.filter(task => task.done);
        break;
      case 'overdue':
        filtered = filtered.filter(task => 
          !task.done && task.due && new Date(task.due) < now
        );
        break;
      default:
        // 'all' - no filtering
        break;
    }

    return this.sortTasks(filtered);
  }

  sortTasks(tasks) {
    const priorityOrder = { 'high': 3, 'normal': 2, 'low': 1 };
    const currentSort = this.appState.getTaskSort();

    return tasks.sort((a, b) => {
      switch (currentSort) {
        case 'due':
          if (!a.due && !b.due) return 0;
          if (!a.due) return 1;
          if (!b.due) return -1;
          return new Date(a.due) - new Date(b.due);
        
        case 'priority':
          return priorityOrder[b.priority] - priorityOrder[a.priority];
        
        case 'title':
          return a.title.localeCompare(b.title);
        
        default: // 'created'
          return a.id.localeCompare(b.id);
      }
    });
  }

  renderGroupedTasks(tasks) {
    const pendingTasks = tasks.filter(task => !task.done);
    const completedTasks = tasks.filter(task => task.done);

    return `
      ${pendingTasks.length > 0 ? `
        <div class="task-section">
          <h3>Pending Tasks (${pendingTasks.length})</h3>
          <ul class="tasks pending-tasks">
            ${pendingTasks.map(task => this.renderTask(task)).join('')}
          </ul>
        </div>
      ` : ''}
      
      ${completedTasks.length > 0 ? `
        <div class="task-section">
          <h3>Completed Tasks (${completedTasks.length})</h3>
          <ul class="tasks completed-tasks">
            ${completedTasks.map(task => this.renderTask(task)).join('')}
          </ul>
        </div>
      ` : ''}
    `;
  }

  renderFilteredTasks(tasks, filterType) {
    if (tasks.length === 0) {
      return `
        <div class="empty-state">
          <p>No ${filterType} tasks found.</p>
        </div>
      `;
    }

    const filterTitle = {
      'pending': 'Pending Tasks',
      'completed': 'Completed Tasks',
      'overdue': 'Overdue Tasks'
    }[filterType] || 'Tasks';

    return `
      <div class="task-section">
        <h3>${filterTitle} (${tasks.length})</h3>
        <ul class="tasks">
          ${tasks.map(task => this.renderTask(task)).join('')}
        </ul>
      </div>
    `;
  }

  renderTask(task) {
    const taskData = task.toJSON();
    return `
      <li class="task-item ${task.done ? 'completed' : ''}" data-task-id="${task.id}">
        <div class="task-checkbox">
          <input type="checkbox" 
                 id="task-${task.id}" 
                 ${task.done ? 'checked' : ''} 
                 data-task-id="${task.id}">
          <label for="task-${task.id}"></label>
        </div>
        <div class="task-content">
          <h4 class="task-title">${task.title}</h4>
          <div class="task-meta">
            ${taskData.due ? `<span class="task-due">Due: ${formatDate(new Date(taskData.due))}</span>` : ''}
            <span class="task-priority priority-${task.priority}">${task.priority}</span>
          </div>
          ${task.notes.length > 0 ? `
            <div class="task-notes">
              <p>${task.notes[task.notes.length - 1]}</p>
            </div>
          ` : ''}
        </div>
        <div class="task-actions">
          <button class="btn btn-sm btn-secondary" data-task-id="${task.id}" data-action="edit">Edit</button>
          <button class="btn btn-sm btn-danger" data-task-id="${task.id}" data-action="delete">Delete</button>
        </div>
      </li>
    `;
  }

  attachEventListeners() {
    this.attachFilterEventListeners();
    this.attachTaskEventListeners();
  }

  attachFilterEventListeners() {
    const filterSelect = document.getElementById('task-filter');
    const sortSelect = document.getElementById('task-sort');

    if (filterSelect) {
      filterSelect.addEventListener('change', (e) => {
        this.appState.setTaskFilter(e.target.value);
        this.rerender();
      });
    }

    if (sortSelect) {
      sortSelect.addEventListener('change', (e) => {
        this.appState.setTaskSort(e.target.value);
        this.rerender();
      });
    }
  }

  attachTaskEventListeners() {
    // Task completion checkboxes
    document.querySelectorAll('.task-checkbox input[type="checkbox"]').forEach(checkbox => {
      checkbox.addEventListener('change', (e) => {
        const taskId = e.target.getAttribute('data-task-id');
        this.toggleTaskCompletion(taskId);
      });
    });

    // Task action buttons
    document.querySelectorAll('.task-actions button').forEach(button => {
      button.addEventListener('click', (e) => {
        const taskId = e.target.getAttribute('data-task-id');
        const action = e.target.getAttribute('data-action');
        
        if (action === 'edit') {
          this.editTask(taskId);
        } else if (action === 'delete') {
          this.deleteTask(taskId);
        }
      });
    });
  }

  toggleTaskCompletion(taskId) {
    const selectedProject = this.appState.getSelectedProject();
    if (!selectedProject) return;

    const task = selectedProject.tasks.find(t => t.id === taskId);
    if (task) {
      task.toggleDone();
      this.appState.projectService.saveProjects(this.appState.getProjects());
      this.rerender();
    }
  }

  editTask(taskId) {
    const selectedProject = this.appState.getSelectedProject();
    if (!selectedProject) return;

    const task = selectedProject.tasks.find(t => t.id === taskId);
    if (task) {
      // Close existing modal if open
      if (this.editTaskModal) {
        this.editTaskModal.close();
      }
      
      // Create and show edit modal
      this.editTaskModal = new EditTaskModal(this.appState, this.rerender);
      this.editTaskModal.show(task);
    }
  }

  deleteTask(taskId) {
    if (confirm('Are you sure you want to delete this task?')) {
      const selectedProject = this.appState.getSelectedProject();
      if (selectedProject) {
        this.appState.removeTaskFromProject(selectedProject.id, taskId);
        this.rerender();
      }
    }
  }
}
