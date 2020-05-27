import Mutator from '../mutator';

/**
 * The mutator that removed the provided file from the filesWithDownloadInProgress state field.
 */
export default class RemoveDownloadFileInProgressMutator extends Mutator {
  /**
   * Creates an instance of the RemoveDownloadFileInProgressMutator with set file ID.
   *
   * @param {string} fileId - The identifier of the file that doesn't have download in progress anymore.
   */
  constructor(fileId) {
    super();

    this._fileId = fileId;
  }

  /** @inheritdoc */
  apply(state) {
    const itemsInProgress = state.filesWithDownloadInProgress || [];

    const index = itemsInProgress.findIndex((fileId) => fileId === this._fileId);

    if (index !== -1) {
      itemsInProgress.splice(index, 1);

      state.filesWithDownloadInProgress = itemsInProgress;
    }
  }
}
