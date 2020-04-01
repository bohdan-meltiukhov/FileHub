import Component from '../component.js';

/**
 * The component for the file explorer.
 */
export default class FileExplorer extends Component {
  /**
   * Creates an instance of the file explorer component with set container.
   * @param container
   */
  constructor(container) {
    super(container);

    this.render();
  }

  /**
   * @inheritdoc
   */
  markup() {
    return `
      <div class="application-box" data-test="file-explorer">
        <img src="app/images/logo.png" class="logo" alt="logo">
    
        <ul class="menu">
            <li><span class="glyphicon glyphicon-user"></span> John Doe</li>
            <li><a href="authentication.html">Log Out <span class="glyphicon glyphicon-log-out"></span></a></li>
        </ul>
    
        <header class="header">
            <a href="#"><h1>File Explorer</h1></a>
        </header>
    
        <main class="file-list">
            <div class="current-directory">
                <span class="glyphicon glyphicon-folder-open folder-icon"></span>
                <span class="directory-name">/ Root</span>
                <div class="function-buttons">
                    <button class="button">
                        <span class="glyphicon glyphicon-plus"></span> Create folder
                    </button>
                    <button class="button">
                        <span class="glyphicon glyphicon-upload"></span> Upload File
                    </button>
                </div>
            </div>
    
            <table class="files">
                <tr>
                    <td class="icon-cell">
                        <span class="glyphicon glyphicon-menu-right"></span>
                    </td>
                    <td class="filename">
                        <span class="glyphicon glyphicon-folder-close"></span>&nbsp;&nbsp;
                        <span class="name"><a href="#" title="Documents">Documents</a></span>
                        <input type="text" name="new-name" class="input" value="Documents">
                    </td>
                    <td class="count">2 items</td>
                    <td class="cell-actions">
                        <span class="glyphicon glyphicon-upload"></span>
                        <span class="glyphicon glyphicon-remove-circle"></span>
                    </td>
                </tr>
    
                <tr>
                    <td class="icon-cell">
                        <span class="glyphicon glyphicon-menu-right"></span>
                    </td>
                    <td class="filename">
                        <span class="glyphicon glyphicon-folder-close"></span>&nbsp;&nbsp;
                        <span class="name"><a href="#" title="Documents">Images</a></span>
                        <input type="text" name="new-name" class="input" value="Images">
                    </td>
                    <td class="count">215 items</td>
                    <td class="cell-actions">
                        <span class="glyphicon glyphicon-upload"></span>
                        <span class="glyphicon glyphicon-remove-circle"></span>
                    </td>
                </tr>
    
                <tr>
                    <td class="icon-cell">
                    </td>
                    <td class="filename">
                        <span class="glyphicon glyphicon-music"></span>&nbsp;&nbsp;
                        <span class="name">hello.mp3</span>
                    </td>
                    <td class="count">15 MB</td>
                    <td class="cell-actions">
                        <span class="glyphicon glyphicon-download"></span>
                        <span class="glyphicon glyphicon-remove-circle"></span>
                    </td>
                </tr>
    
                <tr>
                    <td class="icon-cell">
                    </td>
                    <td class="filename">
                        <span class="glyphicon glyphicon-film"></span>&nbsp;&nbsp;
                        <span class="name">film.avi</span>
                    </td>
                    <td class="count">1.3 GB</td>
                    <td class="cell-actions">
                        <span class="glyphicon glyphicon-download"></span>
                        <span class="glyphicon glyphicon-remove-circle"></span>
                    </td>
                </tr>
            </table>
        </main>
    
        <footer class="footer">
            Copyright &copy; 2020 <a href="https://www.teamdev.com/" target="_blank">TeamDev</a>. All rights reserved.
        </footer>
    </div>
    `;
  }
}
