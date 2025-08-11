import './styles/main.css';
import './styles/variables.css';
import './styles/components.css';
import { AppState } from './state/AppState';
import { DashboardView } from './views/DashboardView';
import { ProjectView } from './views/ProjectView';
import { AddProjectView } from './views/AddProjectView';

class App {
  constructor() {
    this.appState = new AppState();
    this.currentView = null;
    this.currentRoute = 'dashboard';
    this.appElement = document.querySelector('#app');
    this.init();
  }

  init() {
    this.appState.initialize();
    this.render();
  }

  navigate(route) {
    this.currentRoute = route;
    this.render();
  }

  render() {
    let view;
    
    switch (this.currentRoute) {
      case 'project':
        view = new ProjectView(
          this.appState, 
          this.render.bind(this), 
          this.navigate.bind(this)
        );
        break;
      case 'add-project':
        view = new AddProjectView(
          this.appState, 
          this.render.bind(this), 
          this.navigate.bind(this)
        );
        break;
      case 'dashboard':
      default:
        view = new DashboardView(
          this.appState, 
          this.render.bind(this), 
          this.navigate.bind(this)
        );
        break;
    }

    this.currentView = view;
    this.appElement.innerHTML = this.currentView.render();
    this.currentView.attachEventListeners();
  }
}

export default App;