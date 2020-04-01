import LoginForm from '../../../app/components/login-form';

const {module, test} = QUnit;

let fixture;

module('The LoginForm test', {
  beforeEach: function() {
    fixture = document.getElementById('qunit-fixture');
  },
});

test('should should call the onSubmit function with correct credentials.', async function(assert) {
  const username = 'admin';
  const password = '1234';

  const loginForm = new LoginForm(fixture);
  const formElement = fixture.firstElementChild;

  const callback = async function(credentials) {
    assert.step('Callback was called.');
    assert.strictEqual(credentials.username, username, 'The login form should provide the entered username.');
    assert.strictEqual(credentials.password, password, 'The login form should provide the entered pasword.');
  };

  loginForm.onSubmit(callback);

  const usernameInput = formElement.querySelector('.login-input .input');
  usernameInput.value = username;

  const passwordInput = formElement.querySelector('.password-input .input');
  passwordInput.value = password;

  const submitButton = formElement.querySelector('.login-form-footer .button');
  submitButton.click();

  await callback;
  assert.verifySteps(['Callback was called.'], 'The login form should should call the onSubmit function ' +
    'when the form is submitted with valid input values.');
});
