import ApiService from '../../../app/services/api-service';
import UserCredentials from '../../../app/models/user-credentials';

const {module, test} = QUnit;

module('The ApiService');

test('should log in.', (assert) => {
  const fetchMock = (url, options) => {
    return new Promise((resolve) => {
      if (url === '/login' && options.method === 'POST') {
        assert.step('Log In fetch called.');
      }
      const response = {
        status: 200,
      };
      resolve(response);
    });
  };

  const apiService = new ApiService(fetchMock);
  const userCredentials = new UserCredentials('admin', '1234');

  apiService.logIn(userCredentials);

  assert.verifySteps(['Fetch called.'], 'The API service should call the fetch function.');
});

test('should register.', (assert) => {
  const fetchMock = (url, options) => {
    return new Promise((resolve) => {
      if (url === '/register' && options.method === 'POST') {
        assert.step('Register fetch called.');
      }
      const response = {
        status: 200,
      };
      resolve(response);
    });
  };

  const apiService = new ApiService(fetchMock);
  const userCredentials = new UserCredentials('user', 'password1234');

  apiService.register(userCredentials);

  assert.verifySteps(['Register fetch called.'], 'The API service should call the fetch function.');
});
