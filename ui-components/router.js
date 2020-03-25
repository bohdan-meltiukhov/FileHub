export default class Router {

  _hashChangeHandlers = [];

  constructor(rootElement, pageMapping, defaultLocation) {
    this._rootElement = rootElement;
    this._pageMapping = pageMapping;
    this._defaultLocation = defaultLocation;
    this.init();
  }

  init() {
    if (window.location.hash === '') {
      window.location.hash = `#${this._defaultLocation}`;
    }

    const initialHash = window.location.hash.slice(1);
    this.loadPage(initialHash);

    window.addEventListener('hashchange', () => {
      const hash = window.location.hash.slice(1);
      this._hashChangeHandlers.forEach((handler) => handler(hash));
      this.loadPage(hash);
    });
  }

  addHashChangeHandler(handler) {
    this._hashChangeHandlers.push(handler);
  }

  loadPage(hash) {
    const Page = this._pageMapping[hash];
    this._rootElement.innerHTML = '';
    new Page(this._rootElement);
  }

  // set defaultLocation(location) {
  //   this._defaultLocation = location;
  //
  //   if (window.location.hash === '') {
  //     window.location.hash = `#${location}`;
  //   }
  // }
}
