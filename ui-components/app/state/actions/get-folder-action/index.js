import Action from '../action';
import FolderMutator from '../../mutators/folder-mutator';

/**
 * The action that gets the folder data.
 */
export default class GetFolderAction extends Action {
  /**
   * Creates an instance of the get folder action with set folder ID.
   *
   * @param {string} id - The identified of the required folder.
   */
  constructor(id) {
    super();

    this._folderId = id;
  }

  /** @inheritdoc */
  apply(stateManager, apiService) {
    apiService.getFolder(this._folderId)
      .then((folder) => {
        stateManager.mutate(new FolderMutator(folder.folder));
      });
  }
}
