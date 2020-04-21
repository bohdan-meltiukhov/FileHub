import Mutator from '../mutator';

/**
 * The mutator that sets the downloaded file.
 */
export default class DownloadedFileMutator extends Mutator {
  /**
   * Creates an instance of the download file mutator with set file.
   *
   * @param {Blob} file - The file to download.
   */
  constructor(file) {
    super();

    this._file = file;
  }

  /** @inheritdoc */
  apply(state) {
    state.downloadedFile = this._file;
  }
}
