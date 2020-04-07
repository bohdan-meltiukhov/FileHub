import Mutator from '../mutator';

/**
 * The mutator that saves the error message.
 */
export default class FileListLoadingErrorMutator extends Mutator {
  /**
   * Creates an instance of the FileListLoadingErrorMutator with set error message.
   *
   * @param {string} message - The message that describes the error.
   */
  constructor(message) {
    super();
    this._message = message;
  }

  /** @inheritdoc */
  apply(state) {
    state.fileListLoadingError = this._message;
  }
}
