import Action from '../action';
import DownloadFileErrorMutator from '../../mutators/download-file-error-mutator';
import AddDownloadFileInProgressMutator from '../../mutators/add-download-file-in-progress-mutator';
import RemoveDownloadFileInProgressMutator from '../../mutators/remove-download-file-in-progress-mutator';
import FileItem from '../../../models/file-system-objects/file-item';
import DownloadFileService from '../../../services/download-file-service';

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
      stateManager.mutate(new DownloadFileErrorMutator(e));
    } finally {
      stateManager.mutate(new RemoveDownloadFileInProgressMutator(this._file.id));
    }
  }
}
