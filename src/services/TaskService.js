import Task from '../models/Task';

export class TaskService {
  validateTask(task) {
    if (!(task instanceof Task)) {
      throw new Error('Invalid task instance');
    }
  }

  formatTaskForDisplay(task) {
    return {
      ...task.toJSON(),
      formattedDue: task.due ? task.due.toLocaleDateString() : 'No due date'
    };
  }
}
