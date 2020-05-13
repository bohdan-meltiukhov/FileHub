import Component from '../component.js';
import {AUTHENTICATION_ROUTE, FILE_LIST_ROUTE, REGISTRATION_ROUTE} from '../../router/routes';
import NotFoundPage from '../not-found';
import LoginPage from '../login-page';
import RegistrationPage from '../registration-page';
import FileListPage from '../file-list-page';
import StateManager from '../../state/state-manager';
import ApiService from '../../services/api-service';
import HashChangedAction from '../../state/actions/hash-changed-action';
import RouterBuilder from '../../router/router-builder';

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

    window.devMode = true;
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
        this._previousPage = new FileListPage(this.rootElement, stateManager, properties);
      },
    };

    const routerBuilder = new RouterBuilder();

    const router = routerBuilder
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

    // router.onHashChanged(
//   }
//
// )
//   ;
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
