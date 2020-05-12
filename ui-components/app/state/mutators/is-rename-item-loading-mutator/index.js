import Mutator from '../mutator';

/**
 * The mutator that sets the isRenameItemLoading flag.
 */
export default class IsRenameItemLoadingMutator extends Mutator {
  /**
   * Creates an instance of the IsRenameItemLoadingMutator with set isLoading flag.
   *
   * @param {boolean} isLoading - The flag that shows whether the rename item is loading or not.
   */
  constructor(isLoading) {
    super();

    this._isLoading = isLoading;
  }

  /** @inheritdoc */
  apply(state) {
    state.isRenameItemLoading = this._isLoading;
  }
}
