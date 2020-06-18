import Component from '../component.js';

/**
 * The component for the input group.
 */
export default class FormInput extends Component {
  /**
   * The object for providing the initial form input configurations via the constructor.
   *
   * @typedef {object} Parameters
   * @property {string} labelText - The text for the input label.
   * @property {string} placeholder - The input placeholder value.
   * @property {string} type - The type of the input.
   */

  /**
   * Creates an instance of the form input component with set container and properties.
   *
   * @param {Element} container - The parent element for the current form input.
   * @param {Parameters} parameters - The initial form input parameters.
   */
  constructor(container, {
    labelText = 'Label',
    placeholder = 'Placeholder',
    type = 'text',
  } = {}) {
    super(container);

    this._labelText = labelText;
    this._placeholder = placeholder;
    this._type = type;

    this.render();
  }

  /**
   * @inheritdoc
   */
  markup() {
    return `
            <div class="row">
                <label for="input-username" class="input-label">${this._labelText}</label>
    
                <div class="input-block">
                    <input type="${this._type}" name="username" class="input" placeholder="${this._placeholder}" 
                    data-test="input">
                    <span class="error-message" data-test="error-message"></span>
                </div>
            </div>
        `;
  }

  /**
   * Provides the value of the input.
   *
   * @returns {string} The input value.
   */
  get inputValue() {
    return this.rootElement.querySelector('[data-test="input"]').value;
  }

  /**
   * Changes the help text.
   *
   * @param {string} value - The new help text value.
   */
  set helpText(value) {
    this.rootElement.querySelector('[data-test="error-message"]').innerText = value;
  }
}
