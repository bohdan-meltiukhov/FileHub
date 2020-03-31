import Component from '../component.js';

/**
 * A component that represents page headers.
 */
export default class FormHeader extends Component {
  /**
   * The object for providing the initial header configurations via the constructor.
   *
   * @typedef {object} Parameters
   * @property {string} headerText - The text to be displayed in the header.
   */

  /**
   * Creates an instance of the form header component with set container and header text.
   *
   * @param {Element} container - The parent element for the current form header component.
   * @param {Parameters} parameters - The initial header configurations.
   */
  constructor(container, {headerText = 'Header'} = {}) {
    super(container);

    this._headerText = headerText;
    this.render();
  }

  /**
   * @inheritdoc
   */
  markup() {
    return `
            <header class="header">
                <h1>${this._headerText}</h1>
                <span class="glyphicon glyphicon-user"></span>
            </header>
        `;
  }

  /**
   * Changes the inner text of the header.
   *
   * @param {string} value - The new text to be displayed in the header.
   */
  set text(value) {
    this.rootElement.querySelector('h1').innerText = value;
  }
}
