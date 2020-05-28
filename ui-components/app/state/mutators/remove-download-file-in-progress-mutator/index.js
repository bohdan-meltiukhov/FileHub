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
    let itemsInProgress = state.filesWithDownloadInProgress || new Set();

    if (itemsInProgress.has(this._fileId)) {
      itemsInProgress = new Set([...itemsInProgress].filter((fileId) => fileId !== this._fileId));

      state.filesWithDownloadInProgress = itemsInProgress;
    }
  }
}
