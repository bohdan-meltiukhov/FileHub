import Component from "../component.js";
import LoginForm from "../login-form";
import RegistrationForm from "../registration-form";
import Router from "../../../router.js";

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
        const pageMapping = {
            '/authentication': LoginForm,
            '/registration': RegistrationForm
        };

        const router = new Router(this.rootElement, pageMapping);

        router.defaultLocation = '/authentication';
        this.router = router;
    }
}
