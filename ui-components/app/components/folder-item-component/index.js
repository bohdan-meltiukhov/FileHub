import ListItem from '../list-item';
import {FILE_LIST_ROUTE} from '../../router/routes';

/**
 * The component for displaying the folder item.
 */
export default class FolderItemComponent extends ListItem {
  _removeItemHandlers = [];

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

    const removeItemButton = this.rootElement
      .querySelector('[data-test="cell-actions"] .glyphicon-remove-circle');
    removeItemButton.addEventListener('click', () => {
      this._removeItemHandlers.forEach((handler) => {
        handler(this._parameters);
      });
    });

    this.rootElement.addEventListener('dblclick', () => {
      window.location.hash = `/file-list/${this._parameters.id}`;
    });
  }

  /**
   * Adds a function that should be called when the remove item button is pressed.
   *
   * @param {Function} handler - The function that will be called when the user wants to delete an item.
   */
  onRemoveItem(handler) {
    this._removeItemHandlers.push(handler);
  }
}
