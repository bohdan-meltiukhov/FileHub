import Component from '../component.js';
import RegistrationForm from '../registration-form';
import Router from '../../../router.js';
import FileExplorer from '../file-explorer';
import LoginPage from '../login-page';

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
      '/authentication': LoginPage,
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
