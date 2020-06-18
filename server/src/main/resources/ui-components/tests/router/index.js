import Router from '../../app/router';
import {AUTHENTICATION_ROUTE, FILE_LIST_ROUTE, REGISTRATION_ROUTE} from '../../app/router/routes';
import LoginPage from '../../app/components/login-page';
import RegistrationPage from '../../app/components/registration-page';
import FileListPage from '../../app/components/file-list-page';
import NotFoundPage from '../../app/components/not-found';
import UrlProperties from '../../app/models/url-properties';
import MessageService from '../../app/services/message-service';

const {module, test} = QUnit;

/**
 * The class for mock objects that act like the window object.
 */
class WindowMock extends EventTarget {
  location = {
    hash: '',
  };
}

export default module('The Router', () => {
  test('should redirect to the default page.', (assert) => {
    const windowMock = new WindowMock();

    const expectedDefaultLocation = '/default';

    const properties = {
      rootElement: document.createElement('div'),
      pageMapping: {
        '/default': function() {
        },
      },
      defaultLocation: expectedDefaultLocation,
      notFoundPage: function() {
      },
      window: windowMock,
    };
    new Router(properties);
    assert.strictEqual(windowMock.location.hash, `#${expectedDefaultLocation}`, 'The Router should redirect to the ' +
      'default location if the initial location is empty.');

    windowMock.location.hash = '';
    windowMock.dispatchEvent(new Event('hashchange'));
    assert.strictEqual(windowMock.location.hash, `#${expectedDefaultLocation}`, 'The Router should redirect to the ' +
      'default location if the hash is changed to empty.');
  });

  test('should render the correct page when the location hash changes.', (assert) => {
    const windowMock = new WindowMock();

    const rootElement = document.createElement('div');

    const stateManager = {
      dispatch: (action) => {
      },
      onStateChanged: () => {
      },
    };

    const urlProperties = new UrlProperties('root');
    const messageService = new MessageService();

    const properties = {
      rootElement,
      pageMapping: {
        [AUTHENTICATION_ROUTE]: () => new LoginPage(rootElement),
        [REGISTRATION_ROUTE]: () => new RegistrationPage(rootElement),
        [FILE_LIST_ROUTE]: () => new FileListPage(rootElement, stateManager, messageService, urlProperties),
      },
      defaultLocation: AUTHENTICATION_ROUTE,
      notFoundPage: function() {
      },
      window: windowMock,
      hashChangedHandler: () => {
      },
    };

    new Router(properties);

    windowMock.location.hash = `#${REGISTRATION_ROUTE}`;
    windowMock.dispatchEvent(new Event('hashchange'));
    const registrationPage = rootElement.firstElementChild.getAttribute('data-test');
    assert.strictEqual(registrationPage, 'registration-page', 'The router should open the registration page ' +
      'on the registration location hash.');

    windowMock.location.hash = `#${AUTHENTICATION_ROUTE}`;
    windowMock.dispatchEvent(new Event('hashchange'));
    const authenticationPage = rootElement.firstElementChild.getAttribute('data-test');
    assert.strictEqual(authenticationPage, 'login-page', 'The router should open the authentication page ' +
      'on the authentication location hash.');

    windowMock.location.hash = `#${FILE_LIST_ROUTE}`;
    windowMock.dispatchEvent(new Event('hashchange'));
    const fileExplorerPage = rootElement.firstElementChild.getAttribute('data-test');
    assert.strictEqual(fileExplorerPage, 'file-list-page', 'The router should open the file list page ' +
      'on the corresponding location hash.');
  });

  test('should show the 404 page in case the route is not registered.', (assert) => {
    const windowMock = new WindowMock();

    const rootElement = document.createElement('div');

    const properties = {
      rootElement,
      pageMapping: {
        '/default': function() {
        },
      },
      defaultLocation: '/default',
      notFoundPage: () => new NotFoundPage(rootElement),
      window: windowMock,
    };

    new Router(properties);

    windowMock.location.hash = '#/random-page';
    windowMock.dispatchEvent(new Event('hashchange'));
    const notFoundPage = rootElement.firstElementChild.getAttribute('data-test');
    assert.strictEqual(notFoundPage, 'not-found', 'The router should open the 404 page in case the opened route is ' +
      'not registered.');
  });

  test('should call the hashChangedHandler.', (assert) => {
    assert.expect(3);

    const windowMock = new WindowMock();
    const rootElement = document.createElement('div');

    const hashChangedHandler = (staticPart) => {
      assert.step(staticPart);
    };

    const properties = {
      rootElement,
      pageMapping: {
        '/first': function() {
        },
        '/second': function() {
        },
      },
      defaultLocation: '/first',
      notFoundPage: function() {
      },
      window: windowMock,
      hashChangedHandler,
    };

    new Router(properties);

    windowMock.location.hash = '#/second';
    windowMock.dispatchEvent(new Event('hashchange'));

    windowMock.location.hash = '#/first';
    windowMock.dispatchEvent(new Event('hashchange'));

    assert.verifySteps([
      '/second',
      '/first',
    ], 'The Router should call the hashChangedHandler with correct static part when the location hash changes.');
  });
});
