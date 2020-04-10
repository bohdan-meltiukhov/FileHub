import ApiService from '../../../app/services/api-service';
import UserCredentials from '../../../app/models/user-credentials';

const {module, test} = QUnit;

module('The ApiService test');

test('should log in.', async function(assert) {
  const apiService = new ApiService();
  const userCredentials = new UserCredentials('admin', '1234');

  const callback = async function() {
    assert.step('Logged in.');
  };

  apiService.logIn(userCredentials)
    .then(callback);

  await callback;
  assert.verifySteps(['Logged in.'], 'The API service should log in with valid credentials.');
});

test('should register.', async function(assert) {
  const apiService = new ApiService();
  const userCredentials = new UserCredentials('user', 'password1234');

  const callback = async function() {
    assert.step('Registered.');
  };

  apiService.register(userCredentials)
    .then(callback);

  await callback;
  assert.verifySteps(['Registered.'], 'The API service should register with valid credentials.');
});
