import LoginForm from "../../../app/components/login-form";

const {module, test} = QUnit;

let fixture;

module('The LoginForm test', {
    beforeEach: function () {
        fixture = document.getElementById('qunit-fixture');
    }
});

test('should check inputs.', (assert) => {
    const element = new LoginForm(fixture);
    const form = fixture.firstElementChild;

    const loginInput = form.querySelector('.login-input .input');
    const loginHelpText = form.querySelector('.login-input .error-message');

    loginInput.value = 'name@example.com';
    element.checkInputs();
    assert.strictEqual(loginHelpText.innerText, '', 'The login form should remove the help text when the ' +
        'username is not empty.');

    loginInput.value = '';
    element.checkInputs();
    assert.strictEqual(loginHelpText.innerText, 'Username can\'t be empty', 'The login form should show the help ' +
        'text when the username is empty.');

    const passwordInput = form.querySelector('.password-input .input');
    const passwordHelpText = form.querySelector('.password-input .error-message');

    passwordInput.value = 'ddnchd683whid';
    element.checkInputs();
    assert.strictEqual(passwordHelpText.innerText, '', 'The password form should remove the help text when the ' +
        'username is not empty.');

    passwordInput.value = '';
    element.checkInputs();
    assert.strictEqual(passwordHelpText.innerText, 'Password can\'t be empty', 'The password form should show the help ' +
        'text when the username is empty.')
});
