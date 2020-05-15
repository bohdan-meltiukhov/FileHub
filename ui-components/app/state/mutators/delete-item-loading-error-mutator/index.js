import Mutator from '../mutator';

/**
 * The mutator that sets the delete item loading error to the state.
 */
export default class DeleteItemLoadingErrorMutator extends Mutator {
  /**
   * Creates an instance of the DeleteItemLoadingErrorMutator with set error.
   *
   * @param {Error} error - The error that occurred.
   */
  constructor(error) {
    super();

    this._error = error;
  }

  /** @inheritdoc */
  apply(state) {
    state.deleteItemLoadingError = this._error;
  }
}
