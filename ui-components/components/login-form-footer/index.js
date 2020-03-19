import Component from "../component.js";
import Button from "../button";

export default class FormFooter extends Component {

    _buttonText = 'Submit';
    _linkText = 'Take me to another page';
    _linkDirection = '#';

    markup() {
        return `
            <div class="row">
                <div class="form-footer">
                    <span class="submit-button"></span>
                    <a href="${this._linkDirection}" class="form-link">${this._linkText}</a>
                </div>
            </div>
        `;
    }


    initNestedComponents() {
        const buttonContainer = this.rootContainer.querySelector('.submit-button');
        this.button = new Button(buttonContainer);
        this.button.buttonText = this._buttonText;
        this.button.render();
    }

    set buttonText(value) {
        this._buttonText = value;
    }

    set linkText(value) {
        this._linkText = value;
    }

    set linkDirection(value) {
        this._linkDirection = value;
    }
}