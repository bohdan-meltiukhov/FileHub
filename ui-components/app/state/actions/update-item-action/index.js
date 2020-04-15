import Action from '../action';
import GetFilesAction from '../get-files-action';

/**
 * The action that updates a file or a folder.
 */
export default class UpdateItemAction extends Action {
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
   * Creates an instance of the update item action with set item.
   *
   * @param {Parameters} item - The new item.
   */
  constructor(item) {
    super();

    this._item = item;
  }

  /** @inheritdoc */
  apply(stateManager, apiService) {
    if (this._item.type === 'folder') {
      apiService.updateFolder(this._item)
        .then(() => {
          stateManager.dispatch(new GetFilesAction(this._item.parentId));
        });
    } else if (this._item.type === 'file') {
      apiService.updateFile(this._item)
        .then(() => {
          stateManager.dispatch(new GetFilesAction(this._item.parentId));
        });
    }
  }
}
