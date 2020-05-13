/**
 * The class that allows switching between different pages.
 */
export default class Router {
  /**
   * The class for providing the router properties via the constructor.
   *
   * @typedef RouterProperties
   * @property {Element} rootElement - The parent element for the router.
   * @property {object.<string, Function>} pageMapping - The object that defines all the possible routes.
   * @property {string} defaultLocation - The location that should be opened in case the current location hash is empty.
   * @property {Function} notFoundPage - The page that should be displayed in case the route is incorrect.
   * @property {Function} hashChangedHandler - The handler that should be called when the location hash changes.
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
    this._notFoundPage = properties.notFoundPage;
    this._window = properties.window;
    this._hashChangedHandler = properties.hashChangedHandler;
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
   * Adds a function that should be called when the location hash changes.
   *
   * @param {Function} handler - The function that will be called when the location hash changes.
   */
  onHashChanged(handler) {
    this._hashChangedHandlers.push(handler);
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
    const urlTemplate = this._findUrlTemplate(hash);

    if (!urlTemplate) {
      this._rootElement.innerHTML = '';
      this._notFoundPage();
      return;
    }

    const pageCreator = this._pageMapping[urlTemplate];

    const staticPart = this._getStaticPart(urlTemplate);

    const dynamicPartMap = this._getDynamicPart(urlTemplate, hash);

    this._hashChangedHandler(staticPart, dynamicPartMap);

    if (staticPart !== this._previousStaticPart) {
      this._rootElement.innerHTML = '';
      pageCreator(dynamicPartMap);
    }

    this._previousStaticPart = staticPart;
  }

  /**
   * Finds the corresponding URL Template in the pageMapping object.
   *
   * @param {string} hash - The current location hash.
   * @returns {string} The corresponding urlTemplate.
   * @private
   */
  _findUrlTemplate(hash) {
    return Object.keys(this._pageMapping).find((urlTemplate) => {
      const staticPart = this._getStaticPart(urlTemplate);
      if (hash.startsWith(staticPart)) {
        return true;
      }
    });
  }

  /**
   * Provides the static part of the URL Template.
   *
   * @param {string} urlTemplate - The URL Template that matches the current location hash.
   * @returns {string} The static part of the URL Template.
   * @private
   */
  _getStaticPart(urlTemplate) {
    return urlTemplate.split(':')[0];
  }

  /**
   * Generates a map of keys from the URL template and values from the provided URL.
   *
   * @param {string} urlTemplate - The template from the page mapping.
   * @param {string} url - The current URL.
   * @returns {object.<string, string>} The object with keys from the URL template and values from the current URL.
   * @private
   */
  _getDynamicPart(urlTemplate, url) {
    const templateParts = urlTemplate.split('/');

    const keyToIndexMap = templateParts.reduce((accumulator, value, index) => {
      if (!value.startsWith(':')) {
        return accumulator;
      }
      const key = value.slice(1);
      accumulator[key] = index;
      return accumulator;
    }, {});

    const urlParts = url.split('/');

    return Object.entries(keyToIndexMap).reduce((accumulator, [key, index]) => {
      accumulator[key] = urlParts[index];
      return accumulator;
    }, {});
  }
}
