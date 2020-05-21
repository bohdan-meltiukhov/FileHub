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
            <span data-test="loading-message">Loading...</span>
        </span>
    `;
  }

  /** @inheritdoc */
  initNestedComponents() {
    this._nameElement = this.rootElement.querySelector('[data-test="user-name"]');
    this._loader = this.rootElement.querySelector('[data-test="loading-message"]');
    this._loader.style.display = 'none';
  }

  /**
   * Changes the displayed username.
   *
   * @param {string} value - The new username.
   */
  set username(value) {
    this._nameElement.innerText = value;
  }

  /**
   * Sets whether the user name is currently loading or not.
   *
   * @param {boolean} isLoading - The flag that shows if the user name is being loading.
   */
  set isLoading(isLoading) {
    if (isLoading) {
      this._nameElement.style.display = 'none';
      this._loader.style.display = 'inline';
    } else {
      this._loader.style.display = 'none';
      this._nameElement.style.display = 'inline';
    }
  }
}
