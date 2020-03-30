import Component from "../component.js";

export default class FormInput extends Component {

    constructor(container, {labelText = 'Label', placeholder = 'Placeholder', type = 'text'} = {}) {
        super(container);

        this._labelText = labelText;
        this._placeholder = placeholder;
        this._type = type;

        this.render();
    }

    markup() {
        return `
            <div class="row">
                <label for="input-username" class="input-label">${this._labelText}</label>
    
                <div class="input-block">
                    <input type="${this._type}" name="username" class="input" placeholder="${this._placeholder}">
                    <span class="error-message"></span>
                </div>
            </div>
        `;
    }

    get inputValue() {
        return this.rootElement.querySelector('.input').value;
    }

    set labelText(value) {
        this.rootElement.querySelector('.input-label').innerText = value;
    }

    set placeholder(value) {
        this.rootElement.querySelector('.input').placeholder = value;
    }

    set type(value) {
        this.rootElement.querySelector('.input').type = value;
    }

    set helpText(value) {
        this.rootElement.querySelector('.error-message').innerText = value;
    }
}
