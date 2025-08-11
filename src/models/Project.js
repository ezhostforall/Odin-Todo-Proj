import Task from './Task';

export default class Project {
  constructor({id=`project-${crypto.randomUUID()}`, name, description, tasks=[]}) {
    if (!name) {
      throw new Error('Name is required');
    }
    this.id = id;
    this.name = name;
    this.description = description || 'No description provided';
    this.tasks = Array.isArray(tasks) && tasks.every(t => t instanceof Task) ? tasks : [];
  }

  addTask(task) {
    if (!(task instanceof Task)) {
      throw new Error('Invalid task');
    }
    this.tasks.push(task);
  }

  removeTask(taskId) {
    this.tasks = this.tasks.filter(t => t.id !== taskId);
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      description: this.description,
      tasks: this.tasks.map(task => task.toJSON())
    };
  }
}