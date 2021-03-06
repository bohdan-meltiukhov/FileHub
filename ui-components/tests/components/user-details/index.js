import UserDetails from '../../../app/components/user-details';

const {module, test} = QUnit;

let fixture;

export default module('The UserDetails', (hooks) => {
  hooks.beforeEach(() => {
    fixture = document.getElementById('qunit-fixture');
  });

  test('should have the default name.', (assert) => {
    new UserDetails(fixture);
    const userDetails = fixture.querySelector('[data-test="user-details"]');

    assert.strictEqual(userDetails.innerText, 'User', 'The UserDetails component should display the default user ' +
      'name in case no name was provided.');
  });

  test('should display the provided name.', (assert) => {
    const username = 'Bob';

    new UserDetails(fixture, {username});
    const userDetails = fixture.querySelector('[data-test="user-details"]');

    assert.strictEqual(userDetails.innerText, username, 'The UserDetails component should display the provided name.');
  });

  test('should change the name.', async (assert) => {
    const username = 'Bob';

    const userDetailsComponent = new UserDetails(fixture, {username: 'Alice'});
    userDetailsComponent.username = username;
    const userDetailsElement = fixture.querySelector('[data-test="user-details"]');
    assert.strictEqual(userDetailsElement.innerText, username, 'The UserDetails component should change the user ' +
      'name correctly.');
  });

  test('should toggle the loading state.', (assert) => {
    const username = 'Peter';

    const userDetailsComponent = new UserDetails(fixture, {username});

    userDetailsComponent.isLoading = true;
    let userDetailsElement = fixture.querySelector('[data-test="user-details"]');

    assert.strictEqual(userDetailsElement.innerText, 'Loading...', 'The UserDetails component should show the ' +
      'loading message when the isLoading flag is set to true.');

    userDetailsComponent.isLoading = false;
    userDetailsElement = fixture.querySelector('[data-test="user-details"]');

    assert.strictEqual(userDetailsElement.innerText, username, 'The UserDetails component should should the user ' +
      'name when the isLoading flag is set to false.');
  });
});
