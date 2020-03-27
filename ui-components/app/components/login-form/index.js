import Component from '../component.js';
import FormInput from '../form-input';
import FormFooter from '../login-form-footer';
import FormHeader from '../form-header';
import Validator from '../validator.js';

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
    this.formFooter.addButtonClickHandler(() => this.validateForm());

    this.rootElement.addEventListener('submit', (event) => {
      event.preventDefault();
      event.stopPropagation();
    });
  }
}
