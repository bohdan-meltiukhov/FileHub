export default class Router {

    _hashChangeHandlers = [];

    constructor(rootElement, pageMapping) {
        this._rootElement = rootElement;
        this._pageMapping = pageMapping;
        this.init();
    }

    init() {
        window.addEventListener('hashchange', () => {
            const hash = window.location.hash.slice(1);
            this._hashChangeHandlers.forEach(handler => handler(hash));
            this.loadPage(hash);
        })
    }

    addHashChangeHandler(handler) {
        this._hashChangeHandlers.push(handler);
    }

    loadPage(hash) {
        const Page = this._pageMapping[hash];
        this._rootElement.innerHTML = '';
        new Page(this._rootElement);
    }

    set defaultLocation(location) {
        this._defaultLocation = location;

        if(window.location.hash === '') {
            window.location.hash = `#${location}`;
        }
    }
}
