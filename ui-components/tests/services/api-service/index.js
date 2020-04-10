import ApiService from '../../../app/services/api-service';
import UserCredentials from '../../../app/models/user-credentials';

const {module, test} = QUnit;

module('The ApiService test');

test('should log in.', (assert) => {
  const apiService = ApiService.getInstance();
  const userCredentials = new UserCredentials('admin', '1234');

  apiService.logIn(userCredentials)
    .then(() => {
      assert.step('Logged in.');
    });

  assert.timeout(500);
  const done = assert.async();
  setTimeout(() => {
    assert.verifySteps(['Logged in.'], 'The API service should log in with valid credentials.');
    done();
  }, 100);
});

test('should register.', (assert) => {
  const apiService = ApiService.getInstance();
  const userCredentials = new UserCredentials('user', 'password1234');

  apiService.register(userCredentials)
    .then(() => {
      assert.step('Registered.');
    });

  assert.timeout(500);
  const done = assert.async();
  setTimeout(() => {
    assert.verifySteps(['Registered.'], 'The API service should register with valid credentials.');
    done();
  }, 100);
});
