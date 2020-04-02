import RegistrationForm from '../../../app/components/registration-form';

const {module, test} = QUnit;

module('The RegistrationForm test');

test('should render nested components.', (assert) => {
  const fixture = document.getElementById('qunit-fixture');

  new RegistrationForm(fixture);
  const formElement = fixture.firstElementChild;

  const loginInput = formElement.querySelector('[data-test="login-input"]');
  assert.ok(loginInput, 'The registration form should render the username input.');

  const passwordInput = formElement.querySelector('[data-test="password-input"]');
  assert.ok(passwordInput, 'The registration form should render the password input.');

  const confirmPasswordInput = formElement.querySelector('[data-test="confirm-password-input"]');
  assert.ok(confirmPasswordInput, 'The registration form should render the confirm password input.');

  const submitButton = formElement.querySelector('[data-test="submit-button"]');
  assert.ok(submitButton, 'The registration form should render the submit button.');
});
