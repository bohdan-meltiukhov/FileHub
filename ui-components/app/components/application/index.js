import Component from '../component.js';
import Router from '../../router.js';
import NotFoundPage from '../not-found';
import FileExplorer from '../file-explorer';
import LoginPage from '../login-page';
import RegistrationPage from '../registration-page';

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
            <div></div>
        `;
  }

  /**
   * @inheritdoc
   */
  initNestedComponents() {
    const pageMapping = {
      '/authentication': LoginPage,
      '/registration': RegistrationPage,
      '/file-explorer': FileExplorer,
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
