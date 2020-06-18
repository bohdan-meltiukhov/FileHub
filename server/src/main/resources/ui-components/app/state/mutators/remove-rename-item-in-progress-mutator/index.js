import Mutator from '../mutator/index.js';

/**
 * The mutator that removes an item from the itemsWithRenameInProgress state field.
 */
export default class RemoveRenameItemInProgressMutator extends Mutator {
  /**
   * Creates an instance of the RemoveRenameItemInProgressMutator with set item ID.
   *
   * @param {string} itemId - The identifier of the item that doesn't have rename in progress anymore.
   */
  constructor(itemId) {
    super();

    this._itemId = itemId;
  }

  /** @inheritdoc */
  apply(state) {
    let itemsInProgress = state.itemsWithRenameInProgress || new Set();

    if (itemsInProgress.has(this._itemId)) {
      itemsInProgress = new Set([...itemsInProgress].filter((fileId) => fileId !== this._itemId));

      state.itemsWithRenameInProgress = itemsInProgress;
    }
  }
}
