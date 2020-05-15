import ListItem from '../list-item';
import {FILE_LIST_ROUTE} from '../../router/routes';

/**
 * The component for displaying the folder item.
 */
export default class FolderItemComponent extends ListItem {
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

    const actionButtons = this.rootElement.querySelector('[data-test="action-buttons"]');
    const uploadButton = document.createElement('span');
    uploadButton.classList.add('glyphicon');
    uploadButton.classList.add('glyphicon-upload');
    actionButtons.prepend(uploadButton);
  }

  /** @inheritdoc */
  addEventListeners() {
    super.addEventListeners();

    this.rootElement.addEventListener('dblclick', () => {
      window.location.hash = `/file-list/${this._parameters.id}`;
    });

    const uploadButton = this.rootElement.querySelector('[data-test="cell-actions"] .glyphicon-upload');
    uploadButton.addEventListener('click', () => this._openFileBrowser());
  }

  /**
   * Opens the file upload menu.
   *
   * @private
   */
  _openFileBrowser() {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.click();

    input.addEventListener('change', () => {
      this._fileSelectedHandler(this._parameters, input.files[0]);
    });
  }

  /** @inheritdoc */
  onFileSelected(handler) {
    this._fileSelectedHandler = handler;
  }
}
