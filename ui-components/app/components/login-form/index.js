import Component from '../component.js';
import FormInput from '../form-input';
import Validator from '../validator.js';
import Button from '../button';

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
                            <a href="#/registration" class="form-link">Don't have an account yet?</a>
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
   */
  validateForm() {
    const validator = new Validator();

    validator.validate(this.loginInput, {
      inputName: 'username',
      minLength: 1,
    });

    validator.validate(this.passwordInput, {
      inputName: 'password',
      minLength: 1,
    });
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
