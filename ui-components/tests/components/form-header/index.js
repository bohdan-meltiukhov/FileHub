import FormHeader from '../../../app/components/form-header';

const {module, test} = QUnit;

let fixture;

module('The FormHeader test', {
  beforeEach: function() {
    fixture = document.getElementById('qunit-fixture');
  },
});

test('should have the default properties.', (assert) => {
  new FormHeader(fixture);
  const header = fixture.firstElementChild;
  assert.strictEqual(header.innerText, 'Header', 'The header should have the default text.');
  assert.strictEqual(header.querySelector('.glyphicon').style.display, 'none', 'The header should hide the ' +
    'icon by default.');
});

test('should have the provided properties.', (assert) => {
  const headerText = 'OK';
  const withIcon = true;
  new FormHeader(fixture, {headerText, withIcon});
  const header = fixture.firstElementChild;
  assert.strictEqual(header.innerText, headerText, 'The header should display the provided text.');
  assert.strictEqual(header.querySelector('.glyphicon').style.display, 'block', 'The header should display the icon ' +
    'when the corresponding property is true.');
});

test('should change the text.', (assert) => {
  const headerText = 'New text';
  const element = new FormHeader(fixture, {headerText: 'Initial text'});
  element.text = headerText;
  const header = fixture.firstElementChild;
  assert.strictEqual(header.innerText, headerText, 'The header should change the text.');
});
