import Component from '../component.js';

/**
 * A component that represents page headers.
 */
export default class FormHeader extends Component {
  /**
   * Creates an instance of the form header component with set container and header text.
   *
   * @param {Element} container - A parent element for the current form header component.
   * @param {string} text - The text to be displayed in the header.
   */
  constructor(container, {text = 'Header'} = {}) {
    super(container);

    this._text = text;
    this.render();
  }

  /**
   * Provides an HTML representation of the form header element.
   *
   * @returns {string} - An HTML code that represents the header component.
   */
  markup() {
    return `
            <header class="header">
                <h1>${this._text}</h1>
                <span class="glyphicon glyphicon-user"></span>
            </header>
        `;
  }

  /**
   * Assigns a new value to the header text and changes the inner text of the header.
   *
   * @param {string} value - The new text to be displayed in the header.
   */
  set text(value) {
    this._text = value;
    this.rootElement.querySelector('h1').innerText = value;
  }
}
