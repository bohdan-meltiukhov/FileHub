import Mutator from '../mutator';

/**
 * The mutator that sets whether the create folder process is loading or not.
 */
export default class IsCreateFolderInProgressMutator extends Mutator {
  /**
   * Creates an instance of the IsCreateFolderInProgressMutator with set isLoading flag.
   *
   * @param {boolean} isInProgress - The flag that shows whether the create folder process is in progress or not.
   */
  constructor(isInProgress) {
    super();

    this._isInProgress = isInProgress;
  }

  /** @inheritdoc */
  apply(state) {
    state.isCreateFolderInProgress = this._isInProgress;
  }
}
