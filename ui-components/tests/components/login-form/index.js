import LoginForm from '../../../app/components/login-form';

const {module, test} = QUnit;

let fixture;

module('The LoginForm test', {
  beforeEach: function() {
    fixture = document.getElementById('qunit-fixture');
  },
});

test('should validate inputs.', (assert) => {
  const element = new LoginForm(fixture);
  const form = fixture.firstElementChild;

  const loginInput = form.querySelector('.login-input .input');
  const loginHelpText = form.querySelector('.login-input .error-message');

  loginInput.value = 'name@example.com';
  element.validateForm();
  assert.strictEqual(loginHelpText.innerText, '', 'The login form should remove the help text when the ' +
    'username is not empty.');

  loginInput.value = '';
  element.validateForm();
  assert.strictEqual(loginHelpText.innerText, 'The username should have 1 or more characters', 'The login form ' +
    'should show the help text when the username is empty.');

  const passwordInput = form.querySelector('.password-input .input');
  const passwordHelpText = form.querySelector('.password-input .error-message');

  passwordInput.value = 'ddnchd683whid';
  element.validateForm();
  assert.strictEqual(passwordHelpText.innerText, '', 'The password form should remove the help text when the ' +
    'username is not empty.');

  passwordInput.value = '';
  element.validateForm();
  assert.strictEqual(passwordHelpText.innerText, 'The password should have 1 or more characters', 'The password ' +
    'form should show the help text when the username is empty.');
});
