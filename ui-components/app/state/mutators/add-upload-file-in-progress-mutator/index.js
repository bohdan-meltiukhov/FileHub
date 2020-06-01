import Mutator from '../mutator';

/**
 * The mutator that adds the provided folder to the foldersWithFileUploadInProgress state field.
 */
export default class AddUploadFileInProgressMutator extends Mutator {
  /**
   * Creates an instance of the AddUploadFileInProgressMutator wih set folderId.
   *
   * @param {string} folderId - The identifier of the folder that has an uploading file.
   */
  constructor(folderId) {
    super();

    this._folderId = folderId;
  }

  /** @inheritdoc */
  apply(state) {
    let loadingItems = state.foldersWithFileUploadInProgress || new Set();

    if (!loadingItems.has(this._folderId)) {
      loadingItems = new Set([...loadingItems, this._folderId]);

      state.foldersWithFileUploadInProgress = loadingItems;
    }
  }
}
