import Mutator from '../mutator/index.js';

/**
 * The mutator that sets if the user name is loading or not.
 */
export default class IsUserNameLoadingMutator extends Mutator {
  /**
   * Creates an instance of the IsUserNameLoadingMutator with set isLoading flag.
   *
   * @param {boolean} isLoading - The flag that shows whether the user name is loading or not.
   */
  constructor(isLoading) {
    super();

    this._isLoading = isLoading;
  }

  /** @inheritdoc */
  apply(state) {
    state.isUserNameLoading = this._isLoading;
  }
}
