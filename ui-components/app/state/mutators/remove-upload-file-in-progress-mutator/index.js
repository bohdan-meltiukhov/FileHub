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
    const loadingItems = state.foldersWithFileUploadInProgress || [];

    const index = loadingItems.findIndex((folderId) => folderId === this._folderId);

    if (index !== -1) {
      loadingItems.splice(index, 1);

      state.foldersWithFileUploadInProgress = loadingItems;
    }
  }
}
