import Component from '../component.js';
import Router from '../../router.js';
import NotFoundPage from '../not-found';
import LoginPage from '../login-page';
import RegistrationPage from '../registration-page';
import FileListPage from '../file-list-page';
import StateManager from '../../state/state-manager';
import ApiService from '../../services/api-service';

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
      '/file-list': FileListPage,
    };

    const stateManager = new StateManager({}, new ApiService());

    const routerProperties = {
      rootElement: this.rootElement,
      stateManager,
      pageMapping,
      defaultLocation: '/authentication',
      notFoundPage: NotFoundPage,
      window,
    };

    const router = new Router(routerProperties);

    this.router = router;
  }
}
