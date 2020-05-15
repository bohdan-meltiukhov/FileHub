import Action from '../action';
import IsUploadFileInProgressMutator from '../../mutators/is-upload-file-in-progress-mutator';
import GetFilesAction from '../get-files-action';
import UploadFileErrorMutator from '../../mutators/upload-file-error-mutator';

/**
 * The action that uploads the provided file.
 */
export default class UploadFileAction extends Action {
  /**
   * Creates an instance of the upload file action with set folder id and file.
   *
   * @param {string} folderId - The identifier of folder to upload the file to.
   * @param {File} file - The file to upload.
   */
  constructor(folderId, file) {
    super();

    this._folderId = folderId;
    this._file = file;
  }

  /** @inheritdoc */
  async apply(stateManager, apiService) {
    stateManager.mutate(new IsUploadFileInProgressMutator(this._folderId, true));
    try {
      const formData = new FormData();
      formData.append('file', this._file);
      await apiService.uploadFile(this._folderId, formData);
      if (this._folderId === stateManager.state.locationParameters.folderId) {
        stateManager.dispatch(new GetFilesAction(this._folderId));
      }
    } catch (e) {
      stateManager.mutate(new UploadFileErrorMutator(e));
    } finally {
      stateManager.mutate(new IsUploadFileInProgressMutator(this._folderId, false));
    }
  }
}
