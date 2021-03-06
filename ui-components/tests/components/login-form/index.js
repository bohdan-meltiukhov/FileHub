import LoginForm from '../../../app/components/login-form';

const {module, test} = QUnit;

let fixture;

export default module('The LoginForm test', (hooks) => {
  hooks.beforeEach(function() {
    fixture = document.getElementById('qunit-fixture');
  });

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

  test('should should call the onSubmit function with correct credentials.', async function(assert) {
    const username = 'admin';
    const password = '1234';

    const loginForm = new LoginForm(fixture);
    const formElement = fixture.firstElementChild;

    const callback = async function(credentials) {
      assert.step('Callback was called.');
      assert.strictEqual(credentials.username, username, 'The login form should provide the entered username.');
      assert.strictEqual(credentials.password, password, 'The login form should provide the entered password.');
    };

    loginForm.onSubmit(callback);

    const usernameInput = formElement.querySelector('[data-test="login-input"] input');
    usernameInput.value = username;

    const passwordInput = formElement.querySelector('[data-test="password-input"] input');
    passwordInput.value = password;

    const submitButton = formElement.querySelector('[data-test="submit-button"] button');
    submitButton.click();

    await callback;
    assert.verifySteps(['Callback was called.'], 'The login form should should call the onSubmit function ' +
      'when the form is submitted with valid input values.');
  });
});
