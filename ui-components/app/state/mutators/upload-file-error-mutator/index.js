import Mutator from '../mutator';

/**
 * The mutator that sets the upload file error to the provided state.
 */
export default class UploadFileErrorMutator extends Mutator {
  /**
   * Creates an instance of the UploadFileErrorMutator with set error.
   *
   * @param {Error} error - The error that occurred during the file upload process.
   */
  constructor(error) {
    super();

    this._error = error;
  }

  /** @inheritdoc */
  apply(state) {
    state.uploadFileError = this._error;
  }
}
