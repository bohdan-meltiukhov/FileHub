import FormFooter from '../../../app/components/login-form-footer';

const {module, test} = QUnit;

let fixture;

module('The FormFooter test', {
  beforeEach: function() {
    fixture = document.getElementById('qunit-fixture');
  },
});

test('should have the default properties.', (assert) => {
  new FormFooter(fixture);
  const footer = fixture.firstElementChild;

  const button = footer.querySelector('.submit-button .button');
  assert.strictEqual(button.innerText, 'Submit', 'The footer should have the default button text.');

  const link = footer.querySelector('.form-link');
  assert.strictEqual(link.innerText, 'Take me to another page', 'The footer should have the default link text.');

  assert.ok(link.href.endsWith('#'), 'The footer should have the default link URL.');
});

test('should display the provided properties.', (assert) => {
  const buttonText = 'OK';
  const linkText = 'Don\'t have an account yet?';
  const linkUrl = 'registration.html';

  new FormFooter(fixture, {
    buttonText,
    linkText,
    linkUrl,
  });
  const footer = fixture.firstElementChild;

  const button = footer.querySelector('.submit-button .button');
  assert.strictEqual(button.innerText, buttonText, 'The footer should display the provided button text.');

  const link = footer.querySelector('.form-link');
  assert.strictEqual(link.innerText, linkText, 'The footer should display the provided link text.');

  assert.ok(link.href.endsWith(linkUrl), 'The footer should have the provided link URL.');
});

test('should change the properties.', (assert) => {
  const buttonText = 'New button text';
  const linkText = 'New link text';
  const linkUrl = 'new-url.html';

  const element = new FormFooter(fixture, {
    buttonText: 'Old button text',
    linkText: 'Old link text',
    linkUrl: 'old-url.html',
  });
  const footer = fixture.firstElementChild;

  const button = footer.querySelector('.submit-button .button');
  element.buttonText = buttonText;
  assert.strictEqual(button.innerText, buttonText, 'The footer should change the button text.');

  const link = footer.querySelector('.form-link');
  element.linkText = linkText;
  assert.strictEqual(link.innerText, linkText, 'The footer should change the link text.');

  element.linkUrl = linkUrl;
  assert.ok(link.href.endsWith(linkUrl), 'The footer should change the link URL.');
});
