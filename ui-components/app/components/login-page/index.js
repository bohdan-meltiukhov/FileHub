import Component from '../component.js';
import LoginForm from '../login-form';

/**
 * The component for the login page.
 */
export default class LoginPage extends Component {
  /**
   * Creates an instance of the login page component with set container.
   *
   * @param {Element} container - The parent element for the login page.
   */
  constructor(container) {
    super(container);

    this.render();
  }

  /**
   * @inheritdoc
   */
  markup() {
    return `
      <div class="login-page"></div>
    `;
  }

  /**
   * @inheritdoc
   */
  initNestedComponents() {
    const formContainer = this.rootElement;
    this.loginForm = new LoginForm(formContainer);
  }
}
