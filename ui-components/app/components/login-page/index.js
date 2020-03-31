import Component from '../component.js';
import LoginForm from '../login-form';
import APIService from '../../services/api-service';
import UserCredentials from '../../models/user-credentials';
import AuthorizationError from '../../models/errors/authorization-error';
import GeneralServerError from '../../models/errors/general-server-error';

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

  /**
   * Checks if the provided username and password can be accepted by the API service.
   */
  verifyForm() {
    const apiService = new APIService();
    apiService.login(new UserCredentials(this.loginForm.username, this.loginForm.password))
      .then(() => {
        window.location.hash = '#/file-explorer';
      })
      .catch((error) => {
        if (error instanceof AuthorizationError) {
          alert(`Authorization error: ${error.message}`);
        } else if (error instanceof GeneralServerError) {
          alert(`Internal server error: ${error.message}`);
        } else {
          alert('Unknown error. See the console for more details.');
          console.log(error);
        }
      });
  }

  /**
   * Sets a function that should be called when the login form is submitted with verified values.
   */
  addEventListeners() {
    this.loginForm.onSubmit(() => this.verifyForm());
  }
}
