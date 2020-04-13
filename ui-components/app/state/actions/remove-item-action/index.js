import Action from '../action';
import GetFilesAction from '../get-files-action';

/**
 * The action that removes a file or a folder.
 */
export default class RemoveItemAction extends Action {
  /**
   * Creates an instance of the remove item action with set identifier.
   *
   * @param {string} removeId - The identifier of the item to be removed.
   * @param {string} currentFolderId - The identified of the current folder.
   */
  constructor(removeId, currentFolderId) {
    super();

    this._removeId = removeId;
    this._currentFolderId = currentFolderId;
  }

  /** @inheritdoc */
  apply(stateManager, apiService) {
    apiService.deleteFolder(this._removeId)
      .then(() => {
        stateManager.dispatch(new GetFilesAction(this._currentFolderId));
      });
  }
}
