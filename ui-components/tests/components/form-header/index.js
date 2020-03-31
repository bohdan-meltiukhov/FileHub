import FormHeader from '../../../app/components/form-header';

const {module, test} = QUnit;

let fixture;

module('The FormHeader test', {
  beforeEach: function() {
    fixture = document.getElementById('qunit-fixture');
  },
});

test('should have the default text.', (assert) => {
  new FormHeader(fixture);
  const header = fixture.firstElementChild;
  assert.strictEqual(header.innerText, 'Header', 'The header should have the default text.');
});

test('should display the provided text.', (assert) => {
  const text = 'OK';
  new FormHeader(fixture, {text});
  const header = fixture.firstElementChild;
  assert.strictEqual(header.innerText, text, 'The header should display the provided text.');
});

test('should change the text.', (assert) => {
  const text = 'New text';
  const element = new FormHeader(fixture, {text: 'Initial text'});
  element.text = text;
  const header = fixture.firstElementChild;
  assert.strictEqual(header.innerText, text, 'The header should change the text.');
});
