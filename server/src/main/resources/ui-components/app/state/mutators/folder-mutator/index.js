import Mutator from '../mutator/index.js';
import FolderItem from '../../../models/file-system-objects/folder-item/index.js';

/**
 * The mutator that sets the folder data.
 */
export default class FolderMutator extends Mutator {
  /**
   * Creates an instance of the folder mutator with set folder.
   *
   * @param {FolderItem} folder - The current folder.
   */
  constructor(folder) {
    super();

    this._folder = folder;
  }

  /** @inheritdoc */
  apply(state) {
    state.folder = this._folder;
  }
}
