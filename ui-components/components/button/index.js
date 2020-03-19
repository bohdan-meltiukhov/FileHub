import Component from "../component.js";

export default class Button extends Component {

    _buttonText = 'Submit';

    markup() {
        return `
            <button class="button">${this._buttonText}</button>
        `;
    }

    set buttonText(value) {
        this._buttonText = value;
    }
}