import Mutator from '../mutator/index.js';

/**
 * The mutator that adds a folder to the foldersWithCreateFolderInProgress state field.
 */
export default class AddCreateFolderInProgressMutator extends Mutator {
  /**
   * Creates an instance of the AddCreateFolderInProgressMutator with set folder ID.
   *
   * @param {string} folderId - The identifier of the folder that has folder creation in progress.
   */
  constructor(folderId) {
    super();

    this._folderId = folderId;
  }

  /** @inheritdoc */
  apply(state) {
    let itemsInProgress = state.foldersWithCreateFolderInProgress || new Set();

    if (!itemsInProgress.has(this._folderId)) {
      itemsInProgress = new Set([...itemsInProgress, this._folderId]);

      state.foldersWithCreateFolderInProgress = itemsInProgress;
    }
  }
}
