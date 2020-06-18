/**
 * The model for describing a folder.
 */
export default class FolderItem {
  id;
  parentId;
  name;
  itemsNumber;
  type;

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
   * Creates an instance of the folder item with set properties.
   *
   * @param {FolderItemProperties} properties - The properties of the current folder item.
   */
  constructor(properties) {
    Object.assign(this, properties);
  }
}
