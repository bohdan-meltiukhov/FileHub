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
   * @property {string} linkUrl - The href value of the form link.
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
    linkUrl = '#',
  } = {}) {
    super(container);

    this._buttonText = buttonText;
    this._linkText = linkText;
    this._linkUrl = linkUrl;

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
                    <a href="${this._linkUrl}" class="form-link">${this._linkText}</a>
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
   * Adds a new button click handler.
   *
   * @param {Function} handler - The function to be called when the form button is pressed.
   */
  addButtonClickHandler(handler) {
    this.button.addClickHandler(handler);
  }

  /**
   * Changes the text of the button.
   *
   * @param {string} value - The new button text.
   */
  set buttonText(value) {
    this.button.buttonText = value;
  }

  /**
   * Changes the inner text of the form link.
   *
   * @param {string} value - The new link text.
   */
  set linkText(value) {
    this.rootElement.querySelector('.form-link').innerText = value;
  }

  /**
   * Changes the href property of the link.
   *
   * @param {string} value - The new link link direction.
   */
  set linkUrl(value) {
    this.rootElement.querySelector('.form-link').href = value;
  }
}
