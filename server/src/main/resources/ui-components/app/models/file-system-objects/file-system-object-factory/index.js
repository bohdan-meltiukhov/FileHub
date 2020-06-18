import FolderItem from '../folder-item/index.js';
import FileItem from '../file-item/index.js';

/**
 * The factory that creates necessary file and folder items.
 */
export default class FileSystemObjectFactory {
  /**
   * The object for providing file parameters.
   *
   * @typedef {object} ListItemParameters
   * @property {string} name - The name of the file.
   * @property {('image'|'book'|'video'|'audio'|'stylesheet'|'other')} [mimeType] - The type of the file.
   * @property {number} [size] - The size of the file in bytes.
   * @property {number} [itemsNumber] - The number of items inside.
   * @property {('file'|'folder')} type - Shows whether it is a file or a folder.
   */

  /**
   * Provides an instance of the required list item.
   *
   * @param {ListItemParameters} item - The object that describes the file item.
   * @returns {FolderItem|FileItem} An instance of the required list item.
   */
  static createItem(item) {
    if (item.type === 'folder') {
      return new FolderItem(item);
    } else if (item.type === 'file') {
      return new FileItem(item);
    }
  }
}
