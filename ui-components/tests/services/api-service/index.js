import ApiService from '../../../app/services/api-service';
import UserCredentials from '../../../app/models/user-credentials';
import fetchMock from '../../../node_modules/fetch-mock/esm/client.js';

const {module, test} = QUnit;

module('The ApiService');

test('should log in.', (assert) => {
  assert.expect(3);

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
  assert.expect(3);

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

test('should get files.', async (assert) => {
  assert.expect(3);

  const folderId = '4Goz0J0Tz8xfDfsJ';

  const content = [
    {
      id: 'uExvhDL4YwkxnBVa',
      parentId: '4Goz0J0Tz8xfDfsJ',
      name: 'Documents',
      itemsNumber: 20,
      type: 'folder',
    },
    {
      id: 'tRZXiSHNRlgZluGQ',
      parentId: '4Goz0J0Tz8xfDfsJ',
      name: 'Images',
      itemsNumber: 20,
      type: 'folder',
    },
    {
      id: 'ARqTPQ1XXUrFlaJe',
      parentId: 'tRZXiSHNRlgZluGQ',
      name: 'Montenegro.jpg',
      mimeType: 'image',
      size: 162,
      type: 'file',
    },
  ];

  fetchMock.get('glob:/folder/*/content', (url) => {
    const id = url.slice(8, url.indexOf('/content'));

    assert.strictEqual(id, folderId, 'The getFiles() method should send the files request with correct folder id.');

    return content;
  });

  const apiService = ApiService.getInstance();
  const files = await apiService.getFiles(folderId);

  assert.deepEqual(files, content, 'The getFiles() method should provide correct files.');

  assert.ok(fetchMock.called('glob:/folder/*', {
    method: 'GET',
  }), 'The getFiles() method should send a GET request to the \'/folder/:id/content\' URL.');
});

test('should get a folder.', async (assert) => {
  assert.expect(3);

  const folderId = 'uExvhDL4YwkxnBVa';

  const folder = {
    id: 'uExvhDL4YwkxnBVa',
    parentId: '4Goz0J0Tz8xfDfsJ',
    name: 'Documents',
    itemsNumber: 20,
    type: 'folder',
  };

  fetchMock.get('glob:/folder/*', (url) => {
    const id = url.slice(8);

    assert.strictEqual(id, folderId, 'The getFolder() method should send the folder request with correct folder id.');

    return folder;
  });

  const apiService = ApiService.getInstance();
  const response = await apiService.getFolder(folderId);

  assert.deepEqual(response, folder, 'The getFolder() method should provide the correct folder.');

  assert.ok(fetchMock.called('glob:/folder/*', {
    method: 'GET',
  }), 'The getFolder() method should send a GET request to the \'/folder/:id\' URL.');
});

test('should upload files.', (assert) => {
  const folderId = 'tRZXiSHNRlgZluGQ';

  const formData = new FormData();

  fetchMock.post('glob:/folder/*/file', (url, opts) => {
    const providedId = url.slice(8, url.indexOf('/file'));

    assert.strictEqual(providedId, folderId, 'The uploadFile() method should send a request with correct folder id.');

    const uploadedFile = opts.body;

    assert.strictEqual(uploadedFile, formData, 'The uploadFile() method should send a request with correct formData.');

    return 200;
  });

  const apiService = ApiService.getInstance();
  apiService.uploadFile(folderId, formData);

  assert.ok(fetchMock.called('glob:/folder/*/file', {
    method: 'POST',
  }), 'The uploadFile() method should send a POST request to the \'/folder/:id/file\' URL.');
});
