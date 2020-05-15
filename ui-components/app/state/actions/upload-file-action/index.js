import Action from '../action';

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
  apply(stateManager, apiService) {
    const formData = new FormData();
    formData.append('file', this._file);
    apiService.uploadFile(this._folderId, formData);
  }
}
