import './styles/main.css';
import './styles/variables.css';
import './styles/components.css';
import { AppState } from './state/AppState';
import { DashboardView } from './views/DashboardView';

class App {
  constructor() {
    this.appState = new AppState();
    this.currentView = null;
    this.appElement = document.querySelector('#app');
    this.init();
  }

  init() {
    this.appState.initialize();
    this.render();
  }

  render() {
    this.currentView = new DashboardView(this.appState, this.render.bind(this));
    this.appElement.innerHTML = this.currentView.render();
    this.currentView.attachEventListeners();
  }
}

export default App;