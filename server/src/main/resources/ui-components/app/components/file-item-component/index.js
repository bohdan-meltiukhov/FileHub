import ListItem from '../list-item/index.js';

/**
 * The class for displaying the file item.
 */
export default class FileItemComponent extends ListItem {
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

    const actionButtons = this.rootElement.querySelector('[data-test="action-buttons"]');
    const downloadButton = document.createElement('span');
    downloadButton.classList.add('glyphicon');
    downloadButton.classList.add('glyphicon-download');
    downloadButton.setAttribute('data-test', 'download-button');
    actionButtons.prepend(downloadButton);
  }

  /** @inheritdoc */
  addEventListeners() {
    super.addEventListeners();

    const downloadButton = this.rootElement.querySelector('[data-test="download-button"]');
    downloadButton.addEventListener('click',
      () => this._downloadButtonPressedHandler(this._parameters));
  }

  /**
   * Sets the function to be called when the user wants to download the file.
   *
   * @param {Function} handler - The function to call when the user wants to download the file.
   */
  onDownloadButtonPressed(handler) {
    this._downloadButtonPressedHandler = handler;
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
