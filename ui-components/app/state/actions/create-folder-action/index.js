import Action from '../action';
import GetFilesAction from '../get-files-action';

/**
 * The action that creates a folder.
 */
export default class CreateFolderAction extends Action {
  /**
   * Creates an instance of the create folder action with set folder id.
   *
   * @param {string} folderId - The identifier of the parent folder.
   */
  constructor(folderId) {
    super();

    this._folderId = folderId;
  }

  /** @inheritdoc */
  apply(stateManager, apiService) {
    apiService.createFolder(this._folderId)
      .then(() => {
        stateManager.dispatch(new GetFilesAction(this._folderId));
      });
  }
}
