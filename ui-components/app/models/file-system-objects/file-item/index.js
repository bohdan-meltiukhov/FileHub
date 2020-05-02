/**
 * The model for describing a file.
 */
export default class FileItem {
  id;
  parentId;
  name;
  mimeType;
  size;
  type;

  /**
   * The object for describing the file configurations.
   *
   * @typedef {object} FileItemProperties
   * @property {string} id - The identifier of the file.
   * @property {string} parentId - The id of the parent folder.
   * @property {string} name - The name of the file.
   * @property {('image'|'book'|'video'|'audio'|'stylesheet'|'other')} mimeType - The type of the file.
   * @property {number} size - The size of the file in bytes.
   * @property {'file'} type - Shows that this item is a file.
   */

  /**
   * Creates an instance of the FileItem with set properties.
   *
   * @param {FileItemProperties} properties - The properties of the current file item.
   */
  constructor(properties) {
    Object.assign(this, properties);
  }
}
