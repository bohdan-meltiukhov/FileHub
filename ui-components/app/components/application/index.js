import Component from '../component.js';
import LoginForm from '../login-form';
import RegistrationForm from '../registration-form';
import Router from '../../../router.js';

/**
 * The component for the web application.
 */
export default class Application extends Component {
  /**
   * Creates an instance of the application component with set container.
   *
   * @param {Element} container - The parent element for the application component.
   */
  constructor(container) {
    super(container);
  }

  /**
   * @inheritdoc
   */
  markup() {
    return `
            <div class="application"></div>
        `;
  }

  /**
   * @inheritdoc
   */
  initNestedComponents() {
    const pageMapping = {
      '/authentication': LoginForm,
      '/registration': RegistrationForm,
    };

    const router = new Router(this.rootElement, pageMapping, '/authentication');

    this.router = router;
  }
}
