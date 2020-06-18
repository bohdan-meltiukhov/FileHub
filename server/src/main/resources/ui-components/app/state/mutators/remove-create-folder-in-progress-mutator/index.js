import Mutator from '../mutator/index.js';

/**
 * The mutator that removes a folder from the foldersWithCreateFolderInProgress state field.
 */
export default class RemoveCreateFolderInProgressMutator extends Mutator {
  /**
   * Creates an instance of the RemoveCreateFolderInProgressMutator with set folder ID.
   *
   * @param {string} folderId - The identifier of the folder that doesn't have folder creation in progress.
   */
  constructor(folderId) {
    super();

    this._folderId = folderId;
  }

  /** @inheritdoc */
  apply(state) {
    let itemsInProgress = state.foldersWithCreateFolderInProgress || new Set();

    if (itemsInProgress.has(this._folderId)) {
      itemsInProgress = new Set([...itemsInProgress].filter((fileId) => fileId !== this._folderId));

      state.foldersWithCreateFolderInProgress = itemsInProgress;
    }
  }
}
