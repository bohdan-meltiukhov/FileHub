import LoginPage from '../../../app/components/login-page';

const {module, test} = QUnit;

module('The LoginPage test');

test('should initialize nested components.', (assert) => {
  const fixture = document.getElementById('qunit-fixture');

  new LoginPage(fixture);

  const loginPage = fixture.firstElementChild;

  const loinForm = loginPage.querySelector('[data-test="login-form"]');
  assert.ok(loinForm, 'The login page should initialize the login form.');
});

