import Component from '../component.js';
import {FILE_LIST_ROUTE} from '../../router/routes';
import FolderItem from '../../models/list-items/folder-item';

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
   * @param {Parameters} parameters - The initial component parameters.
   */
  constructor(container, parameters = {folderName: ''}) {
    super(container);

    this.render();
    this._name = parameters.folderName;
  }

  /** @inheritdoc */
  markup() {
    return `
        <div data-test="breadcrumbs">
            <div class="folder-icon" data-test="folder-icon"></div>
            <span class="directory-name" data-test="directory-name"></span>
        </div>
    `;
  }

  /** @inheritdoc */
  initNestedComponents() {
    this._folderIcon = this.rootElement.querySelector('[data-test="folder-icon"]');
    this._folderName = this.rootElement.querySelector('[data-test="directory-name"]');
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
      this._folderName.innerText = 'Loading...';
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
