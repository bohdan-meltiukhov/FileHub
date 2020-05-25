import Router from '../';

/**
 * The builder for creating different instances of the Router class.
 */
export default class RouterBuilder {
  /**
   * Ses the root element for the router.
   *
   * @param {Element} rootElement - The parent element for the router.
   * @returns {RouterBuilder} The current RouterBuilder.
   */
  withRootElement(rootElement) {
    this._rootElement = rootElement;
    return this;
  }

  /**
   * Sets the page mapping for the router.
   *
   * @param {object.<string, Function>} pageMapping - The object that defines all the possible routes.
   * @returns {RouterBuilder} The current RouterBuilder.
   */
  withPageMapping(pageMapping) {
    this._pageMapping = pageMapping;
    return this;
  }

  /**
   * Sets the default location for the current router.
   *
   * @param {string} defaultLocation - The location that should be opened in case the current location hash is empty.
   * @returns {RouterBuilder} The current RouterBuilder.
   */
  withDefaultLocation(defaultLocation) {
    this._defaultLocation = defaultLocation;
    return this;
  }

  /**
   * Sets the 404 page for the router.
   *
   * @param {Function} notFoundPage - The page that should be displayed in case the route is incorrect.
   * @returns {RouterBuilder} The current RouterBuilder.
   */
  withNotFoundPage(notFoundPage) {
    this._notFoundPage = notFoundPage;
    return this;
  }

  /**
   * Sets the window for the current router.
   *
   * @param {object} window - The window containing a DOM document.
   * @returns {RouterBuilder} The current RouterBuilder.
   */
  withWindow(window) {
    this._window = window;
    return this;
  }

  /**
   * Sets the hashChangedHandler for the router.
   *
   * @param {Function} hashChangedHandler - The handler that should be called when the location hash changes.
   * @returns {RouterBuilder} The current RouterBuilder.
   */
  withHashChangedHandler(hashChangedHandler) {
    this._hashChangedHandler = hashChangedHandler;
    return this;
  }

  /**
   * Provides an instance of the router with set properties.
   *
   * @returns {Router} The created router.
   */
  build() {
    return new Router({
      rootElement: this._rootElement,
      pageMapping: this._pageMapping,
      defaultLocation: this._defaultLocation,
      notFoundPage: this._notFoundPage,
      window: this._window,
      hashChangedHandler: this._hashChangedHandler,
    });
  }
}
