const STORAGE_KEY = 'odin-tasks-app';

export class StorageService {
  saveProjects(projectsData) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(projectsData));
    } catch (error) {
      console.error('Failed to save projects:', error);
      throw new Error('Storage save failed');
    }
  }

  loadProjects() {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Failed to load projects:', error);
      return [];
    }
  }

  clearProjects() {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.error('Failed to clear projects:', error);
    }
  }
}
