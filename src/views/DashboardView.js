import { Header } from '../components/Header/Header';
import { Dashboard } from '../components/Dashboard/Dashboard';

export class DashboardView {
  constructor(appState, rerenderCallback, navigateCallback) {
    this.appState = appState;
    this.rerender = rerenderCallback;
    this.navigate = navigateCallback;
    this.header = new Header(navigateCallback);
    this.dashboard = new Dashboard(appState, rerenderCallback, navigateCallback);
  }

  render() {
    const selectedProject = this.appState.getSelectedProject();
    
    return `
      ${this.header.render()}
      <main class="container">
        ${this.dashboard.render()}
        <div class="dashboard-actions">
          <button class='btn clear-all-btn' id="clear-projects">Clear All Projects</button>
        </div>
      </main>
    `;
  }

  attachEventListeners() {
    this.header.attachEventListeners();
    this.dashboard.attachEventListeners();
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
