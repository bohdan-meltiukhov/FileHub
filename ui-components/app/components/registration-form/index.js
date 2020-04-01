import Component from '../component.js';
import FormInput from '../form-input';
import Validator from '../validator.js';
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
            <form class="application-box form-dialog" data-test="registration-form">
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
    this.button.addClickHandler(() => this.validateForm());

    this.rootElement.addEventListener('submit', (event) => {
      event.preventDefault();
      event.stopPropagation();
    });
  }
}
