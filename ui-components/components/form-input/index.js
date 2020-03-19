import Component from "../component.js";

export default class FormInput extends Component {

    /** Default values for the label, the placeholder and the help text. */
    _labelText = 'Label';
    _placeholder = 'Placeholder';
    _type = 'text';
    _helpText = 'Help text';
    _helpTextDisplayed = false;

    markup() {
        return `
            <div class="row">
                <label for="input-username" class="input-label">${this._labelText}</label>
    
                <div class="input-block">
                    <input type="${this._type}" name="username" class="input" placeholder="${this._placeholder}">
                    <span class="error-message">${this._helpTextDisplayed ? this._helpText : ''}</span>
                </div>
            </div>
        `;
    }

    checkLogin() {
        const login = this.rootContainer.querySelector('.input').value;
        return login !== '';
    }

    displayHelpText() {
        this._helpTextDisplayed = true;
    }

    hideHelpText() {
        this._helpTextDisplayed = false;
    }

    set labelText(value) {
        this._labelText = value;
    }

    set placeholder(value) {
        this._placeholder = value;
    }

    set type(value) {
        this._type = value;
    }

    set helpText(value) {
        this._helpText = value;
    }
}