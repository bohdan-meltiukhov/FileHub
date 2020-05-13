import ListItem from '../list-item';
import FileItem from '../../models/file-system-objects/file-item';

/**
 * The class for displaying the file item.
 */
export default class FileItemComponent extends ListItem {
  _removeItemHandlers = [];

  /** @inheritdoc */
  initNestedComponents() {
    super.initNestedComponents();

    const iconCell = this.rootElement.querySelector('[data-test="icon-cell"]');
    iconCell.innerHTML = '&nbsp;';

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

    const cellCount = this.rootElement.querySelector('[data-test="cell-count"]');
    cellCount.innerText = this._getReadableFileSizeString(this._parameters.size);

    const cellActions = this.rootElement.querySelector('[data-test="cell-actions"]');
    const downloadButton = document.createElement('span');
    downloadButton.classList.add('glyphicon');
    downloadButton.classList.add('glyphicon-download');
    cellActions.prepend(downloadButton);
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
    let i = 0;
    const byteUnits = [' B', ' KB', ' MB', ' GB', ' TB', ' PB', ' EB', ' ZB', ' YB'];
    while (fileSizeInBytes > 1024) {
      fileSizeInBytes = fileSizeInBytes / 1024;
      i++;
    }

    return Math.round(fileSizeInBytes * 10) / 10 + byteUnits[i];
  }
}
