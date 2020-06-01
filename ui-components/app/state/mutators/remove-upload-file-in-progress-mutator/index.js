import Mutator from '../mutator';

/**
 * The mutator that removes the provided folder from the foldersWithFileUploadInProgress state field.
 */
export default class RemoveUploadFileInProgressMutator extends Mutator {
  /**
   * Creates an instance of the RemoveUploadFileInProgressMutator wih set folderId.
   *
   * @param {string} folderId - The identifier of the folder that should stop loading.
   */
  constructor(folderId) {
    super();

    this._folderId = folderId;
  }

  /** @inheritdoc */
  apply(state) {
    let loadingItems = state.foldersWithFileUploadInProgress || new Set();

    if (loadingItems.has(this._folderId)) {
      loadingItems = new Set([...loadingItems].filter((fileId) => fileId !== this._folderId));

      state.foldersWithFileUploadInProgress = loadingItems;
    }
  }
}
