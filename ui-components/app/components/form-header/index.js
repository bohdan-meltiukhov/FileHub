import Component from "../component.js";

export default class FormHeader extends Component {

    constructor(container, {text = 'Header'} = {}) {
        super(container);

        this._text = text;
        this.render();
    }

    markup() {
        return `
            <header class="header">
                <h1>${this._text}</h1>
                <span class="glyphicon glyphicon-user"></span>
            </header>
        `;
    }

    set text(value) {
        this._text = value;
        this.rootElement.querySelector('h1').innerText = value;
    }
}
