import Mutator from '../mutator/index.js';

/**
 * The mutator that sets whether the current folder is being loaded or not.
 */
export default class IsFolderLoadingMutator extends Mutator {
  /**
   * Creates an instance of the IsFolderLoadingMutator with set isLoading flag.
   *
   * @param {boolean} isLoading - The flag that shows whether the current folder is being loaded or not.
   */
  constructor(isLoading) {
    super();

    this._isLoading = isLoading;
  }

  /** @inheritdoc */
  apply(state) {
    state.isFolderLoading = this._isLoading;
  }
}
