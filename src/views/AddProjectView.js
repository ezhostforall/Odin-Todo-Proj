import { Header } from '../components/Header/Header';
import { AddProjectForm } from '../components/AddProjectForm/AddProjectForm';

export class AddProjectView {
  constructor(appState, rerenderCallback, navigateCallback) {
    this.appState = appState;
    this.rerender = rerenderCallback;
    this.navigate = navigateCallback;
    this.header = new Header(navigateCallback);
    this.addProjectForm = new AddProjectForm(appState, rerenderCallback, navigateCallback);
  }

  render() {
    return `
      ${this.header.render()}
      <main class="container">
        ${this.addProjectForm.render()}
      </main>
    `;
  }

  attachEventListeners() {
    this.header.attachEventListeners();
    this.addProjectForm.attachEventListeners();
  }
}
