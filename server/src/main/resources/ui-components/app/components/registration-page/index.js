import Component from '../component.js';
import RegistrationForm from '../registration-form/index.js';
import ApiService from '../../services/api-service/index.js';
import UserCredentials from '../../models/user-credentials/index.js';
import ServerValidationError from '../../models/errors/server-validation-error/index.js';
import GeneralServerError from '../../models/errors/general-server-error/index.js';
import TitleService from '../../services/title-service/index.js';
import {AUTHENTICATION_ROUTE} from '../../router/routes/index.js';
import MessageService from '../../services/message-service/index.js';

/**
 * The component for teh registration page.
 */
export default class RegistrationPage extends Component {
  /**
   * Creates an instance of the registration page with set container.
   *
   * @param {Element} container - The parent element for the registration page.
   */
  constructor(container) {
    super(container);

    this.render();

    const titleService = new TitleService(document);
    titleService.setTitle('Registration');
  }

  /** @inheritdoc */
  markup() {
    return `
      <div class="registration-page" data-test="registration-page"></div>
    `;
  }

  /** @inheritdoc */
  initNestedComponents() {
    const formContainer = this.rootElement;
    this.registrationForm = new RegistrationForm(formContainer);
  }

  /**
   * Checks if the provided username and password can be accepted by the API service.
   *
   * @param {UserCredentials} userCredentials - The provided credentials.
   */
  sendCredentials(userCredentials) {
    const apiService = ApiService.getInstance();
    apiService.register(userCredentials)
      .then(() => {
        window.location.hash = AUTHENTICATION_ROUTE;
      })
      .catch((error) => {
        this._handleError(error);
      });
  }

  /**
   * Sets a function that should be called when the login form is submitted with verified values.
   */
  addEventListeners() {
    this.registrationForm.onSubmit((userCredentials) => this.sendCredentials(userCredentials));
  }

  /**
   * Checks the type of the error and takes the necessary measures.
   *
   * @param {object} error - The thrown error.
   * @private
   */
  _handleError(error) {
    const messageService = new MessageService();

    if (error instanceof ServerValidationError) {
      this.registrationForm.showValidationErrors(error.errorCases);
    } else if (error instanceof GeneralServerError) {
      messageService.showError(`Internal server error: ${error.message}`);
    } else {
      messageService.showError('Unknown error. See the console for more details.');
      console.log(error);
    }
  }
}
