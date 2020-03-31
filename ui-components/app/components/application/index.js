import Component from '../component.js';
import LoginForm from '../login-form';
import RegistrationForm from '../registration-form';
import Router from '../../../router.js';
import NotFoundPage from '../not-found';

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

    const routerProperties = {
      rootElement: this.rootElement,
      pageMapping,
      defaultLocation: '/authentication',
      notFoundPage: NotFoundPage,
      window,
    };

    const router = new Router(routerProperties);

    this.router = router;
  }
}
