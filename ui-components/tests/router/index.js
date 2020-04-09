import Router from '../../app/router';
import LoginPage from '../../app/components/login-page';
import RegistrationPage from '../../app/components/registration-page';
import FileListPage from '../../app/components/file-list-page';
import NotFoundPage from '../../app/components/not-found';
import StateManager from '../../app/state/state-manager';
import ApiService from '../../app/services/api-service';

const {module, test} = QUnit;

module('The Router test');

/**
 * The class for mock objects that act like the window object.
 */
class WindowMock extends EventTarget {
  location = {
    hash: '',
  };
}

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

  const stateManager = new StateManager({}, ApiService.getInstance());

  const properties = {
    rootElement,
    pageMapping: {
      '/authentication': () => new LoginPage(rootElement),
      '/registration': () => new RegistrationPage(rootElement),
      '/file-list': () => new FileListPage(rootElement, stateManager),
    },
    defaultLocation: '/authentication',
    notFoundPage: function() {
    },
    window: windowMock,
  };

  new Router(properties);

  windowMock.location.hash = '#/registration';
  windowMock.dispatchEvent(new Event('hashchange'));
  const registrationPage = rootElement.firstElementChild.getAttribute('data-test');
  assert.strictEqual(registrationPage, 'registration-page', 'The router should open the registration page ' +
    'on the registration location hash.');

  windowMock.location.hash = '#/authentication';
  windowMock.dispatchEvent(new Event('hashchange'));
  const authenticationPage = rootElement.firstElementChild.getAttribute('data-test');
  assert.strictEqual(authenticationPage, 'login-page', 'The router should open the authentication page ' +
    'on the authentication location hash.');

  windowMock.location.hash = '#/file-list';
  windowMock.dispatchEvent(new Event('hashchange'));
  const fileExplorerPage = rootElement.firstElementChild.getAttribute('data-test');
  assert.strictEqual(fileExplorerPage, 'file-list-page', 'The router should open the file list page ' +
    'on the corresponding location hash.');
});

test('should show the 404 page in case the route is not registered.', (assert) => {
  const windowMock = new WindowMock();

  const rootElement = document.createElement('div');

  const properties = {
    rootElement: rootElement,
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
