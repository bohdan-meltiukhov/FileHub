import Mutator from '../mutator';

/**
 * The mutator that set whether the delete item process is loading or not.
 */
export default class IsDeleteItemLoadingMutator extends Mutator {
  /**
   * Creates a instance of the IsDeleteItemLoadingMutator with set isLoading flag.
   *
   * @param {string} itemId - The identifier of the item that is loading.
   * @param {boolean} isLoading - The flag that shows whether the delete item process is loading or not.
   */
  constructor(itemId, isLoading) {
    super();

    this._itemId = itemId;
    this._isLoading = isLoading;
  }

  /** @inheritdoc */
  apply(state) {
    state.deleteItemId = this._itemId;
    state.isDeleteItemLoading = this._isLoading;
  }
}
