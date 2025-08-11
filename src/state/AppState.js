import { ProjectService } from '../services/ProjectService';
import { TaskService } from '../services/TaskService';
import Project from '../models/Project';
import Task from '../models/Task';

export class AppState {
  constructor() {
    this.projects = [];
    this.selectedProjectId = null;
    this.projectService = new ProjectService();
    this.taskService = new TaskService();
  }

  initialize() {
    this.projects = this.projectService.loadProjects();
    
    if (this.projects.length === 0) {
      this.createDefaultProject();
    } else if (!this.selectedProjectId) {
      this.selectedProjectId = this.projects[0].id;
    }
  }

  createDefaultProject() {
    const defaultProject = new Project({ 
      name: 'Default Project',
      description: 'Your first project' 
    });
    const defaultTask = new Task({ 
      title: 'Sample Task', 
      due: '2025-12-31' 
    });
    
    this.addProject(defaultProject);
    this.addTaskToProject(defaultProject.id, defaultTask);
    this.selectProject(defaultProject.id);
  }

  // Project methods
  getProjects() {
    return this.projects;
  }

  getSelectedProject() {
    return this.projects.find(p => p.id === this.selectedProjectId);
  }

  addProject(project) {
    this.projectService.validateProject(project);
    this.projects.push(project);
    this.projectService.saveProjects(this.projects);
  }

  removeProject(projectId) {
    this.projects = this.projects.filter(p => p.id !== projectId);
    this.projectService.saveProjects(this.projects);
    
    if (this.selectedProjectId === projectId) {
      this.selectedProjectId = this.projects.length > 0 ? this.projects[0].id : null;
    }
  }

  selectProject(projectId) {
    this.selectedProjectId = projectId;
  }

  // Task methods
  addTaskToProject(projectId, task) {
    const project = this.projects.find(p => p.id === projectId);
    if (!project) {
      throw new Error('Project not found');
    }
    
    this.taskService.validateTask(task);
    project.addTask(task);
    this.projectService.saveProjects(this.projects);
  }

  removeTaskFromProject(projectId, taskId) {
    const project = this.projects.find(p => p.id === projectId);
    if (!project) {
      throw new Error('Project not found');
    }
    
    project.removeTask(taskId);
    this.projectService.saveProjects(this.projects);
  }

  clearAllProjects() {
    this.projects = [];
    this.selectedProjectId = null;
    this.projectService.clearStorage();
    this.initialize();
  }
}
