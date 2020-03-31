import Component from '../component.js';
import FormHeader from '../form-header';
import FormInput from '../form-input';
import FormFooter from '../login-form-footer';
import Validator from '../validator.js';
import MinLengthValidationRule from '../validation-rules/min-length-validation-rule.js';
import RegExpValidationRule from '../validation-rules/regexp-validation-rule.js';
import EqualValidationRule from '../validation-rules/equal-validation-rule.js';
import ValidationErrorCase from '../../models/errors/validation-error-case';
import UserCredentials from '../../models/user-credentials';

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
            <form class="application-box form-dialog" data-test="registration-form">
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
    this.loginInput.helpText = '';
    this.passwordInput.helpText = '';
    this.confirmPasswordInput.helpText = '';

    const validator = new Validator();

    validator.addField('username', this.loginInput.inputValue, [
      new MinLengthValidationRule(5, 'have 5 or more characters'),
      new RegExpValidationRule(/^[A-Za-z0-9]+$/, 'contain only latin letters and digits'),
    ]);

    validator.addField('password', this.passwordInput.inputValue, [
      new MinLengthValidationRule(8, 'have 8 or more characters'),
      new RegExpValidationRule(/^.*(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).*$/, 'contain at least one digit, one lowercase ' +
        'letter, and one uppercase letter'),
    ]);

    validator.addField('second password',
      this.confirmPasswordInput.inputValue,
      [new EqualValidationRule(this.passwordInput.inputValue, 'be equal to the first password')]);

    validator.validate()
      .then(() => {
        this._onSubmit(new UserCredentials(this.loginInput.inputValue, this.passwordInput.inputValue));
      })
      .catch((errors) => {
        this.showValidationErrors(errors);
      });
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
   * Displays the provided validation errors on the form.
   *
   * @param {ValidationErrorCase[]} errors - The array of errors to display.
   */
  showValidationErrors(errors) {
    errors.forEach((error) => {
      switch (error.field) {
      case 'username':
        this.loginInput.helpText = error.message;
        break;
      case 'password':
        this.passwordInput.helpText = error.message;
        break;
      case 'second password':
        this.confirmPasswordInput.helpText = error.message;
        break;
      default:
        console.log(error.message);
      }
    });
  }
}
