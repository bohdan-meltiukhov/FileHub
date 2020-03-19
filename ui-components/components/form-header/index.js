import Component from "../component.js";

export default class FormHeader extends Component {

    _header = 'Header';

    markup() {
        return `
            <header class="header">
                <h1>${this._header}</h1>
                <span class="glyphicon glyphicon-user"></span>
            </header>
        `;
    }

    set header(value) {
        this._header = value;
    }
}