import Component from '../component.js';
import FormInput from '../form-input';
import Validator from '../../services/validator';
import MinLengthValidationRule from '../../services/validator/validation-rules/min-length-validation-rule.js';
import UserCredentials from '../../models/user-credentials';
import ValidationErrorCase from '../../models/errors/validation-error-case';
import Button from '../button';
import {REGISTRATION_ROUTE} from '../../router/routes';

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
            
                <header class="header">
                    <h1>Login</h1>
                    <span class="glyphicon glyphicon-user"></span>
                </header>
            
                <main>
                    <div data-test="login-input"></div>
            
                    <div data-test="password-input"></div>
            
                    <div class="row">
                        <div class="form-footer">
                            <span data-test="submit-button"></span>
                            <a href="#${REGISTRATION_ROUTE}" class="form-link">Don't have an account yet?</a>
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
    const loginInputContainer = this.rootElement.querySelector('[data-test="login-input"]');
    this.loginInput = new FormInput(loginInputContainer, {
      labelText: 'Username',
      placeholder: 'Email',
      type: 'text',
    });

    const passwordInputContainer = this.rootElement.querySelector('[data-test="password-input"]');
    this.passwordInput = new FormInput(passwordInputContainer, {
      labelText: 'Password',
      placeholder: 'Password',
      type: 'password',
    });

    const buttonContainer = this.rootElement.querySelector('[data-test="submit-button"]');
    this.button = new Button(buttonContainer, {
      buttonText: 'Log In',
    });
  }

  /**
   * Verifies that values from the form inputs meet the requirements.
   *
   * @private
   */
  _validateForm() {
    const validator = new Validator();

    validator.addField('username',
      [new MinLengthValidationRule(1, 'This field should not be empty.')]);

    validator.addField('password',
      [new MinLengthValidationRule(1, 'This field should not be empty.')]);

    const inputValues = {
      username: this.loginInput.inputValue,
      password: this.passwordInput.inputValue,
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
  }
}
