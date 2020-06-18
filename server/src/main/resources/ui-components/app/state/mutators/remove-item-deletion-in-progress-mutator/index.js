import Mutator from '../mutator/index.js';

/**
 * The mutator that removed the provided item from the itemsWithDeletionInProgress state field.
 */
export default class RemoveItemDeletionInProgressMutator extends Mutator {
  /**
   * Creates an instance of the RemoveItemDeletionInProgressMutator wih set itemId.
   *
   * @param {string} itemId - The identifier of the item that is not being deleted anymore.
   */
  constructor(itemId) {
    super();

    this._itemId = itemId;
  }

  /** @inheritdoc */
  apply(state) {
    let loadingItems = state.itemsWithDeletionInProgress || new Set();

    if (loadingItems.has(this._itemId)) {
      loadingItems = new Set([...loadingItems].filter((fileId) => fileId !== this._itemId));

      state.itemsWithDeletionInProgress = loadingItems;
    }
  }
}
