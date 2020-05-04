import Mutator from '../mutator';

/**
 * The mutator that sets whether the file list is loading or not.
 */
export default class IsFileListLoadingMutator extends Mutator {
  /**
   * Creates an instance of the IsFileListLoadingMutator.
   *
   * @param {boolean} isLoading - Shows whether the file list is loading or not.
   */
  constructor(isLoading) {
    super();
    this._isLoading = isLoading;
  }

  /** @inheritdoc */
  apply(state) {
    state.isFileListLoading = this._isLoading;
  }
}
