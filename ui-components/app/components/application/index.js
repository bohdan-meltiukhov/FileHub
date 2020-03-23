import Component from "../component.js";
import LoginForm from "../login-form";

export default class Application extends Component {

    constructor(container) {
        super(container);
    }

    markup() {
        return `
            <div class="application"></div>
        `;
    }

    initNestedComponents() {
        const loginFormContainer = this.rootElement;
        this.loginForm = new LoginForm(loginFormContainer);
    }
}
