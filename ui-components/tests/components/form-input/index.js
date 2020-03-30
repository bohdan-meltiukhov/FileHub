import FormInput from "../../../app/components/form-input";

const {module, test} = QUnit;

let fixture;

module('The FormInput test', {
    beforeEach: function () {
        fixture = document.getElementById('qunit-fixture');
    }
});

test('should have the default properties.', (assert) => {
    new FormInput(fixture);
    const formInput = fixture.firstElementChild;

    const label = formInput.querySelector('.input-label');
    assert.strictEqual(label.innerText, 'Label', 'The form input should have the default label.');

    const input = formInput.querySelector('.input');
    assert.strictEqual(input.placeholder, 'Placeholder', 'The form input should have the default placeholder.');

    assert.strictEqual(input.type, 'text', 'The form input should have the default type.');
});

test('should display the provided properties.', (assert) => {
    const labelText = 'Password';
    const placeholder = 'Enter password';
    const type = 'password';
    new FormInput(fixture, {
        labelText: labelText,
        placeholder: placeholder,
        type: type
    });
    const formInput = fixture.firstElementChild;

    const label = formInput.querySelector('.input-label');
    assert.strictEqual(label.innerText, labelText, 'The form input should display the provided label.');

    const input = formInput.querySelector('.input');
    assert.strictEqual(input.placeholder, placeholder, 'The form input should display the provided placeholder.');

    assert.strictEqual(input.type, type, 'The form input should have the provided type.');
});

test('should change the properties.', (assert) => {
    const labelText = 'New label';
    const placeholder = 'New placeholder';
    const type = 'text';
    const helpText = 'Help text';
    const element = new FormInput(fixture, {
        labelText: 'Old label',
        placeholder: 'Old placeholder',
        type: 'password'
    });
    const formInput = fixture.firstElementChild;

    const label = formInput.querySelector('.input-label');
    element.labelText = labelText;
    assert.strictEqual(label.innerText, labelText, 'The form input should change the label.');

    const input = formInput.querySelector('.input');
    element.placeholder = placeholder;
    assert.strictEqual(input.placeholder, placeholder, 'The form input should change the placeholder.');

    element.type = type;
    assert.strictEqual(input.type, type, 'The form input should change the type.');

    const helpTextElement = formInput.querySelector('.error-message');
    element.helpText = helpText;
    assert.strictEqual(helpTextElement.innerText, helpText, 'The form input should change the help text.')
});

test('should provide the input value.', (assert) => {
    const element = new FormInput(fixture);
    const formInput = fixture.firstElementChild;

    const input = formInput.querySelector('.input');
    const value = 'name@example.com';
    input.value = value;

    assert.strictEqual(element.inputValue, value, 'The form input should provide the input value.')
});
