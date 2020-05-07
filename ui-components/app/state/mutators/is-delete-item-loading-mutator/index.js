import Mutator from '../mutator';

/**
 * The mutator that set whether the delete item process is loading or not.
 */
export default class IsDeleteItemLoadingMutator extends Mutator {
  /**
   * Creates a instance of the IsDeleteItemLoadingMutator with set isLoading flag.
   *
   * @param {boolean} isLoading - The flag that shows whether the delete item process is loading or not.
   */
  constructor(isLoading) {
    super();

    this._isLoading = isLoading;
  }

  /** @inheritdoc */
  apply(state) {
    state.isDeleteItemLoading = this._isLoading;
  }
}
