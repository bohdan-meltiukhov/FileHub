import Mutator from '../mutator';

/**
 * The mutator that sets the ID of the folder that should be renamed.
 */
export default class RenameFolderMutator extends Mutator {
  /**
   * Creates an instance of the RenameFolderMutator with set folder ID.
   *
   * @param {string} folderId - The identifier of the folder to rename.
   */
  constructor(folderId) {
    super();

    this._folderId = folderId;
  }

  /** @inheritdoc */
  apply(state) {
    state.renameFolderId = this._folderId;
  }
}
