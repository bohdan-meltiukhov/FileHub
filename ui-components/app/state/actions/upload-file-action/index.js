import Action from '../action';
import GetFilesAction from '../get-files-action';

/**
 * The action that uploads the provided file.
 */
export default class UploadFileAction extends Action {
  /**
   * The object for describing the folder configurations.
   *
   * @typedef {object} FolderItemProperties
   * @property {string} id - The identifier of the folder.
   * @property {string} parentId - The id of the parent folder.
   * @property {string} name - The name of the folder.
   * @property {number} itemsNumber - The number of items inside.
   * @property {'folder'} type - Shows that this item is a folder.
   */

  /**
   * Creates an instance of the upload file action with set folder id and file.
   *
   * @param {FolderItemProperties} folder - The folder to upload the file to.
   * @param {File} file - The file to upload.
   */
  constructor(folder, file) {
    super();

    this._folder = folder;
    this._file = file;
  }

  /** @inheritdoc */
  async apply(stateManager, apiService) {
    const formData = new FormData();
    formData.append('file', this._file);
    await apiService.uploadFile(this._folder.id, formData);
  }
}
