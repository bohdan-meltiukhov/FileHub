import Component from '../component.js';
import {AUTHENTICATION_ROUTE, FILE_LIST_ROUTE, REGISTRATION_ROUTE} from '../../router/routes/index.js';
import NotFoundPage from '../not-found/index.js';
import LoginPage from '../login-page/index.js';
import RegistrationPage from '../registration-page/index.js';
import FileListPage from '../file-list-page/index.js';
import StateManager from '../../state/state-manager/index.js';
import ApiService from '../../services/api-service/index.js';
import HashChangedAction from '../../state/actions/hash-changed-action/index.js';
import Router from '../../router/index.js';
import MessageService from '../../services/message-service/index.js';

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

    // window.devMode = true;
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
    const messageService = new MessageService();

    const pageMapping = {
      [AUTHENTICATION_ROUTE]: () => {
        this._destroyPreviousPage();
        this._previousPage = new LoginPage(this.rootElement);
      },
      [REGISTRATION_ROUTE]: () => {
        this._destroyPreviousPage();
        this._previousPage = new RegistrationPage(this.rootElement);
      },
      [FILE_LIST_ROUTE]: (properties) => {
        this._destroyPreviousPage();
        this._previousPage = new FileListPage(this.rootElement, stateManager, messageService, properties);
      },
    };

    const routerBuilder = Router.getBuilder();

    routerBuilder
      .withRootElement(this.rootElement)
      .withPageMapping(pageMapping)
      .withDefaultLocation(AUTHENTICATION_ROUTE)
      .withNotFoundPage(() => {
        this._destroyPreviousPage();
        this._previousPage = new NotFoundPage(this.rootElement);
      })
      .withWindow(window)
      .withHashChangedHandler((staticPart, dynamicPart) => {
        stateManager.dispatch(new HashChangedAction(staticPart, dynamicPart));
      })
      .build();
  }

  /**
   * Destroys the previous page if it exists.
   *
   * @private
   */
  _destroyPreviousPage() {
    if (this._previousPage) {
      this._previousPage.willDestroy();
    }
  }
}
