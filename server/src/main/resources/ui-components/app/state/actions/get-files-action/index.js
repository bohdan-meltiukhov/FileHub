import Action from '../action/index.js';
import IsFileListLoadingMutator from '../../mutators/is-file-list-loading-mutator/index.js';
import FileListMutator from '../../mutators/file-list-mutator/index.js';
import FileListLoadingErrorMutator from '../../mutators/file-list-loading-error-mutator/index.js';
import FolderItem from '../../../models/file-system-objects/folder-item/index.js';
import FileItem from '../../../models/file-system-objects/file-item/index.js';

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
      const response = await apiService.getFiles(this._folderId);

      const folders = response.folders.map((folder) => new FolderItem(folder));
      const files = response.files.map((file) => new FileItem(file));
      const items = folders.concat(files);

      stateManager.mutate(new FileListMutator(items));
    } catch (e) {
      stateManager.mutate(new FileListLoadingErrorMutator(e));
    } finally {
      stateManager.mutate(new IsFileListLoadingMutator(false));
    }
  }
}
