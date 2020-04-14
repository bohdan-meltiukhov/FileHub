import Action from '../action';
import GetFilesAction from '../get-files-action';

/**
 * The action that removes a file or a folder.
 */
export default class RemoveItemAction extends Action {
  /**
   * The object for defining the file item parameters.
   *
   * @typedef {object} Parameters
   * @property {string} id - The identifier of the item.
   * @property {string} name - The name of the item.
   * @property {('image'|'book'|'video'|'audio'|'stylesheet'|'other')} [mimeType] - The type of the file.
   * @property {number} [size] - The size of the file in bytes.
   * @property {number} [itemsNumber] - The number of items inside.
   * @property {('file'|'folder')} type - Shows whether it is a file or a folder.
   */

  /**
   * Creates an instance of the remove item action with set identifier.
   *
   * @param {Parameters} fileItem - The item to remove.
   */
  constructor(fileItem) {
    super();

    this._fileItem = fileItem;
  }

  /** @inheritdoc */
  apply(stateManager, apiService) {
    if (this._fileItem.type === 'folder') {
      apiService.deleteFolder(this._fileItem.id)
        .then(() => {
          stateManager.dispatch(new GetFilesAction(this._fileItem.parentId));
        });
    } else if (this._fileItem.type === 'file') {
      apiService.deleteFile(this._fileItem.id)
        .then(() => {
          stateManager.dispatch(new GetFilesAction(this._fileItem.parentId));
        });
    }
  }
}
