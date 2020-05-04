import RegistrationForm from '../../../app/components/registration-form';

const {module, test} = QUnit;

let fixture;

module('The RegistrationForm test', {
  beforeEach: function() {
    fixture = document.getElementById('qunit-fixture');
  },
});

test('should render nested components.', (assert) => {
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

test('should should call the onSubmit function with correct credentials.', async function(assert) {
  const username = 'user123';
  const password = 'qwerty1Q';
  const confirmPassword = 'qwerty1Q';

  const registrationForm = new RegistrationForm(fixture);
  const formElement = fixture.firstElementChild;

  const callback = async function(credentials) {
    assert.step('Callback was called.');
    assert.strictEqual(credentials.username, username, 'The registration form should provide the entered username.');
    assert.strictEqual(credentials.password, password, 'The registration form should provide the entered password.');
  };

  registrationForm.onSubmit(callback);

  const usernameInput = formElement.querySelector('[data-test="login-input"] input');
  usernameInput.value = username;

  const passwordInput = formElement.querySelector('[data-test="password-input"] input');
  passwordInput.value = password;

  const confirmPasswordInput = formElement.querySelector('[data-test="confirm-password-input"] input');
  confirmPasswordInput.value = confirmPassword;

  const submitButton = formElement.querySelector('[data-test="submit-button"] button');
  submitButton.click();

  await callback;
  assert.verifySteps(['Callback was called.'], 'The registration form should should call the onSubmit function ' +
    'when the form is submitted with valid input values.');
});

