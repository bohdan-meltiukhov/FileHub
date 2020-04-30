import Action from '../action';
import IsFileListLoadingMutator from '../../mutators/is-file-list-loading-mutator';
import FileListMutator from '../../mutators/file-list-mutator';
import FileListLoadingErrorMutator from '../../mutators/file-list-loading-error-mutator';
import ListItemFactory from '../../../models/list-items/list-item-factory';

/**
 * The actions that gets files from the server.
 */
export default class GetFilesAction extends Action {
  /**
   * Creates an instance of the GetFilesAction with set folder ID.
   *
   * @param {string} folderId - The identifier of the required folder.
   */
  constructor(folderId) {
    super();

    this._folderId = folderId;
  }

  /** @inheritdoc */
  async apply(stateManager, apiService) {
    stateManager.mutate(new IsFileListLoadingMutator(true));
    try {
      const files = await apiService.getFiles(this._folderId);
      const items = files.files.map((item) => ListItemFactory.createItem(item));
      stateManager.mutate(new FileListMutator(items));
      stateManager.mutate(new IsFileListLoadingMutator(false));
    } catch (e) {
      stateManager.mutate(new FileListLoadingErrorMutator(e.message));
    }
  }
}
