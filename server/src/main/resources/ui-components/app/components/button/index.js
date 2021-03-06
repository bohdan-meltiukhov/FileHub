import Component from '../component.js';

/**
 * The component for the button.
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
   * The object for providing the initial button configurations via the constructor.
   *
   * @typedef {object} Parameters
   * @property {string} buttonText - The text to be displayed inside the button.
   */

  /**
   * Creates an instance of the button component with set container and button text.
   *
   * @param {Element} container - The parent element for the current component.
   * @param {Parameters} parameters - The initial button configurations.
   */
  constructor(container, {buttonText = 'Submit'} = {}) {
    super(container);

    this._buttonText = buttonText;
    this.render();
  }

  /** @inheritdoc */
  markup() {
    return `
            <button class="button">${this._buttonText}</button>
        `;
  }

  /**
   * Adds a function that should be called when the button is pressed.
   *
   * @param {Function} handler - The function that should be called when the button is pressed.
   */
  addClickHandler(handler) {
    this._clickHandlers.push(handler);
  }

  /**
   * @inheritdoc
   */
  addEventListeners() {
    this.rootElement.addEventListener('click', () => {
      if (!this._isLoading) {
        this._clickHandlers.forEach((handler) => handler());
      }
    });
  }

  /**
   * Sets whether the current button is currently loading or not.
   *
   * @param {boolean} isLoading - The flag that shows if the button is loading.
   */
  set isLoading(isLoading) {
    this._isLoading = isLoading;

    if (isLoading) {
      this.rootElement.innerHTML = '<div class="loader-small" data-test="loader-small"></div>';
    } else {
      this.rootElement.innerHTML = this._buttonText;
    }
  }
}
