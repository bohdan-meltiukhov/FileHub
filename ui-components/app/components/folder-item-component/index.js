import ListItem from '../list-item';
import FolderItem from '../../models/file-system-objects/folder-item';
import {FILE_LIST_ROUTE} from '../../router/routes';

/**
 * The component for displaying the folder item.
 */
export default class FolderItemComponent extends ListItem {
  /**
   * Creates an instance of the folder item component with set container and properties.
   *
   * @param {Element} container - The parent element for the folder item component.
   * @param {FolderItem} parameters - The initial folder items configurations.
   */
  constructor(container, parameters) {
    super(container, parameters);

    this._parameters = parameters;

    this.render();
  }

  /** @inheritdoc */
  initNestedComponents() {
    super.initNestedComponents();

    const iconCell = this.rootElement.querySelector('[data-test="icon-cell"]');
    iconCell.innerHTML = '<span class="glyphicon glyphicon-menu-right"></span>';

    const fileIcon = this.rootElement.querySelector('[data-test="file-icon"]');
    fileIcon.classList.add('glyphicon-folder-close');

    const folderPath = FILE_LIST_ROUTE.replace(':folderId', this._parameters.id);
    this._filename.innerHTML = `<a href="#${folderPath}" title="${this._parameters.name}">${this._parameters.name}</a>`;

    const cellCount = this.rootElement.querySelector('[data-test="cell-count"]');
    cellCount.innerText = `${this._parameters.itemsNumber} items`;

    const cellActions = this.rootElement.querySelector('[data-test="cell-actions"]');
    const uploadButton = document.createElement('span');
    uploadButton.classList.add('glyphicon');
    uploadButton.classList.add('glyphicon-upload');
    cellActions.prepend(uploadButton);
  }

  /** @inheritdoc */
  addEventListeners() {
    super.addEventListeners();

    this.rootElement.addEventListener('dblclick', () => {
      window.location.hash = `/file-list/${this._parameters.id}`;
    });
  }
}
