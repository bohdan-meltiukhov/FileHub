import Mutator from '../mutator/index.js';

/**
 * The mutator that adds an item to the itemsWithRenameInProgress state field.
 */
export default class AddRenameItemInProgressMutator extends Mutator {
  /**
   * Creates an instance of the AddRenameItemInProgressMutator with set item ID.
   *
   * @param {string} itemId - The identifier of the item that has rename in progress.
   */
  constructor(itemId) {
    super();

    this._itemId = itemId;
  }

  /** @inheritdoc */
  apply(state) {
    let itemsInProgress = state.itemsWithRenameInProgress || new Set();

    if (!itemsInProgress.has(this._itemId)) {
      itemsInProgress = new Set([...itemsInProgress, this._itemId]);

      state.itemsWithRenameInProgress = itemsInProgress;
    }
  }
}
