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

test('should update folders.', (assert) => {
  assert.expect(3);

  const folder = {
    id: 'uExvhDL4YwkxnBVa',
    parentId: '4Goz0J0Tz8xfDfsJ',
    name: 'Documents',
    itemsNumber: 20,
    type: 'folder',
  };

  fetchMock.put('glob:/folder/*', (url, opts) => {
    const id = url.slice(8);

    assert.strictEqual(id, folder.id, 'The updateFolder() method should send a request with correct folder id.');
    assert.deepEqual(opts.body.element, folder, 'The updateFolder() method should send a request with correct ' +
      'folder object.');
  });

  const apiService = ApiService.getInstance();
  apiService.updateFolder(folder);

  assert.ok(fetchMock.called('glob:/folder/*', {
    method: 'PUT',
  }), 'The updateFolder() method should send a PUT request to the \'/folder/:id\' URL.');
});

test('should update files.', (assert) => {
  assert.expect(3);

  const file = {
    id: 'ARqTPQ1XXUrFlaJe',
    parentId: 'tRZXiSHNRlgZluGQ',
    name: 'Montenegro.jpg',
    mimeType: 'image',
    size: 162,
    type: 'file',
  };

  fetchMock.put('glob:/file/*', (url, opts) => {
    const id = url.slice(6);

    assert.strictEqual(id, file.id, 'The updateFile() method should send a request with correct file id.');
    assert.deepEqual(opts.body.element, file, 'The updateFile() method should send a request with correct ' +
      'file object.');
  });

  const apiService = ApiService.getInstance();
  apiService.updateFile(file);

  assert.ok(fetchMock.called('glob:/file/*', {
    method: 'PUT',
  }), 'The updateFile() method should send a PUT request to the \'/file/:id\' URL.');
});
