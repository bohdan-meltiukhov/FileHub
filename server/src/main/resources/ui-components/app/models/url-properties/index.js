/**
 * The class for URL Properties.
 */
export default class UrlProperties {
  folderId;

  /**
   * Creates an instance of the UrlProperties with set folder ID.
   *
   * @param {string} folderId - The identifier of the current folder.
   */
  constructor(folderId) {
    this.folderId = folderId;
  }
}
