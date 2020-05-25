import Action from '../action';
import GetFilesAction from '../get-files-action';
import RenameFolderMutator from '../../mutators/rename-folder-mutator';
import IsCreateFolderInProgressMutator from '../../mutators/is-create-folder-in-progress-mutator';
import CreateFolderErrorMutator from '../../mutators/create-folder-error-mutator';

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
  async apply(stateManager, apiService) {
    stateManager.mutate(new IsCreateFolderInProgressMutator(true));
    try {
      const createdFolder = await apiService.createFolder(this._folderId);

      await stateManager.dispatch(new GetFilesAction(this._folderId));
      stateManager.mutate(new RenameFolderMutator(createdFolder.id));
    } catch (e) {
      stateManager.mutate(new CreateFolderErrorMutator(e));
    } finally {
      stateManager.mutate(new IsCreateFolderInProgressMutator(false));
    }
  }
}
