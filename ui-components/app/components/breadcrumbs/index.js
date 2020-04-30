import Component from '../component.js';

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
  constructor(container, parameters) {
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
   * The object for describing the folder configurations.
   *
   * @typedef {object} FolderItemProperties
   * @property {string} id - The identifier of the folder.
   * @property {string} parentId - The id of the parent folder.
   * @property {string} name - The name of the folder.
   * @property {number} itemsNumber - The number of items inside.
   * @property {'folder'} type - Shows that this item is a folder.
   */

  /**
   * Sets the current folder.
   *
   * @param {FolderItemProperties} folder - The new folder.
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

    this._name = folder.name;
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
    } else {
      this._folderIcon.style.visibility = 'visible';
      this._folderName.innerText = `/ ${this._name}`;
    }
  }
}
