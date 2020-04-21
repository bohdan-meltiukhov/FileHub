import fetchMock from '../../../node_modules/fetch-mock/esm/client.js';
import FileSystem from './file-system';

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
    FetchMock._setDownloadFile();
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
        return {token: 'my-token'};
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
    fetchMock.get('glob:/folder/*/content', (url) => {
      const id = url.slice(8, url.indexOf('/content'));

      const folders = FileSystem.folders.filter((folder) => folder.parentId === id);
      const files = FileSystem.files.filter((file) => file.parentId === id);
      const content = folders.concat(files);

      if (!content) {
        return 404;
      }

      return {
        body: {
          files: content,
        },
      };
    }, {
      delay: 500,
    });
  }

  /**
   * Sets a mock for the get file request.
   */
  static _setDownloadFile() {
    fetchMock.post('glob:/file/*', (url) => {
      const id = url.slice(6);
      const file = FileSystem.files.find((file) => {
        if (file.id === id) {
          return true;
        }
      });
      if (file) {
        return new Blob(['Hello, world!'], {type: 'text/plain'});
      } else {
        return 404;
      }
    }, {sendAsJson: false});
  }
}
