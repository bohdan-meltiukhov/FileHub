import RegistrationPage from '../../../app/components/registration-page';

const {module, test} = QUnit;

module('The RegistrationPage test');

test('should initialize nested components.', (assert) => {
  const fixture = document.getElementById('qunit-fixture');

  new RegistrationPage(fixture);

  const loginPage = fixture.firstElementChild;

  const loinForm = loginPage.querySelector('[data-test="registration-form"]');
  assert.ok(loinForm, 'The registration page should initialize the registration form.');
});

