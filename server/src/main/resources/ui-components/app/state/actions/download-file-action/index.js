import Action from '../action/index.js';
import DownloadFileErrorMutator from '../../mutators/download-file-error-mutator/index.js';
import AddDownloadFileInProgressMutator from '../../mutators/add-download-file-in-progress-mutator/index.js';
import RemoveDownloadFileInProgressMutator from '../../mutators/remove-download-file-in-progress-mutator/index.js';
import FileItem from '../../../models/file-system-objects/file-item/index.js';
import DownloadFileService from '../../../services/download-file-service/index.js';

/**
 * The action that downloads the required file.
 */
export default class DownloadFileAction extends Action {
  /**
   * Creates an instance of the download file action with set file ID.
   *
   * @param {FileItem} file - The model of the required file.
   * @param {DownloadFileService} downloadFileService - The service for downloading files.
   */
  constructor(file, downloadFileService) {
    super();

    this._file = file;
    this._downloadFileService = downloadFileService;
  }

  /** @inheritdoc */
  async apply(stateManager, apiService) {
    stateManager.mutate(new AddDownloadFileInProgressMutator(this._file.id));
    try {
      const file = await apiService.getFile(this._file.id);

      this._downloadFileService.download(file, this._file.name);
    } catch (e) {
      stateManager.mutate(new DownloadFileErrorMutator(this._file, e));
    } finally {
      stateManager.mutate(new RemoveDownloadFileInProgressMutator(this._file.id));
    }
  }
}
