import { StorageService } from './StorageService';
import Project from '../models/Project';
import Task from '../models/Task';
import { sanitizeDue } from '../utils/dateUtils';

export class ProjectService {
  constructor() {
    this.storageService = new StorageService();
  }

  loadProjects() {
    const projectsData = this.storageService.loadProjects();
    return projectsData.map(projectData => 
      new Project({
        ...projectData,
        tasks: (projectData.tasks || []).map(taskData => 
          new Task({
            ...taskData,
            due: sanitizeDue(taskData.due)
          })
        )
      })
    );
  }

  saveProjects(projects) {
    this.storageService.saveProjects(projects.map(p => p.toJSON()));
  }

  validateProject(project) {
    if (!(project instanceof Project)) {
      throw new Error('Invalid project instance');
    }
  }

  clearStorage() {
    this.storageService.clearProjects();
  }
}
