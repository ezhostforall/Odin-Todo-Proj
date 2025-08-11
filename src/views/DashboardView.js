import { Header } from '../components/Header/Header';
import { Dashboard } from '../components/Dashboard/Dashboard';

export class DashboardView {
  constructor(appState, rerenderCallback) {
    this.appState = appState;
    this.rerender = rerenderCallback;
    this.header = new Header();
    this.dashboard = new Dashboard(appState, rerenderCallback);
  }

  render() {
    const selectedProject = this.appState.getSelectedProject();
    
    return `
      ${this.header.render()}
      ${!selectedProject ? `<h1>No Project Selected</h1>` : `
        <main>
          ${this.dashboard.render()}
          <button class='btn clear-all-btn' id="clear-projects">Clear All Projects</button>
        </main>
      `}
    `;
  }

  attachEventListeners() {
    this.header.attachEventListeners();
    
    const selectedProject = this.appState.getSelectedProject();
    if (selectedProject) {
      this.dashboard.attachEventListeners();
    }

    this.attachClearProjectsListener();
  }

  attachClearProjectsListener() {
    const clearBtn = document.getElementById('clear-projects');
    if (clearBtn) {
      clearBtn.addEventListener('click', () => {
        if (confirm('Are you sure you want to clear all projects?')) {
          this.appState.clearAllProjects();
          this.rerender();
        }
      });
    }
  }
}
