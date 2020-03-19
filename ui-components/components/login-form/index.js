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
            <div class="application-box form-dialog">
                <img src="images/logo.png" class="logo" alt="logo">
            
                <div class="form-header"></div>
            
                <main>
                    <div class="login-input"></div>
            
                    <div class="password-input"></div>
            
                    <div class="login-form-footer"></div>
                </main>
            
            </div>
        `;
    }


    initNestedComponents() {
        const loginInputContainer = this.rootContainer.querySelector('.login-input');
        this.loginInput = new FormInput(loginInputContainer);
        this.loginInput.labelText = 'Username';
        this.loginInput.placeholder = 'Email';
        this.loginInput.type = 'text';
        this.loginInput.helpText = 'Username can\'t be empty';
        this.loginInput.render();

        const passwordInputContainer = this.rootContainer.querySelector('.password-input');
        this.passwordInput = new FormInput(passwordInputContainer);
        this.passwordInput.labelText = 'Password';
        this.passwordInput.placeholder = 'Password';
        this.passwordInput.type = 'password';
        this.passwordInput.helpText = 'Password can\'t be empty and should contain letters and numbers';
        this.passwordInput.render();

        const footerContainer = this.rootContainer.querySelector('.login-form-footer');
        this.formFooter = new FormFooter(footerContainer);
        this.formFooter.buttonText = 'Log In';
        this.formFooter.linkText = 'Don\'t have an account yet?';
        this.formFooter.linkDirection = 'registration.html';
        this.formFooter.render();

        const headerContainer = this.rootContainer.querySelector('.form-header');
        this.header = new FormHeader(headerContainer);
        this.header.header = 'Login';
        this.header.render();
    }

    checkInputs() {
        if (this.loginInput.checkLogin()) {
            this.loginInput.hideHelpText();
        } else {
            this.loginInput.displayHelpText();
        }
        this.loginInput.render();

        if (this.passwordInput.checkLogin()) {
            this.passwordInput.hideHelpText();
        } else {
            this.passwordInput.displayHelpText();
        }
        this.passwordInput.render();
    }

    addEventListeners() {
        const button = this.rootContainer.querySelector('.button');
        button.addEventListener('click', this.checkInputs.bind(this));
    }
}