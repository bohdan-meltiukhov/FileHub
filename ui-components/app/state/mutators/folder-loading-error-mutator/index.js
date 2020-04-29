import Mutator from '../mutator';

/**
 * The constructor that sets the folder loading error.
 */
export default class FolderLoadingErrorMutator extends Mutator {
  /**
   * Creates an instance of the FolderLoadingErrorMutator with set error message.
   *
   * @param {string} message - The message that describes the error.
   */
  constructor(message) {
    super();

    this._message = message;
  }

  /** @inheritdoc */
  apply(state) {
    state.folderLoadingError = this._message;
  }
}
