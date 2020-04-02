import Component from '../component.js';
import FormInput from '../form-input';
import Validator from '../../services/validator';
import MinLengthValidationRule from '../../services/validator/validation-rules/min-length-validation-rule.js';
import RegExpValidationRule from '../../services/validator/validation-rules/regexp-validation-rule.js';
import EqualValidationRule from '../../services/validator/validation-rules/equal-validation-rule.js';
import ValidationErrorCase from '../../models/errors/validation-error-case';
import UserCredentials from '../../models/user-credentials';
import Button from '../button';

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
            
                <header class="header">
                    <h1>Registration</h1>
                    <span class="glyphicon glyphicon-user"></span>
                </header>
            
                <main>
                    <div data-test="login-input"></div>
            
                    <div data-test="password-input"></div>
            
                    <div data-test="confirm-password-input"></div>
            
                    <div class="row">
                        <div class="form-footer">
                            <span data-test="submit-button"></span>
                            <a href="#/authentication" class="form-link">Already have an account?</a>
                        </div>
                    </div>
                </main>
            </form>
        `;
  }

  /**
   * @inheritdoc
   */
  initNestedComponents() {
    const loginInputContainer = this.rootElement.querySelector('[data-test="login-input"');
    this.loginInput = new FormInput(loginInputContainer, {
      labelText: 'Username',
      placeholder: 'Email',
      type: 'text',
    });

    const passwordInputContainer = this.rootElement.querySelector('[data-test="password-input"');
    this.passwordInput = new FormInput(passwordInputContainer, {
      labelText: 'Password',
      placeholder: 'Password',
      type: 'password',
    });

    const confirmPasswordInputContainer = this.rootElement.querySelector('[data-test="confirm-password-input"');
    this.confirmPasswordInput = new FormInput(confirmPasswordInputContainer, {
      labelText: 'Confirm password',
      placeholder: 'Confirm password',
      type: 'password',
    });

    const buttonContainer = this.rootElement.querySelector('[data-test="submit-button"');
    this.button = new Button(buttonContainer, {
      buttonText: 'Register',
    });
  }

  /**
   * Verifies that values from the form inputs meet the requirements.
   */
  _validateForm() {
    const validator = new Validator();

    validator.addField('username', [
      new MinLengthValidationRule(5, 'Please enter 5 or more characters.'),
      new RegExpValidationRule(/^[A-Za-z0-9]+$/, 'Only latin letters and digits are allowed.'),
    ]);

    validator.addField('password', [
      new MinLengthValidationRule(8, 'Please enter 8 or more characters.'),
      new RegExpValidationRule(/^.*(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).*$/, 'Add at least one lowercase letter, ' +
        'one uppercase letter and one digit.'),
    ]);

    validator.addField('confirmPassword',
      [new EqualValidationRule(this.passwordInput.inputValue, 'The passwords do not match.')]);

    const inputValues = {
      username: this.loginInput.inputValue,
      password: this.passwordInput.inputValue,
      confirmPassword: this.confirmPasswordInput.inputValue,
    };

    validator.validate(inputValues)
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
    this.button.addClickHandler(() => this._validateForm());

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
    const errorMap = errors.reduce((map, error) => {
      map[error.field] = error.message;
      return map;
    }, {});

    this.loginInput.helpText = errorMap.username || '';
    this.passwordInput.helpText = errorMap.password || '';
    this.confirmPasswordInput.helpText = errorMap.confirmPassword || '';
  }
}
