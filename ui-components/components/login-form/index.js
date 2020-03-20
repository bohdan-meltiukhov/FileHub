import Component from "../component.js";
import FormInput from "../form-input";
import FormFooter from "../login-form-footer";
import FormHeader from "../form-header";

export default class LoginForm extends Component {

    constructor(...args) {
        super(...args);
    }

    markup() {
        return `
            <form class="application-box form-dialog">
                <img src="images/logo.png" class="logo" alt="logo">
            
                <div class="form-header"></div>
            
                <main>
                    <div class="login-input"></div>
            
                    <div class="password-input"></div>
            
                    <div class="login-form-footer"></div>
                </main>
            
            </form>
        `;
    }


    initNestedComponents() {
        const loginInputContainer = this.rootElement.querySelector('.login-input');
        this.loginInput = new FormInput(loginInputContainer, {
            labelText: 'Username',
            placeholder: 'Email',
            type: 'text'
        });

        const passwordInputContainer = this.rootElement.querySelector('.password-input');
        this.passwordInput = new FormInput(passwordInputContainer, {
            labelText: 'Password',
            placeholder: 'Password',
            type: 'password'
        });

        const footerContainer = this.rootElement.querySelector('.login-form-footer');
        this.formFooter = new FormFooter(footerContainer, {
            buttonText: 'Log In',
            linkText: 'Don\'t have an account yet?',
            linkDirection: 'registration.html'
        });

        const headerContainer = this.rootElement.querySelector('.form-header');
        this.header = new FormHeader(headerContainer, {
            text: 'Login'
        });
    }

    checkInputs() {
        if (this.loginInput.inputValue !== '') {
            this.loginInput.helpText = '';
        } else {
            this.loginInput.helpText = 'Username can\'t be empty';
        }

        if (this.passwordInput.inputValue !== '') {
            this.passwordInput.helpText = '';
        } else {
            this.passwordInput.helpText = 'Password can\'t be empty';
        }
    }

    addEventListeners() {
        const button = this.rootElement.querySelector('.button');
        button.addEventListener('click', () => this.checkInputs());

        this.formFooter.addButtonClickHandler(() => this.checkInputs());

        this.rootElement.addEventListener('submit', (event) => {
            event.preventDefault();
            event.stopPropagation();
        });
    }
}
