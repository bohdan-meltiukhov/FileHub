import Component from '../component.js';

/**
 * A component for input groups.
 */
export default class FormInput extends Component {
  /**
   * The object for providing the initial form input configurations via the constructor.
   *
   * @typedef {object} Parameters
   * @property {string} labelText - The text for the input label.
   * @property {string} placeholder - The input placeholder value.
   * @property {string} - The type of the input.
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
    this._helpText = '';

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
                    <input type="${this._type}" name="username" class="input" placeholder="${this._placeholder}">
                    <span class="error-message">${this._helpText}</span>
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
    return this.rootElement.querySelector('.input').value;
  }

  /**
   * Shows whether there is any error message in the help text.
   *
   * @returns {boolean} True in case the help text field is empty.
   */
  inputValid() {
    return this._helpText === '';
  }

  /**
   * Assigns the provided value to the input label text and changes the inner text of the label.
   *
   * @param {string} value - The new label text.
   */
  set labelText(value) {
    this._labelText = value;
    this.rootElement.querySelector('.input-label').innerText = value;
  }

  /**
   * Assigns the new placeholder value to the private field and changes the placeholder for the input.
   *
   * @param {string} value - The new placeholder value.
   */
  set placeholder(value) {
    this._placeholder = value;
    this.rootElement.querySelector('.input').placeholder = value;
  }

  /**
   * Assigns the new input type to the private field and changes the input type.
   *
   * @param {string} value - The new input type.
   */
  set type(value) {
    this._type = value;
    this.rootElement.querySelector('.input').type = value;
  }

  /**
   * Assigns the new help text to the private field and changes the help text.
   *
   * @param {string} value - The new help text value.
   */
  set helpText(value) {
    this._helpText = value;
    this.rootElement.querySelector('.error-message').innerText = value;
  }
}
