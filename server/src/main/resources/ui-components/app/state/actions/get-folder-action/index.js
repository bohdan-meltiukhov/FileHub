import Action from '../action/index.js';
import FolderMutator from '../../mutators/folder-mutator/index.js';
import IsFolderLoadingMutator from '../../mutators/is-folder-loading-mutator/index.js';
import FolderLoadingErrorMutator from '../../mutators/folder-loading-error-mutator/index.js';

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
  async apply(stateManager, apiService) {
    stateManager.mutate(new IsFolderLoadingMutator(true));
    try {
      const folder = await apiService.getFolder(this._folderId);
      stateManager.mutate(new FolderMutator(folder));
    } catch (e) {
      stateManager.mutate(new FolderLoadingErrorMutator(e));
    } finally {
      stateManager.mutate(new IsFolderLoadingMutator(false));
    }
  }
}
