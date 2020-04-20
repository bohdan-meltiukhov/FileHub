import ListItem from '../list-item';

/**
 * The component for displaying the folder item.
 */
export default class FolderItem extends ListItem {
  _removeItemHandlers = [];

  /**
   * The object for describing the folder configurations.
   *
   * @typedef {object} Parameters
   * @property {string} id - The identifier of the folder.
   * @property {string} parentId - The id of the parent folder.
   * @property {string} name - The name of the folder.
   * @property {number} itemsNumber - The number of items inside.
   * @property {'folder'} type - Shows that this item is a folder.
   */

  /**
   * Creates an instance of the folder item component with set container and properties.
   *
   * @param {Element} container - The parent element for the folder item component.
   * @param {Parameters} parameters - The initial folder items configurations.
   */
  constructor(container, parameters) {
    super(container);

    this._parameters = parameters;

    this.render();
  }

  /** @inheritdoc */
  markup() {
    return `
        <tr data-test="file-item">
            <td class="icon-cell" data-test="icon-cell"><span class="glyphicon glyphicon-menu-right"></span></td>
            <td class="filename">
                <span class="glyphicon glyphicon-folder-close" data-test="file-icon"></span>&nbsp;&nbsp;
                <span class="name" data-test="filename">
                    <a href="#/file-list" title="${this._parameters.name}">${this._parameters.name}</a>
                </span>
                <input type="text" class="input" value="${this._parameters.name}" data-test="new-name-input">
            </td>
            <td class="count" data-test="cell-count">${this._parameters.itemsNumber} items</td>
            <td class="cell-actions" data-test="cell-actions">
                <span class="glyphicon glyphicon-upload"></span>
                <span class="glyphicon glyphicon-remove-circle"></span>
            </td>
        </tr>
    `;
  }

  /** @inheritdoc */
  addEventListeners() {
    const removeItemButton = this.rootElement
      .querySelector('[data-test="cell-actions"] .glyphicon-remove-circle');
    removeItemButton.addEventListener('click', () => {
      this._removeItemHandlers.forEach((handler) => {
        handler(this._parameters);
      });
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
