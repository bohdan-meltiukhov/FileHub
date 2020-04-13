import Component from '../component.js';

/**
 * The class for displaying the file item.
 */
export default class FileItem extends Component {
  _removeItemHandlers = [];

  /**
   * The object for providing the file item configuration via the constructor.
   *
   * @typedef {object} Parameters
   * @property {string} id - The identifier of the file item.
   * @property {string} name - The name of the file.
   * @property {('image'|'book'|'video'|'audio'|'stylesheet'|'other')} [mimeType] - The type of the file.
   * @property {number} [size] - The size of the file in bytes.
   * @property {number} [itemsNumber] - The number of items inside.
   * @property {('file'|'folder')} type - Shows whether it is a file or a folder.
   */

  /**
   * Creates an instance of the file item component with set container and properties.
   *
   * @param {Element} container - The parent element for the file item component.
   * @param {Parameters} parameters - The initial file items configurations.
   */
  constructor(container, {
    id,
    name = 'File',
    mimeType = 'other',
    size = 16,
    itemsNumber = 0,
    type = 'file',
  } = {}) {
    super(container);

    this._id = id;
    this._name = name;
    this._mimeType = mimeType;
    this._size = size;
    this._itemsNumber = itemsNumber;
    this._type = type;

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
            <td class="icon-cell" data-test="icon-cell"></td>
            <td class="filename">
                <span class="glyphicon" data-test="file-icon"></span>&nbsp;&nbsp;
                <span class="name" data-test="filename">${this._name}</span>
                <input type="text" name="new-name" class="input" value="${this._name}">
            </td>
            <td class="count" data-test="cell-count"></td>
            <td class="cell-actions" data-test="cell-actions"></td>
        </tr>
    `;
  }

  /** @inheritdoc */
  initNestedComponents() {
    const iconCell = this.rootElement.querySelector('[data-test="icon-cell"]');
    if (this._type === 'folder') {
      iconCell.innerHTML = '<span class="glyphicon glyphicon-menu-right"></span>';
    } else {
      iconCell.innerHTML = '&nbsp;';
    }

    const mimeTypes = {
      image: 'glyphicon-picture',
      book: 'glyphicon-book',
      video: 'glyphicon-film',
      audio: 'glyphicon-music',
      other: 'glyphicon-file',
    };

    const fileIcon = this.rootElement.querySelector('[data-test="file-icon"]');
    if (this._type === 'folder') {
      fileIcon.classList.add('glyphicon-folder-close');
    } else if (Object.prototype.hasOwnProperty.call(mimeTypes, this._mimeType)) {
      fileIcon.classList.add(mimeTypes[this._mimeType]);
    } else {
      fileIcon.classList.add('glyphicon-file');
    }

    const filename = this.rootElement.querySelector('[data-test="filename"]');
    if (this._type === 'folder') {
      filename.innerHTML = `<a href="#" title="${this._name}">${this._name}</a>`;
    }

    const count = this.rootElement.querySelector('[data-test="cell-count"]');
    if (this._type === 'folder') {
      count.innerText = `${this._itemsNumber} items`;
    } else {
      count.innerText = this._getReadableFileSizeString(this._size);
    }

    const cellActions = this.rootElement.querySelector('[data-test="cell-actions"]');
    if (this._type === 'folder') {
      cellActions.innerHTML = '<span class="glyphicon glyphicon-upload"></span>';
    } else {
      cellActions.innerHTML = '<span class="glyphicon glyphicon-download"></span>';
    }
    cellActions.innerHTML += ' <span class="glyphicon glyphicon-remove-circle"></span>';
  }

  /** @inheritdoc */
  addEventListeners() {
    const removeItemButton = this.rootElement
      .querySelector('[data-test="cell-actions"] .glyphicon-remove-circle');
    removeItemButton.addEventListener('click', () => {
      this._removeItemHandlers.forEach((handler) => {
        handler(this._id);
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
