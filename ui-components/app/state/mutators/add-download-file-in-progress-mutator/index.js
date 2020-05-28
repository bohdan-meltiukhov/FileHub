import Mutator from '../mutator';

/**
 * The mutator that adds the provided file to the filesWithDownloadInProgress state field.
 */
export default class AddDownloadFileInProgressMutator extends Mutator {
  /**
   * Creates an instance of the AddDownloadFileInProgressMutator with set file ID.
   *
   * @param {string} fileId - The identifier of the file that has download in progress.
   */
  constructor(fileId) {
    super();

    this._fileId = fileId;
  }

  /** @inheritdoc */
  apply(state) {
    let itemsInProgress = state.filesWithDownloadInProgress || new Set();

    if (!itemsInProgress.has(this._fileId)) {
      itemsInProgress = new Set([...itemsInProgress, this._fileId]);

      state.filesWithDownloadInProgress = itemsInProgress;
    }
  }
}
