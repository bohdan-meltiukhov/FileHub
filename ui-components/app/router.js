/**
 * The class that allows switching between different pages.
 */
export default class Router {
  /**
   * The class for providing the router properties via the constructor.
   *
   * @typedef RouterProperties
   * @property {Element} rootElement - The parent element for the router.
   * @property {object} stateManager - The state manager to use.
   * @property {object.<string, object>} pageMapping - The object that defines all the possible routes.
   * @property {string} defaultLocation - The location that should be opened in case the current location hash is empty.
   * @property {object} notFoundPage - The page that should be displayed in case the route is incorrect.
   * @property {object} window - The window containing a DOM document.
   */

  /**
   * Creates an instance of the router with set properties.
   *
   * @param {RouterProperties} properties - The properties for the current router.
   */
  constructor(properties) {
    this._rootElement = properties.rootElement;
    this._stateManager = properties.stateManager;
    this._pageMapping = properties.pageMapping;
    this._defaultLocation = properties.defaultLocation;
    this._notFoundPage = properties.notFoundPage;
    this._window = properties.window;
    this.init();
  }

  /**
   * Checks the location hash and loads the required page.
   */
  init() {
    this._loadPage();

    this._window.addEventListener('hashchange', () => {
      this._loadPage();
    });
  }

  /**
   * Checks the current location hash and provides it to the {@link _renderPage} method.
   *
   * <p>Redirects to the default page in case the location hash is empty.
   *
   * @private
   */
  _loadPage() {
    const hash = this._window.location.hash;
    if (hash === '' || hash === '#' || hash === '#/') {
      this._window.location.hash = `#${this._defaultLocation}`;
      return;
    }

    this._renderPage(hash.slice(1));
  }

  /**
   * Loads the page depending on the provided hash.
   *
   * @param {string} hash - The hash of the required page.
   * @private
   */
  _renderPage(hash) {
    this._rootElement.innerHTML = '';

    if (Object.keys(this._pageMapping).includes(hash)) {
      const Page = this._pageMapping[hash];
      new Page(this._rootElement, this._stateManager);
    } else {
      new this._notFoundPage(this._rootElement);
    }
  }
}
