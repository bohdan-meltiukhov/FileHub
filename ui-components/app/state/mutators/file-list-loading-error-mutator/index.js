import Mutator from '../mutator';

/**
 * The mutator that saves the error message.
 */
export default class FileListLoadingErrorMutator extends Mutator {
  /**
   * Creates an instance of the FileListLoadingErrorMutator with set error message.
   *
   * @param {Error} error - The error that occurred.
   */
  constructor(error) {
    super();
    this._error = error;
  }

  /** @inheritdoc */
  apply(state) {
    state.fileListLoadingError = this._error;
  }
}
