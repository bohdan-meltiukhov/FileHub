import Component from '../component.js';

/**
 * The class for displaying the file item.
 */
export default class FileItem extends Component {
  _removeItemHandlers = [];

  /**
   * The object for describing the file configurations.
   *
   * @typedef {object} Parameters
   * @property {string} id - The identifier of the file.
   * @property {string} parentId - The id of the parent folder.
   * @property {string} name - The name of the file.
   * @property {('image'|'book'|'video'|'audio'|'stylesheet'|'other')} mimeType - The type of the file.
   * @property {number} size - The size of the file in bytes.
   * @property {'file'} type - Shows that this item is a file.
   */

  /**
   * Creates an instance of the file item component with set container and properties.
   *
   * @param {Element} container - The parent element for the file item component.
   * @param {Parameters} parameters - The initial file items configurations.
   */
  constructor(container, parameters) {
    super(container);

    this._parameters = parameters;

    this.render();
  }

  /** @inheritdoc */
  render() {
    const fakeElement = document.createElement('tbody');
    fakeElement.innerHTML = this.markup();

    this.rootElement = fakeElement.firstElementChild;
    const parentElement = this._container.parentElement;
    parentElement.removeChild(this._container);
    parentElement.appendChild(this.rootElement);

    this.initNestedComponents();
    this.addEventListeners();
  }

  /** @inheritdoc */
  markup() {
    return `
        <tr data-test="file-item">
            <td class="icon-cell" data-test="icon-cell">&nbsp;</td>
            <td class="filename">
                <span class="glyphicon" data-test="file-icon"></span>&nbsp;&nbsp;
                <span class="name" data-test="filename">${this._parameters.name}</span>
                <input type="text" name="new-name" class="input" value="${this._parameters.name}">
            </td>
            <td class="count" data-test="cell-count">${this._getReadableFileSizeString(this._parameters.size)}</td>
            <td class="cell-actions" data-test="cell-actions">
                <span class="glyphicon glyphicon-download"></span>
                <span class="glyphicon glyphicon-remove-circle"></span>
            </td>
        </tr>
    `;
  }

  /** @inheritdoc */
  initNestedComponents() {
    const mimeTypes = {
      image: 'glyphicon-picture',
      book: 'glyphicon-book',
      video: 'glyphicon-film',
      audio: 'glyphicon-music',
      other: 'glyphicon-file',
    };

    const fileIcon = this.rootElement.querySelector('[data-test="file-icon"]');
    if (Object.prototype.hasOwnProperty.call(mimeTypes, this._parameters.mimeType)) {
      fileIcon.classList.add(mimeTypes[this._parameters.mimeType]);
    } else {
      fileIcon.classList.add('glyphicon-file');
    }
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

  /**
   * Converts bytes to a human-readable string.
   *
   * @param {number} fileSizeInBytes - The size in bytes.
   * @returns {string} The size as a readable string.
   * @private
   */
  _getReadableFileSizeString(fileSizeInBytes) {
    let i = -1;
    const byteUnits = [' KB', ' MB', ' GB', ' TB', 'PB', 'EB', 'ZB', 'YB'];
    do {
      fileSizeInBytes = fileSizeInBytes / 1024;
      i++;
    } while (fileSizeInBytes > 1024);

    return Math.max(fileSizeInBytes, 0.1).toFixed(1) + byteUnits[i];
  }
}
