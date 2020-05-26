import Action from '../action';
import DownloadedFileMutator from '../../mutators/downloaded-file-mutator';
import DownloadFileErrorMutator from '../../mutators/download-file-error-mutator';

/**
 * The action that downloads the required file.
 */
export default class DownloadFileAction extends Action {
  /**
   * Creates an instance of the download file action with set file ID.
   *
   * @param {string} fileId - The identifier of the required file.
   */
  constructor(fileId) {
    super();

    this._fileId = fileId;
  }

  /** @inheritdoc */
  async apply(stateManager, apiService) {
    try {
      const file = await apiService.getFile(this._fileId);
      stateManager.mutate(new DownloadedFileMutator(file));
    } catch (e) {
      stateManager.mutate(new DownloadFileErrorMutator(e));
    }
  }
}
