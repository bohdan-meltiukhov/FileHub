import Action from '../action';
import EditingItemMutator from '../../mutators/editing-item-mutator';

/**
 * The action that sets the editing item.
 */
export default class EditingItemAction extends Action {
  /**
   * Creates an instance of the EditingItemAction with set itemId and isEditing flag.
   *
   * @param {string} itemId - The identifier of the item that is being edited.
   * @param {boolean} isEditing - The flag that shows whether the provided item is being edited.
   */
  constructor(itemId, isEditing) {
    super();

    this._itemId = itemId;
    this._isEditing = isEditing;
  }

  /** @inheritdoc */
  apply(stateManager, apiService) {
    if (this._isEditing) {
      stateManager.mutate(new EditingItemMutator(this._itemId));
    } else if (stateManager.state.editingItem === this._itemId) {
      stateManager.mutate(new EditingItemMutator(''));
    }
  }
}
