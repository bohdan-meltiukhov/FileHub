import Mutator from '../mutator';

/**
 * The mutator that sets the editing item.
 */
export default class EditingItemMutator extends Mutator {
  /**
   * Creates an instance of the EditingItemMutator with set item id.
   *
   * @param {string} itemId - The identifier of the item that is being edited.
   */
  constructor(itemId) {
    super();

    this._itemId = itemId;
  }

  /** @inheritdoc */
  apply(state) {
    state.editingItem = this._itemId;
  }
}
