import Mutator from '../mutator';

/**
 * The mutator that adds the provided item to the itemsWithDeletionInProgress state field.
 */
export default class AddItemDeletionInProgressMutator extends Mutator {
  /**
   * Creates an instance of the AddItemDeletionInProgressMutator wih set itemId.
   *
   * @param {string} itemId - The identifier of the item that is being deleted.
   */
  constructor(itemId) {
    super();

    this._itemId = itemId;
  }

  /** @inheritdoc */
  apply(state) {
    let loadingItems = state.itemsWithDeletionInProgress || new Set();

    if (!loadingItems.has(this._itemId)) {
      loadingItems = new Set([...loadingItems, this._itemId]);

      state.itemsWithDeletionInProgress = loadingItems;
    }
  }
}
