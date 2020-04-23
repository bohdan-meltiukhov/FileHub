import Mutator from '../mutator';

/**
 * The mutator that sets the folder data.
 */
export default class FolderMutator extends Mutator {
  /**
   * The object for describing the folder configurations.
   *
   * @typedef {object} FolderItemProperties
   * @property {string} id - The identifier of the folder.
   * @property {string} parentId - The id of the parent folder.
   * @property {string} name - The name of the folder.
   * @property {number} itemsNumber - The number of items inside.
   * @property {'folder'} type - Shows that this item is a folder.
   */

  /**
   * Creates an instance of the folder mutator with set folder.
   *
   * @param {FolderItemProperties} folder - The current folder.
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
