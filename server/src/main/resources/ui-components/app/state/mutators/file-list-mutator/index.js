import Mutator from '../mutator/index.js';
import FileItem from '../../../models/file-system-objects/file-item/index.js';
import FolderItem from '../../../models/file-system-objects/folder-item/index.js';

/**
 * The mutator that saves the file list.
 */
export default class FileListMutator extends Mutator {
  /**
   * Creates an instance of the file list mutator with set file list.
   *
   * @param {Array<FileItem|FolderItem>} fileList - The list of the files.
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
