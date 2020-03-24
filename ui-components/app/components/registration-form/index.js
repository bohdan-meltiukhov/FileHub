import Component from '../component.js';
import FormHeader from '../form-header';
import FormInput from '../form-input';
import FormFooter from '../login-form-footer';

/**
 *Hi.
 */
export default class RegistrationForm extends Component {
  constructor(container) {
    super(container);
    this.render();
  }

  /**
   *Hello.
   *
   * @returns {string} Something
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

  initNestedComponents() {
    const headerContainer = this.rootElement.querySelector('.form-header');
    this.header = new FormHeader(headerContainer, {
      text: 'Registration',
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

  checkInputs() {
    const login = this.loginInput.inputValue;
    if (login.length <= 4 && !/[A-Za-z0-9]+$/.test(login)) {
      this.loginInput.helpText = 'The username should have more than 4 characters and can contain ' +
        'only latin letters and digits';
    } else if (login.length <= 4) {
      this.loginInput.helpText = 'The username should have more than 4 characters';
    } else if (!/[A-Za-z0-9]+$/.test(login)) {
      this.loginInput.helpText = 'The username can contain only latin letters and digits';
    } else {
      this.loginInput.helpText = '';
    }

    const password = this.passwordInput.inputValue;
    if (password.length < 8 && /[0-9]+.*[a-z]+.*[A-Z]+.*$/.test(password)) {
      this.passwordInput.helpText = 'The password should have 8 or more characters and contain at least ' +
        'one digit, one lowercase letter, and one uppercase letter';
    } else if (password.length < 8) {
      this.passwordInput.helpText = 'The password should have 8 or more characters';
    } else if (/[0-9]+.*[a-z]+.*[A-Z]+.*$/.test(password)) {
      this.passwordInput.helpText = 'The password should contain at least one digit, one lowercase letter, ' +
        'and one uppercase letter';
    } else {
      this.passwordInput.helpText = '';
    }

    const confirmPassword = this.confirmPasswordInput.inputValue;
    if (confirmPassword !== password) {
      this.confirmPasswordInput.helpText = 'The passwords do not match';
    } else {
      this.confirmPasswordInput.helpText = '';
    }
  }

  addEventListeners() {
    this.formFooter.addButtonClickHandler(() => this.checkInputs());

    this.rootElement.addEventListener('submit', (event) => {
      event.preventDefault();
      event.stopPropagation();
    });
  }
}
