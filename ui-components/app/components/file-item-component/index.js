import ListItem from '../list-item';
import FileItem from '../../models/list-items/file-item';

/**
 * The class for displaying the file item.
 */
export default class FileItemComponent extends ListItem {
  /**
   * Creates an instance of the file item component with set container and properties.
   *
   * @param {Element} container - The parent element for the file item component.
   * @param {FileItem} parameters - The initial file items configurations.
   */
  constructor(container, parameters) {
    super(container, parameters.id);

    this._parameters = parameters;

    this.render();
  }

  /** @inheritdoc */
  markup() {
    return `
        <tr data-test="file-item">
            <td class="icon-cell" data-test="icon-cell">&nbsp;</td>
            <td class="filename">
                <span class="glyphicon" data-test="file-icon"></span>&nbsp;&nbsp;
                <span class="name" data-test="filename">${this._parameters.name}</span>
                <input type="text" class="input" value="${this._parameters.name}" data-test="new-name-input">
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
