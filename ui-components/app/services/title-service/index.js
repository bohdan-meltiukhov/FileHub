/**
 * The class for changing the page title.
 */
export default class TitleService {
  /**
   * Creates an instance of the title service with set document.
   *
   * <p>The service doesn't use the actual document for test purposes.
   *
   * @param {Node} document - The document for the service.
   */
  constructor(document) {
    this._document = document;
  }

  /**
   * Changes the page title to the provided one.
   *
   * @param {string} title - The new title.
   */
  setTitle(title) {
    this._document.title = `${title} - File Hub`;
  }
}
