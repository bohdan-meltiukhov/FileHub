import Component from '../component.js';

/**
 * A component for input groups.
 */
export default class FormInput extends Component {
  /**
   * Creates an instance of the form input component with set container and properties.
   *
   * @param {Element} container - The parent element for the current form input.
   * @param {string} labelText - The text for te input label.
   * @param {string} placeholder - The input placeholder value.
   * @param {string} type - The type of the input.
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
   * Provides an HTML representation of the form input component.
   *
   * @returns {string} - An HTML code that represents the form input component.
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
