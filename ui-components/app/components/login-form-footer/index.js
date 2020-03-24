import Component from "../component.js";
import Button from "../button";

export default class FormFooter extends Component {
    constructor(container, {
        buttonText = 'Submit',
        linkText = 'Take me to another page',
        linkDirection = '#'
    } = {}) {

        super(container);

        this._buttonText = buttonText;
        this._linkText = linkText;
        this._linkDirection = linkDirection;

        this.render();
    }


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
        const buttonContainer = this.rootElement.querySelector('.submit-button');
        this.button = new Button(buttonContainer, {
            buttonText: this._buttonText
        });
    }

    addButtonClickHandler(handler) {
        this.button.addClickHandler(handler);
    }

    set buttonText(value) {
        this._buttonText = value;
        this.button.buttonText = value;
    }

    set linkText(value) {
        this._linkText = value;
        this.rootElement.querySelector('.form-link').innerText = value;
    }

    set linkDirection(value) {
        this._linkDirection = value;
        this.rootElement.querySelector('.form-link').href = value;
    }
}
