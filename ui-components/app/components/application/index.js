import Component from '../component.js';
import Router from '../../router';
import {AUTHENTICATION_ROUTE, REGISTRATION_ROUTE, FILE_LIST_ROUTE} from '../../router/routes';
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
    const stateManager = new StateManager({}, ApiService.getInstance());

    const pageMapping = {
      [AUTHENTICATION_ROUTE]: () => new LoginPage(this.rootElement),
      [REGISTRATION_ROUTE]: () => new RegistrationPage(this.rootElement),
      [FILE_LIST_ROUTE]: (properties) => {
        new FileListPage(this.rootElement, stateManager, properties);
      },
    };

    const routerProperties = {
      rootElement: this.rootElement,
      pageMapping,
      defaultLocation: AUTHENTICATION_ROUTE,
      notFoundPage: () => new NotFoundPage(this.rootElement),
      window,
    };

    new Router(routerProperties);
  }
}
