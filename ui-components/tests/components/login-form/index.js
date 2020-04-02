import LoginForm from '../../../app/components/login-form';

const {module, test} = QUnit;

module('The LoginForm test');

test('should render nested components.', (assert) => {
  const fixture = document.getElementById('qunit-fixture');

  new LoginForm(fixture);
  const formElement = fixture.firstElementChild;

  const loginInput = formElement.querySelector('[data-test="login-input"]');
  assert.ok(loginInput, 'The login form should render the username input.');

  const passwordInput = formElement.querySelector('[data-test="password-input"]');
  assert.ok(passwordInput, 'The login form should render the password input.');

  const submitButton = formElement.querySelector('[data-test="submit-button"]');
  assert.ok(submitButton, 'The login form should render the submit button.');
});
