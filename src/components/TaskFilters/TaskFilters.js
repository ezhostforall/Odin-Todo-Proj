import './TaskFilters.css';

export class TaskFilters {
  constructor(rerenderCallback) {
    this.rerender = rerenderCallback;
    this.currentFilter = 'all';
    this.currentSort = 'created';
  }

  render() {
    return `
      <div class="task-filters">
        <div class="filter-group">
          <label for="task-filter">Filter:</label>
          <select id="task-filter" name="filter">
            <option value="all" ${this.currentFilter === 'all' ? 'selected' : ''}>All Tasks</option>
            <option value="pending" ${this.currentFilter === 'pending' ? 'selected' : ''}>Pending</option>
            <option value="completed" ${this.currentFilter === 'completed' ? 'selected' : ''}>Completed</option>
            <option value="overdue" ${this.currentFilter === 'overdue' ? 'selected' : ''}>Overdue</option>
          </select>
        </div>
        
        <div class="filter-group">
          <label for="task-sort">Sort by:</label>
          <select id="task-sort" name="sort">
            <option value="created" ${this.currentSort === 'created' ? 'selected' : ''}>Date Created</option>
            <option value="due" ${this.currentSort === 'due' ? 'selected' : ''}>Due Date</option>
            <option value="priority" ${this.currentSort === 'priority' ? 'selected' : ''}>Priority</option>
            <option value="title" ${this.currentSort === 'title' ? 'selected' : ''}>Title</option>
          </select>
        </div>
      </div>
    `;
  }

  attachEventListeners() {
    const filterSelect = document.getElementById('task-filter');
    const sortSelect = document.getElementById('task-sort');

    if (filterSelect) {
      filterSelect.addEventListener('change', (e) => {
        this.currentFilter = e.target.value;
        this.rerender();
      });
    }

    if (sortSelect) {
      sortSelect.addEventListener('change', (e) => {
        this.currentSort = e.target.value;
        this.rerender();
      });
    }
  }

  filterTasks(tasks) {
    let filtered = [...tasks];
    const now = new Date();

    switch (this.currentFilter) {
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

    return tasks.sort((a, b) => {
      switch (this.currentSort) {
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

  getCurrentFilter() {
    return this.currentFilter;
  }

  getCurrentSort() {
    return this.currentSort;
  }
}
