import Router from '../../app/router.js';
import LoginForm from '../../app/components/login-form';
import RegistrationForm from '../../app/components/registration-form';

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

  const properties = {
    rootElement,
    pageMapping: {
      '/authentication': LoginForm,
      '/registration': RegistrationForm,
    },
    defaultLocation: '/authentication',
    window: windowMock,
  };

  new Router(properties);
  windowMock.location.hash = '#/registration';
  windowMock.dispatchEvent(new Event('hashchange'));
  const registrationPage = rootElement.firstElementChild.getAttribute('data-test');
  assert.strictEqual(registrationPage, 'registration-form', 'The router should open the registration form ' +
    'on the registration location hash.');

  new Router(properties);
  windowMock.location.hash = '#/authentication';
  windowMock.dispatchEvent(new Event('hashchange'));
  const authenticationPage = rootElement.firstElementChild.getAttribute('data-test');
  assert.strictEqual(authenticationPage, 'login-form', 'The router should open the authentication form ' +
    'on the authentication location hash.');
});
