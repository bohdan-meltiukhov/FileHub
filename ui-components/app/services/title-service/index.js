/**
 * The class for changing the page title.
 */
export default class TitleService {
  /**
   * Changes the page title to the provided one.
   *
   * @param {string} title - The new title.
   */
  setTitle(title) {
    document.title = `${title} - File Hub`;
  }
}
