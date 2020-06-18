import Mutator from '../mutator/index.js';

/**
 * The constructor that sets the folder loading error.
 */
export default class FolderLoadingErrorMutator extends Mutator {
  /**
   * Creates an instance of the FolderLoadingErrorMutator with set error message.
   *
   * @param {Error} error - The error that occurred.
   */
  constructor(error) {
    super();

    this._error = error;
  }

  /** @inheritdoc */
  apply(state) {
    state.folderLoadingError = this._error;
  }
}
