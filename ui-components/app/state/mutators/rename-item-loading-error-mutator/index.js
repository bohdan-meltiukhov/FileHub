import Mutator from '../mutator';

/**
 * The mutator that sets the rename item loading error to the state.
 */
export default class RenameItemLoadingErrorMutator extends Mutator {
  /**
   * Creates an instance of the RenameItemLoadingError with set error.
   *
   * @param {Error} error - The error that occurred.
   */
  constructor(error) {
    super();

    this._error = error;
  }

  /** @inheritdoc */
  apply(state) {
    state.renameItemLoadingError = this._error;
  }
}
