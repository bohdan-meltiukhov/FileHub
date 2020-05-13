import ApiService from '../../../app/services/api-service';
import UserCredentials from '../../../app/models/user-credentials';
import fetchMock from '../../../node_modules/fetch-mock/esm/client.js';
import AuthorizationError from '../../../app/models/errors/authorization-error';
import ServerValidationError from '../../../app/models/errors/server-validation-error';
import GeneralServerError from '../../../app/models/errors/general-server-error';

const {module, test} = QUnit;

module('The ApiService', {
  afterEach: () => {
    fetchMock.reset();
  },
});

test('should log in.', (assert) => {
  assert.expect(3);

  const username = 'admin';
  const password = '1234';

  const apiService = ApiService.getInstance();
  const userCredentials = new UserCredentials(username, password);

  fetchMock.post('/login', (url, opts) => {
    const credentials = opts.body;
    assert.strictEqual(credentials.username, username, 'The login() method should provide the correct username in ' +
      'the request body.');
    assert.strictEqual(credentials.password, password, 'The login() method should provide the correct password in ' +
      'the request body.');
    return 200;
  });

  apiService.logIn(userCredentials);

  assert.ok(fetchMock.called('/login', {
    method: 'POST',
  }), 'The API Service should send the POST request to the \'/login\' URL.');
});

test('should register.', (assert) => {
  assert.expect(3);

  const username = 'admin';
  const password = '1234';

  const apiService = ApiService.getInstance();
  const userCredentials = new UserCredentials(username, password);

  fetchMock.post('/register', (url, opts) => {
    const credentials = opts.body;
    assert.strictEqual(credentials.username, username, 'The register() method should provide the correct username in ' +
      'the request body.');
    assert.strictEqual(credentials.password, password, 'The register() method should provide the correct password in ' +
      'the request body.');
    return 200;
  });

  apiService.register(userCredentials);

  assert.ok(fetchMock.called('/register', {
    method: 'POST',
  }), 'The API Service should send the POST request to the \'/register\' URL.');
});

test('should handle the 401 error.', async (assert) => {
  assert.expect(6);

  const apiService = ApiService.getInstance();
  const userCredentials = new UserCredentials('admin', '1234');

  fetchMock.post('/login', 401);

  try {
    await apiService.logIn(userCredentials);
  } catch (e) {
    assert.ok(e instanceof AuthorizationError, 'The login() method should throw an AuthorizationError ' +
      'if the response status is 401.');
    assert.strictEqual(e.message, 'The username or password is incorrect', 'The login() method should describe ' +
      'the issue correctly.');
  }

  fetchMock.post('/register', 401);

  try {
    await apiService.register(userCredentials);
  } catch (e) {
    assert.ok(e instanceof AuthorizationError, 'The register() method should throw an AuthorizationError ' +
      'if the response status is 401.');
    assert.strictEqual(e.message, 'The username or password is incorrect', 'The register() method should describe ' +
      'the issue correctly.');
  }

  const folderId = 'root';
  fetchMock.get(`/folder/${folderId}/content`, 401);

  assert.rejects(
    apiService.getFiles(folderId),
    AuthorizationError,
    'The getFiles() method should throw an AuthorizationError if the response status is 401.',
  );

  fetchMock.get(`/folder/${folderId}`, 401);

  assert.rejects(
    apiService.getFolder(folderId),
    AuthorizationError,
    'The getFolder() method should throw an AuthorizationError if the response status is 401',
  );
});

test('should handle the 422 error.', async (assert) => {
  assert.expect(6);

  const apiService = ApiService.getInstance();
  const userCredentials = new UserCredentials('admin', '1234');

  const error = {
    field: 'username',
    message: 'The username is already taken.',
  };

  fetchMock.post(/^\/(login|register)$/, {
    status: 422,
    body: {
      errors: [
        error,
      ],
    },
  });

  try {
    await apiService.logIn(userCredentials);
  } catch (e) {
    assert.ok(e instanceof ServerValidationError, 'The login() method should throw a ServerValidationError ' +
      'if the response status is 422.');

    assert.strictEqual(e.errorCases[0].field, error.field, 'The login() method should provide the correct error ' +
      'field.');
    assert.strictEqual(e.errorCases[0].message, error.message, 'The login() method should provide the correct error ' +
      'message.');
  }

  try {
    await apiService.register(userCredentials);
  } catch (e) {
    assert.ok(e instanceof ServerValidationError, 'The register() method should throw a ServerValidationError ' +
      'if the response status is 422.');

    assert.strictEqual(e.errorCases[0].field, error.field, 'The register() method should provide the correct error ' +
      'field.');
    assert.strictEqual(e.errorCases[0].message, error.message, 'The register() method should provide the correct ' +
      'error message.');
  }
});

test('should handle the 500 error.', async (assert) => {
  assert.expect(6);

  fetchMock.post(/^\/(login|register)$/, 500);

  const apiService = ApiService.getInstance();
  const userCredentials = new UserCredentials('admin', '1234');

  try {
    await apiService.logIn(userCredentials);
  } catch (e) {
    assert.ok(e instanceof GeneralServerError, 'The login() method should throw a GeneralServerError if the response ' +
      'status is 500');
    assert.strictEqual(e.message, 'Internal server error', 'The login() method should describe the issue correctly.');
  }

  try {
    await apiService.register(userCredentials);
  } catch (e) {
    assert.ok(e instanceof GeneralServerError, 'The register() method should throw a GeneralServerError if ' +
      'the response status is 500');
    assert.strictEqual(e.message, 'Internal server error', 'The register() method should describe the issue ' +
      'correctly.');
  }

  const folderId = 'root';
  fetchMock.get(`/folder/${folderId}/content`, 500);

  assert.rejects(
    apiService.getFiles(folderId),
    GeneralServerError,
    'The getFiles() method should throw a GeneralServerError if the response status is 500.',
  );

  fetchMock.get(`/folder/${folderId}`, 500);

  assert.rejects(
    apiService.getFolder(folderId),
    GeneralServerError,
    'The getFolder() method should throw a GeneralServerError if the response status is 500',
  );
});

test('should get files.', async (assert) => {
  assert.expect(2);

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

  fetchMock.get(`/folder/${folderId}/content`, content);

  const apiService = ApiService.getInstance();
  const files = await apiService.getFiles(folderId);

  assert.deepEqual(files, content, 'The getFiles() method should provide correct files.');

  assert.ok(fetchMock.called(`/folder/${folderId}/content`, {
    method: 'GET',
  }), 'The getFiles() method should send a GET request to the \'/folder/:id/content\' URL.');
});

test('should get a folder.', async (assert) => {
  assert.expect(2);

  const folderId = 'uExvhDL4YwkxnBVa';

  const folder = {
    id: 'uExvhDL4YwkxnBVa',
    parentId: '4Goz0J0Tz8xfDfsJ',
    name: 'Documents',
    itemsNumber: 20,
    type: 'folder',
  };

  fetchMock.get(`/folder/${folderId}`, folder);

  const apiService = ApiService.getInstance();
  const response = await apiService.getFolder(folderId);

  assert.deepEqual(response, folder, 'The getFolder() method should provide the correct folder.');

  assert.ok(fetchMock.called(`/folder/${folderId}`, {
    method: 'GET',
  }), 'The getFolder() method should send a GET request to the \'/folder/:id\' URL.');
});

test('should update folders.', (assert) => {
  assert.expect(2);

  const folder = {
    id: 'uExvhDL4YwkxnBVa',
    parentId: '4Goz0J0Tz8xfDfsJ',
    name: 'Documents',
    itemsNumber: 20,
    type: 'folder',
  };

  fetchMock.put(`/folder/${folder.id}`, (url, opts) => {
    assert.deepEqual(opts.body.element, folder, 'The updateFolder() method should send a request with correct ' +
      'folder object.');

    return 200;
  });

  const apiService = ApiService.getInstance();
  apiService.updateFolder(folder);

  assert.ok(fetchMock.called(`/folder/${folder.id}`, {
    method: 'PUT',
  }), 'The updateFolder() method should send a PUT request to the \'/folder/:folderId\' URL.');
});

test('should update files.', (assert) => {
  assert.expect(2);

  const file = {
    id: 'ARqTPQ1XXUrFlaJe',
    parentId: 'tRZXiSHNRlgZluGQ',
    name: 'Montenegro.jpg',
    mimeType: 'image',
    size: 162,
    type: 'file',
  };

  fetchMock.put(`/file/${file.id}`, (url, opts) => {
    assert.deepEqual(opts.body.element, file, 'The updateFile() method should send a request with correct ' +
      'file object.');

    return 200;
  });

  const apiService = ApiService.getInstance();
  apiService.updateFile(file);

  assert.ok(fetchMock.called(`/file/${file.id}`, {
    method: 'PUT',
  }), 'The updateFile() method should send a PUT request to the \'/file/:fileId\' URL.');
});

test('should delete folders.', (assert) => {
  assert.expect(2);

  const id = 'uExvhDL4YwkxnBVa';

  fetchMock.delete(`/folder/${id}`, (url) => {
    const folderId = url.slice(8);
    assert.strictEqual(folderId, id, 'The deleteFolder() method should provide the correct folder id to the server.');
    return 200;
  });

  const apiService = ApiService.getInstance();
  apiService.deleteFolder(id);

  assert.ok(fetchMock.called(`/folder/${id}`, {
    method: 'DELETE',
  }), 'The deleteFolder() method should send a DELETE request to the \'/folder/:id\' URL.');
});

test('should delete files.', (assert) => {
  assert.expect(2);

  const id = 'ARqTPQ1XXUrFlaJe';

  fetchMock.delete(`/file/${id}`, (url) => {
    const folderId = url.slice(6);
    assert.strictEqual(folderId, id, 'The deleteFile() method should provide the correct file id to the server.');
    return 200;
  });

  const apiService = ApiService.getInstance();
  apiService.deleteFile(id);

  assert.ok(fetchMock.called(`/file/${id}`, {
    method: 'DELETE',
  }), 'The deleteFile() method should send a DELETE request to the \'/file/:id\' URL.');
});
