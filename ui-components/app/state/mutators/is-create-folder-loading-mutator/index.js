import Mutator from '../mutator';

/**
 * The mutator that sets whether the create folder process is loading or not.
 */
export default class IsCreateFolderLoadingMutator extends Mutator {
  /**
   * Creates an instance of the IsCreateFolderLoadingMutator with set isLoading flag.
   *
   * @param {boolean} isLoading - The flag that shows whether the create folder process is loading or not.
   */
  constructor(isLoading) {
    super();

    this._isLoading = isLoading;
  }

  /** @inheritdoc */
  apply(state) {
    state.isCreateFolderLoading = this._isLoading;
  }
}
