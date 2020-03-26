import Component from '../component.js';
import Button from '../button';

/**
 * A component for form footers.
 */
export default class FormFooter extends Component {
  /**
   * The object for providing the initial form footer configurations via the constructor.
   *
   * @typedef {object} Parameters
   * @property {string} buttonText - The text to be displayed inside the submit button.
   * @property {string} linkText - The text of the form link.
   * @property {string} linkDirection - The href value of the form link.
   */

  /**
   * Creates an instance of the form footer with set container and properties.
   *
   * @param {Element} container - The parent element for the form footer component.
   * @param {Parameters} parameters - The initial form footer configurations.
   */
  constructor(container, {
    buttonText = 'Submit',
    linkText = 'Take me to another page',
    linkDirection = '#',
  } = {}) {
    super(container);

    this._buttonText = buttonText;
    this._linkText = linkText;
    this._linkDirection = linkDirection;

    this.render();
  }

  /**
   * @inheritdoc
   */
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

  /**
   * @inheritdoc
   */
  initNestedComponents() {
    const buttonContainer = this.rootElement.querySelector('.submit-button');
    this.button = new Button(buttonContainer, {
      buttonText: this._buttonText,
    });
  }

  /**
   * Provides a new button click handler to the button.
   *
   * @param {Function} handler - The function to be called when the form button is pressed.
   */
  addButtonClickHandler(handler) {
    this.button.addClickHandler(handler);
  }

  /**
   * Assign the provided button text to the private field and changes the text of the button.
   *
   * @param {string} value - The new button text.
   */
  set buttonText(value) {
    this._buttonText = value;
    this.button.buttonText = value;
  }

  /**
   * Assigns the provided link text to the private field and changes the inner text of the form link.
   *
   * @param {string} value - The new link text.
   */
  set linkText(value) {
    this._linkText = value;
    this.rootElement.querySelector('.form-link').innerText = value;
  }

  /**
   * Assigns the provided link direction to the private field and changes the href property of the link.
   *
   * @param {string} value - The new link link direction.
   */
  set linkDirection(value) {
    this._linkDirection = value;
    this.rootElement.querySelector('.form-link').href = value;
  }
}
