import Component from '../component.js';
import FormHeader from '../form-header';
import FormInput from '../form-input';
import FormFooter from '../login-form-footer';
import Validator from '../validator.js';

/**
 * The component for the registration form.
 */
export default class RegistrationForm extends Component {
  /**
   * Creates an instance of the registration form component with set container.
   *
   * @param {Element} container - The parent element for the registration form component.
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
            <form class="application-box form-dialog">
                <img src="app/images/logo.png" class="logo" alt="logo">
            
                <div class="form-header"></div>
            
                <main>
                    <div class="login-input"></div>
            
                    <div class="password-input"></div>
            
                    <div class="confirm-password-input"></div>
            
                    <div class="login-form-footer"></div>
                </main>
            </form>
        `;
  }

  /**
   * @inheritdoc
   */
  initNestedComponents() {
    const headerContainer = this.rootElement.querySelector('.form-header');
    this.header = new FormHeader(headerContainer, {
      headerText: 'Registration',
    });

    const loginInputContainer = this.rootElement.querySelector('.login-input');
    this.loginInput = new FormInput(loginInputContainer, {
      labelText: 'Username',
      placeholder: 'Email',
      type: 'text',
    });

    const passwordInputContainer = this.rootElement.querySelector('.password-input');
    this.passwordInput = new FormInput(passwordInputContainer, {
      labelText: 'Password',
      placeholder: 'Password',
      type: 'password',
    });

    const confirmPasswordInputContainer = this.rootElement.querySelector('.confirm-password-input');
    this.confirmPasswordInput = new FormInput(confirmPasswordInputContainer, {
      labelText: 'Confirm password',
      placeholder: 'Confirm password',
      type: 'password',
    });

    const footerContainer = this.rootElement.querySelector('.login-form-footer');
    this.formFooter = new FormFooter(footerContainer, {
      buttonText: 'Register',
      linkText: 'Already have an account?',
      linkDirection: '#/authentication',
    });
  }

  /**
   * Verifies that values from the form inputs meet the requirements.
   */
  validateForm() {
    const validator = new Validator();

    const usernameProperties = {
      inputName: 'username',
      minLength: 5,
      regExp: /^[A-Za-z0-9]+$/,
      regExpDescription: 'contain only latin letters and digits',
    };

    validator.validate(this.loginInput, usernameProperties);

    const passwordProperties = {
      inputName: 'password',
      minLength: 8,
      regExp: /^.*(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).*$/,
      regExpDescription: 'contain at least one digit, one lowercase letter, and one uppercase letter',
    };

    validator.validate(this.passwordInput, passwordProperties);

    const confirmPasswordProperties = {
      inputName: 'second password',
      equals: this.passwordInput.inputValue,
      equalsDescription: 'be equal to the first password',
    };

    validator.validate(this.confirmPasswordInput, confirmPasswordProperties);
  }

  /**
   * @inheritdoc
   */
  addEventListeners() {
    this.formFooter.addButtonClickHandler(() => this.validateForm());

    this.rootElement.addEventListener('submit', (event) => {
      event.preventDefault();
      event.stopPropagation();
    });
  }
}
