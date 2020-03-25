import Component from '../component.js';

/**
 * A component for buttons.
 */
export default class Button extends Component {
  /**
   * An array of functions that should be called when the button is clicked.
   *
   * @type {Function[]}
   * @private
   */
  _clickHandlers = [];

  /**
   * Creates an instance of the button component with set container and button text.
   *
   * @param {Element} container - A parent element for the current component.
   * @param {string} buttonText - A text to be displayed inside the button.
   */
  constructor(container, {buttonText = 'Submit'} = {}) {
    super(container);

    this._buttonText = buttonText;
    this.render();
  }

  /**
   * Generates an HTML representation of a button component.
   *
   * @returns {string} - The HTML code to be displayed on the page.
   */
  markup() {
    return `
            <button class="button">${this._buttonText}</button>
        `;
  }

  /**
   * Adds a handler to the button click event.
   *
   * @param {Function} handler - A function to be called when the button is pressed.
   */
  addClickHandler(handler) {
    this._clickHandlers.push(handler);
  }

  /**
   * Calls each function from the {@link _clickHandlers} array when the button is pressed.
   */
  addEventListeners() {
    this.rootElement.addEventListener('click', () => {
      this._clickHandlers.forEach((handler) => handler());
    });
  }

  /**
   * Sets the button text field and changes the innerText property of the button.
   *
   * @param {string} value - The new text for the button.
   */
  set buttonText(value) {
    this._buttonText = value;
    this.rootElement.innerText = value;
  }
}
