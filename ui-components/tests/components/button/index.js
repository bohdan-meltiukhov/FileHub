import Button from '../../../app/components/button';

const {module, test} = QUnit;

let fixture;

export default module('The Button test', (hooks) => {
  hooks.beforeEach(function() {
    fixture = document.getElementById('qunit-fixture');
  });

  test('should have the default text.', (assert) => {
    new Button(fixture);
    const button = fixture.firstElementChild;
    assert.strictEqual(button.innerText, 'Submit', 'The button should have the default text.');
  });

  test('should display the provided text.', (assert) => {
    const buttonText = 'OK';
    new Button(fixture, {buttonText});
    const button = fixture.firstElementChild;
    assert.strictEqual(button.innerText, buttonText, 'The button should display the provided text.');
  });

  test('should handle click.', (assert) => {
    const component = new Button(fixture);
    component.addClickHandler(() => {
      assert.step('Click was called');
    });
    const button = fixture.firstElementChild;
    button.click();
    assert.verifySteps(['Click was called'], 'The button should add a click handler.');
  });
});
