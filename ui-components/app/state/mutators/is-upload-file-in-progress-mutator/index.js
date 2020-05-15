import Mutator from '../mutator';

/**
 * The mutator that sets the folder that has an uploading file.
 */
export default class IsUploadFileInProgressMutator extends Mutator {
  /**
   * Creates an instance of the IsUploadFileInProgressMutator with set folderId and the isLoading flag.
   *
   * @param {string} folderId - The identifier of the loading folder.
   * @param {boolean} isLoading - The flag that shows whether the specified folder is uploading a file.
   */
  constructor(folderId, isLoading) {
    super();

    this._folderId = folderId;
    this._isLoading = isLoading;
  }

  /** @inheritdoc */
  apply(state) {
    const loadingItems = state.foldersWithFileUploadInProgress || [];

    if (this._isLoading) {
      loadingItems.push(this._folderId);
    } else {
      const index = loadingItems.findIndex((folderId) => folderId === this._folderId);

      if (index !== -1) {
        loadingItems.splice(index, 1);
      }
    }

    state.foldersWithFileUploadInProgress = loadingItems;
  }
}
