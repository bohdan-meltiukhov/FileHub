import Component from '../component.js';
import RegistrationForm from '../registration-form';
import APIService from '../../services/api-service';
import UserCredentials from '../../models/user-credentials';

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
      <div class="registration-page"></div>
    `;
  }

  /** @inheritdoc */
  initNestedComponents() {
    const formContainer = this.rootElement;
    this.registrationForm = new RegistrationForm(formContainer);
  }

  /**
   * Checks if the provided username and password can be accepted by the API service.
   */
  verifyForm() {
    const apiService = new APIService();
    apiService.register(new UserCredentials(this.registrationForm.username, this.registrationForm.password))
      .then(() => {
        window.location.hash = '#/authentication';
      })
      .catch((error) => {
        console.log(error);
      });
  }

  /**
   * Sets a function that should be called when the login form is submitted with verified values.
   */
  addEventListeners() {
    this.registrationForm.onSubmit(() => this.verifyForm());
  }
}
