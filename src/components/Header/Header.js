import logo from '../../assets/images/logo.svg';
import './Header.css';

export class Header {
  constructor(navigateCallback) {
    this.navigate = navigateCallback;
  }

  render() {
    return `
      <header class='header'>
        <div class='logoWrap'>
          <img src='${logo}' alt='Logo'>
          <span class="app-title">Task Manager</span>
        </div>
        <nav>
          <ul>
            <li><a id="nav-dashboard" class="nav-link">Dashboard</a></li>
            <li><a id="nav-add-project" class="nav-link">Add Project</a></li>
          </ul>
        </nav>
      </header>
    `;
  }

  attachEventListeners() {
    const dashboardBtn = document.getElementById('nav-dashboard');
    const addProjectBtn = document.getElementById('nav-add-project');

    if (dashboardBtn && this.navigate) {
      dashboardBtn.addEventListener('click', (e) => {
        e.preventDefault();
        this.navigate('dashboard');
      });
    }

    if (addProjectBtn) {
      addProjectBtn.addEventListener('click', (e) => {
        e.preventDefault();
        if (this.navigate) {
          this.navigate('add-project');
        }
      });
    }
  }
}
