export default class Component {
    constructor(container) {
        this.init(container);
    }

    init(container) {
        this.rootContainer = document.createElement('span');
        container.append(this.rootContainer);
    }

    render() {
        this.rootContainer.innerHTML = this.markup();
        this.initNestedComponents();
        this.addEventListeners();
    }

    markup() {}

    initNestedComponents() {}

    addEventListeners() {}
}