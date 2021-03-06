import Mutator from '../mutator';
import AuthorizationError from '../../../models/errors/authorization-error';
import NotFoundError from '../../../models/errors/not-found-error';
import GeneralServerError from '../../../models/errors/general-server-error';
import FileItem from '../../../models/file-system-objects/file-item';

/**
 * The mutator that sets the error that occurred during the download file process.
 */
export default class DownloadFileErrorMutator extends Mutator {
  /**
   * Creates an instance fof the DownloadFileErrorMutator with set error.
   *
   * @param {FileItem} fileItem - The item that failed to download.
   * @param {AuthorizationError|NotFoundError|GeneralServerError|Error} error - The error that occurred during the
   * download file process.
   */
  constructor(fileItem, error) {
    super();

    this._fileItem = fileItem;
    this._error = error;
  }

  /** @inheritdoc */
  apply(state) {
    state.downloadFileError = {
      fileItem: this._fileItem,
      error: this._error,
    };
  }
}
