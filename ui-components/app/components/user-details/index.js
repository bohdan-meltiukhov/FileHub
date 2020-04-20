import Component from '../component.js';

/**
 * The element for displaying the user details on the page.
 */
export default class UserDetails extends Component {
  /**
   * The object for providing the UserDetails configuration via the constructor.
   *
   * @typedef {object} Parameters
   * @property {string} username - The name of the current user.
   */

  /**
   * Creates an instance of the UserDetails class with set container.
   *
   * @param {Element} container - The parent element for the UserDetails component.
   * @param {Parameters} parameters - The UserDetails configurations.
   */
  constructor(container, {username = 'User'} = {}) {
    super(container);
    this._username = username;

    this.render();
  }

  /**
   * @inheritdoc
   */
  markup() {
    return `
        <span data-test="user-details">
            <span class="glyphicon glyphicon-user"></span>
            <span data-test="user-name">${this._username}</span>
        </span>
    `;
  }

  /**
   * Changes the displayed username.
   *
   * @param {string} value - The new username.
   */
  set username(value) {
    const name = this.rootElement.querySelector('[data-test="user-name"]');
    name.innerText = value;
  }
}
