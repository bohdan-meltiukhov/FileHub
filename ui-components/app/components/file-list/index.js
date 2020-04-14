import Component from '../component.js';
import FileItem from '../file-item';
import FolderItem from '../folder-item';

/**
 * The component for displaying the file list.
 */
export default class FileList extends Component {
  /**
   * The object for providing file parameters.
   *
   * @typedef {object} FileParameters
   * @property {string} name - The name of the file.
   * @property {('image'|'book'|'video'|'audio'|'stylesheet'|'other')} [mimeType] - The type of the file.
   * @property {number} [size] - The size of the file in bytes.
   * @property {number} [itemsNumber] - The number of items inside.
   * @property {('file'|'folder')} type - Shows whether it is a file or a folder.
   */

  /**
   * Creates an instance of the file list with set container and file items.
   *
   * @param {Element} container - The parent element for the file item component.
   * @param {FileParameters[]} files - The array of files to be displayed.
   */
  constructor(container, files = []) {
    super(container);

    this._files = files;

    this.render();
  }

  /** @inheritdoc */
  markup() {
    return `
        <table class="files" data-test="file-list-table"></table>
    `;
  }

  /** @inheritdoc */
  initNestedComponents() {
    this._fileItems = [];
    this._files.forEach((file) => {
      const row = document.createElement('tr');
      this.rootElement.appendChild(row);
      // console.log(file);
      if (file.type === 'folder') {
        this._fileItems.push(new FolderItem(row, file));
      } else if (file.type === 'file') {
        this._fileItems.push(new FileItem(row, file));
      }
      // this._fileItems.push(new FileItem(row, file));
    });
  }

  /**
   * Adds a function that should be called when an item is deleted.
   *
   * @param {Function} handler - The function to call when the use wants to delete an item.
   */
  onRemoveItem(handler) {
    this._fileItems.forEach((item) => {
      item.onRemoveItem(handler);
    });
  }

  /**
   * Shows the new list of files.
   *
   * @param {FileParameters[]} fileList - The array of files to be displayed.
   */
  set files(fileList) {
    this._files = fileList;
    this.initNestedComponents();
  }
}
