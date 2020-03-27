/**
 * The class that allows switching between different pages.
 */
export default class Router {
  /**
   * The class for providing the router properties via the constructor.
   *
   * @typedef RouterProperties
   * @property {Element} rootElement - The parent element for the router.
   * @property {object} pageMapping - The object that defines all the possible routes.
   * @property {string} defaultLocation - The location that should be opened in case the current location hash is empty.
   * @property {object} window - The window containing a DOM document.
   */

  /**
   * Creates an instance of the router with set properties.
   *
   * @param {RouterProperties} properties - The properties for the current router.
   */
  constructor(properties) {
    this._rootElement = properties.rootElement;
    this._pageMapping = properties.pageMapping;
    this._defaultLocation = properties.defaultLocation;
    this._window = properties.window;
    this.init();
  }

  /**
   * Checks the location hash and loads the required page.
   */
  init() {
    if (this._window.location.hash === '') {
      this._window.location.hash = `#${this._defaultLocation}`;
    }

    const initialHash = this._window.location.hash.slice(1);
    this.loadPage(initialHash);

    this._window.addEventListener('hashchange', () => {
      if (this._window.location.hash === '') {
        this._window.location.hash = `#${this._defaultLocation}`;
        return;
      }

      const hash = this._window.location.hash.slice(1);
      this.loadPage(hash);
    });
  }

  /**
   * Loads the page depending on the provided hash.
   *
   * @param {string} hash - The hash of the required page.
   */
  loadPage(hash) {
    const Page = this._pageMapping[hash];
    this._rootElement.innerHTML = '';
    new Page(this._rootElement);
  }
}
