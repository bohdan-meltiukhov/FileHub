import ApiService from '../../../app/services/api-service';
import UserCredentials from '../../../app/models/user-credentials';
import fetchMock from '../../../node_modules/fetch-mock/esm/client.js';


const {module, test} = QUnit;

module('The ApiService');

test('should log in.', (assert) => {
  const username = 'admin';
  const password = '1234';

  fetchMock.post('/login', (url, opts) => {
    const credentials = opts.body;
    assert.strictEqual(credentials.username, username, 'The API Service should provide the correct username in the ' +
      'request body.');
    assert.strictEqual(credentials.password, password, 'The API Service should provide the correct password in the ' +
      'request body.');
    return 200;
  });

  const apiService = ApiService.getInstance();
  const userCredentials = new UserCredentials(username, password);

  apiService.logIn(userCredentials);

  assert.ok(fetchMock.called('/login', {
    method: 'POST',
  }), 'The API Service should send the POST request to the \'/login\' URL.');
});

test('should register.', (assert) => {
  const username = 'admin';
  const password = '1234';

  fetchMock.post('/register', (url, opts) => {
    const credentials = opts.body;
    assert.strictEqual(credentials.username, username, 'The API Service should provide the correct username in the ' +
      'request body.');
    assert.strictEqual(credentials.password, password, 'The API Service should provide the correct password in the ' +
      'request body.');
    return 200;
  });

  const apiService = ApiService.getInstance();
  const userCredentials = new UserCredentials(username, password);

  apiService.register(userCredentials);

  assert.ok(fetchMock.called('/register', {
    method: 'POST',
  }), 'The API Service should send the POST request to the \'/register\' URL.');
});
