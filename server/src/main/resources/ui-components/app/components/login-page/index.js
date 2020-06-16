import Component from '../component.js';
import LoginForm from '../login-form/index.js';
import ApiService from '../../services/api-service/index.js';
import UserCredentials from '../../models/user-credentials/index.js';
import AuthorizationError from '../../models/errors/authorization-error/index.js';
import GeneralServerError from '../../models/errors/general-server-error/index.js';
import ServerValidationError from '../../models/errors/server-validation-error/index.js';
import TitleService from '../../services/title-service/index.js';
import {FILE_LIST_ROUTE} from '../../router/routes/index.js';
import {ROOT_FOLDER_ID} from '../../models/root-folder/index.js';

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

    const titleService = new TitleService(document);
    titleService.setTitle('Authentication');
  }

  /**
   * @inheritdoc
   */
  markup() {
    return `
      <div class="login-page" data-test="login-page"></div>
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
   *
   * @param {UserCredentials} userCredentials - The provided credentials.
   */
  sendCredentials(userCredentials) {
    const apiService = ApiService.getInstance();
    apiService.logIn(userCredentials)
      .then(() => {
        window.location.hash = FILE_LIST_ROUTE.replace(':folderId', ROOT_FOLDER_ID);
      })
      .catch((error) => {
        this._handleError(error);
      });
  }

  /**
   * Sets a function that should be called when the login form is submitted with verified values.
   */
  addEventListeners() {
    this.loginForm.onSubmit((userCredentials) => this.sendCredentials(userCredentials));
  }

  /**
   * Checks the type of the error and takes the necessary measures.
   *
   * @param {object} error - The thrown error.
   * @private
   */
  _handleError(error) {
    if (error instanceof ServerValidationError) {
      this.loginForm.showValidationErrors(error.errorCases);
    } else if (error instanceof AuthorizationError) {
      alert(`Authorization error: ${error.message}`);
    } else if (error instanceof GeneralServerError) {
      alert(`Internal server error: ${error.message}`);
    } else {
      alert('Unknown error. See the console for more details.');
      console.log(error);
    }
  }
}
