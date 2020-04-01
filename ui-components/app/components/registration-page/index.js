import Component from '../component.js';
import RegistrationForm from '../registration-form';
import APIService from '../../services/api-service';
import UserCredentials from '../../models/user-credentials';
import ServerValidationError from '../../models/errors/server-validation-error';
import GeneralServerError from '../../models/errors/general-server-error';

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
  verifyForm(userCredentials) {
    const apiService = new APIService();
    apiService.register(userCredentials)
      .then(() => {
        window.location.hash = '#/authentication';
      })
      .catch((error) => {
        if (error instanceof ServerValidationError) {
          this.registrationForm.showValidationErrors(error.errorCases);
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
    this.registrationForm.onSubmit((userCredentials) => this.verifyForm(userCredentials));
  }
}
