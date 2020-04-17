import Mutator from '../mutator';

/**
 * The mutator that saves the file list.
 */
export default class FileListMutator extends Mutator {
  /**
   * Creates an instance of the file list mutator with set file list.
   *
   * @param {object[]} fileList - The list of the files.
   */
  constructor(fileList) {
    super();
    this._fileList = fileList;
  }

  /** @inheritdoc */
  apply(state) {
    state.fileList = this._fileList;
  }
}
