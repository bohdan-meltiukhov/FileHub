import fetchMock from '../../../node_modules/fetch-mock/esm/client.js';

const TOKEN = 'my-token';

/**
 * The class for setting the fetch mock.
 */
export default class FetchMock {
  /**
   * Sets mocks for different fetch requests.
   */
  static setMock() {
    FetchMock._setLogin();
    FetchMock._setRegister();
    FetchMock._setFiles();
    FetchMock._setUser();
  }

  /**
   * Sets a mock for the login request.
   *
   * @private
   */
  static _setLogin() {
    fetchMock.post('/login', (url, options) => {
      const credentials = options.body;
      if (credentials.username === 'admin' && credentials.password === '1234') {
        return {token: TOKEN};
      }
      return 401;
    });
  }

  /**
   * Sets a mock for the register request.
   *
   * @private
   */
  static _setRegister() {
    fetchMock.post('/register', (url, options) => {
      const credentials = options.body;
      if (credentials.username === 'admin') {
        return {
          status: 422,
          body: {
            errors: [
              {
                field: 'username',
                message: 'The username is already taken.',
              },
            ],
          },
        };
      } else {
        return 200;
      }
    });
  }

  /**
   * Sets a mock for the files request.
   *
   * @private
   */
  static _setFiles() {
    fetchMock.get('/files', {
      files: [
        {
          name: 'Documents',
          itemsNumber: 20,
          type: 'folder',
        },
        {
          name: 'photo.png',
          mimeType: 'image',
          size: 16,
          type: 'file',
        },
      ],
    }, {
      delay: 500,
    });
  }

  /**
   * Sets a mock for the get user request.
   *
   * @private
   */
  static _setUser() {
    fetchMock.get('/user', (url, opts) => {
      if (opts.headers.Authentication === TOKEN) {
        return {
          body: {
            name: 'John',
          },
        };
      } else {
        return 401;
      }
    });
  }
}
