import Action from '../action';
import DownloadedFileMutator from '../../mutators/downloaded-file-mutator';

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
  apply(stateManager, apiService) {
    apiService.getFile(this._fileId)
      .then((file) => {
        console.log('file in action', file);
        stateManager.mutate(new DownloadedFileMutator(file));
      });
  }
}
