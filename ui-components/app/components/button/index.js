import Component from "../component.js";

export default class Button extends Component {

    _clickHandlers = [];

    constructor(container, {buttonText = 'Submit'} = {}) {
        super(container);

        this._buttonText = buttonText;
        this.render();
    }

    markup() {
        return `
            <button class="button">${this._buttonText}</button>
        `;
    }

    addClickHandler(handler) {
        this._clickHandlers.push(handler);
    }

    addEventListeners() {
        this.rootElement.addEventListener('click', () => {
            this._clickHandlers.forEach((handler) => handler());
        });
    }

    set buttonText(value) {
        this._buttonText = value;
        this.rootElement.innerText = value;
    }
}
