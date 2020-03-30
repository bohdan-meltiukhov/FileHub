import Component from '../component.js';
import FormInput from '../form-input';
import FormFooter from '../login-form-footer';
import FormHeader from '../form-header';
import Validator from '../validator.js';
import MinLengthValidationRule from '../validation-rules/min-length-validation-rule.js';

/**
 * The component for the authentication form.
 */
export default class LoginForm extends Component {
  /**
   * Creates an instance of the login form component with set container.
   *
   * @param {Element} container - The parent element for the current login form component.
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
            <form class="application-box form-dialog" data-test="login-form">
                <img src="app/images/logo.png" class="logo" alt="logo">
            
                <div class="form-header"></div>
            
                <main>
                    <div class="login-input"></div>
            
                    <div class="password-input"></div>
            
                    <div class="login-form-footer"></div>
                </main>
            
            </form>
        `;
  }

  /**
   * @inheritdoc
   */
  initNestedComponents() {
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

    const footerContainer = this.rootElement.querySelector('.login-form-footer');
    this.formFooter = new FormFooter(footerContainer, {
      buttonText: 'Log In',
      linkText: 'Don\'t have an account yet?',
      linkDirection: '#/registration',
    });

    const headerContainer = this.rootElement.querySelector('.form-header');
    this.header = new FormHeader(headerContainer, {
      headerText: 'Login',
    });
  }

  /**
   * Verifies that values from the form inputs meet the requirements.
   */
  validateForm() {
    const validator = new Validator();

    const loginHelpText = validator.validate('username', this.loginInput.inputValue,
      [new MinLengthValidationRule(1, 'not be empty')]);
    this.loginInput.helpText = loginHelpText;

    const passwordHelpText = validator.validate('password', this.passwordInput.inputValue,
      [new MinLengthValidationRule(1, 'not be empty')]);
    this.passwordInput.helpText = passwordHelpText;

    if (loginHelpText === '' && passwordHelpText === '') {
      this._onSubmit();
    }
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

  /**
   * Saves the callback that should be called in case the form is verified and the fields are verified.
   *
   * @param {Function} callback - The function that should be called when the form is submitted with verified values.
   */
  onSubmit(callback) {
    this._onSubmit = callback;
  }

  /**
   * Provides the entered value of the username.
   *
   * @returns {string} The provided username.
   */
  get username() {
    return this.loginInput.inputValue;
  }

  /**
   * Provides the entered value of the password.
   *
   * @returns {string} The provided password.
   */
  get password() {
    return this.passwordInput.inputValue;
  }
}
