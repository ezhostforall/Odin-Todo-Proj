import logo from '../../assets/images/logo.svg';
import './Header.css';

export class Header {
  render() {
    return `
      <header class='header'>
        <div class='logoWrap'>
          <img src='${logo}' alt='Logo'>
        </div>
        <nav>
          <ul>
            <li><a id="add-project">Add Project</a></li>
            <li><a id="view-projects">View Projects</a></li>
          </ul>
        </nav>
      </header>
    `;
  }

  attachEventListeners() {
    const addProjectBtn = document.getElementById('add-project');
    const viewProjectsBtn = document.getElementById('view-projects');

    if (addProjectBtn) {
      addProjectBtn.addEventListener('click', () => {
        console.log('Add project clicked');
        // TODO: Implement add project functionality
      });
    }

    if (viewProjectsBtn) {
      viewProjectsBtn.addEventListener('click', () => {
        console.log('View projects clicked');
        // TODO: Implement view projects functionality
      });
    }
  }
}
