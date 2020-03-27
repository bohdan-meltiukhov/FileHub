import Component from '../component.js';
import LoginForm from '../login-form';
import RegistrationForm from '../registration-form';
import Router from '../../../router.js';
import FileExplorer from '../file-explorer';

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
      '/file-explorer': FileExplorer,
    };

    const routerProperties = {
      rootElement: this.rootElement,
      pageMapping: pageMapping,
      defaultLocation: '/authentication',
      window: window,
    };

    const router = new Router(routerProperties);

    this.router = router;
  }
}
