export default class Component {
    constructor(container) {
        this.init(container);
    }

    init(container) {
        this._container = container;
    }

    render() {
        const fakeElement = document.createElement('div');
        fakeElement.innerHTML = this.markup();

        this.rootElement = fakeElement.firstElementChild;
        this._container.appendChild(this.rootElement);

        this.initNestedComponents();
        this.addEventListeners();
    }

    markup() {}

    initNestedComponents() {}

    addEventListeners() {}
}
