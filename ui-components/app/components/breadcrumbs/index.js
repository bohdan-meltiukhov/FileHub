import Component from '../component.js';
import FolderItem from '../../models/file-system-objects/folder-item';

/**
 * The component for displaying breadcrumbs.
 */
export default class Breadcrumbs extends Component {
  /**
   * The object for providing the Breadcrumbs configuration via the constructor.
   *
   * @typedef {object} Parameters
   * @property {string} folderName - The name of the current folder.
   */

  /**
   * Creates an instance of the Inner Breadcrumbs component with set container and folder.
   *
   * @param {Element} container - The parent element for the breadcrumbs component.
   */
  constructor(container) {
    super(container);

    this.render();
  }

  /** @inheritdoc */
  markup() {
    return `
        <div data-test="breadcrumbs">
            <div class="folder-icon" data-test="folder-icon"></div>
            <span class="directory-name">
                <span data-test="directory-name"></span>
                <span data-test="loading-message">Loading...</span>
            </span>
        </div>
    `;
  }

  /** @inheritdoc */
  initNestedComponents() {
    this._folderIcon = this.rootElement.querySelector('[data-test="folder-icon"]');
    this._folderName = this.rootElement.querySelector('[data-test="directory-name"]');
    this._loadingMessage = this.rootElement.querySelector('[data-test="loading-message"]');
  }

  /**
   * Sets the current folder.
   *
   * @param {FolderItem} folder - The new folder.
   */
  set folder(folder) {
    if (folder.parentId === 'none') {
      this._folderIcon.innerHTML = '<span class="glyphicon glyphicon-folder-open"></span>';
    } else {
      this._folderIcon.innerHTML = `
        <a href="#/file-list/${folder.parentId}">
            <span class="glyphicon glyphicon-level-up"></span>
        </a>
      `;
    }

    this._folderIcon.style.visibility = 'visible';
    this._folderName.innerText = `/ ${folder.name}`;
  }

  /**
   * Sets whether the folder data is being loaded or not.
   *
   * @param {boolean} isLoading - The flag that shows if the folder data is being loaded.
   */
  set isLoading(isLoading) {
    if (isLoading) {
      this._folderIcon.style.visibility = 'hidden';
      this._folderName.innerText = '';
      this._loadingMessage.style.display = 'inline';
    } else {
      this._loadingMessage.style.display = 'none';
    }
  }

  /**
   * Shows the provided error message.
   *
   * @param {string} message - The message to show.
   */
  set error(message) {
    this._folderIcon.style.visibility = 'hidden';
    this._folderName.innerText = message;
  }
}
