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
    FetchMock._postLogin();
    FetchMock._postRegister();
    FetchMock._getFiles();
    FetchMock._getFolder();
    FetchMock._uploadFile();
  }

  /**
   * Sets a mock for the login request.
   *
   * @private
   */
  static _postLogin() {
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
  static _postRegister() {
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
  static _getFiles() {
    fetchMock.get('glob:/folder/*/content', (url) => {
      const id = url.slice(8, url.indexOf('/content'));

      const parentFolder = FileSystem.folders.find((folder) => {
        if (folder.id === id) {
          return true;
        }
      });

      if (!parentFolder) {
        return 404;
      }

      const folders = FileSystem.folders.filter((folder) => folder.parentId === id);
      const files = FileSystem.files.filter((file) => file.parentId === id);
      const content = folders.concat(files);

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
   * Sets a mock for the folder request.
   *
   * @private
   */
  static _getFolder() {
    fetchMock.get('glob:/folder/*', (url) => {
      const id = url.slice(8);

      const folder = FileSystem.folders.find((folder) => {
        if (folder.id === id) {
          return true;
        }
      });

      if (!folder) {
        return 404;
      }

      return {
        body: {
          folder,
        },
      };
    }, {
      delay: 500,
    });
  }

  /**
   * Sets a mock for the upload file request.
   *
   * @private
   */
  static _uploadFile() {
    fetchMock.post('glob:/folder/*/file', (url, options) => {
      const id = url.slice(8, url.indexOf('/file'));
      const file = options.body.get('file');
      const fileItem = {
        id: FetchMock._generateRandomId(16),
        parentId: id,
        name: file.name,
        mimeType: FetchMock._getMimeType(file),
        size: file.size,
        type: 'file',
      };

      FileSystem.files.push(fileItem);

      return fileItem;
    });
  }

  /**
   * Generates a random string identified.
   *
   * @param {number} length - The length of the required string.
   * @returns {string} The generated string.
   * @private
   */
  static _generateRandomId(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    let result = '';
    for (let i = 0; i < length; i++) {
      result += Math.floor(Math.random() * characters.length);
    }
    return result;
  }

  /**
   * Gets a mime type from the file type.
   *
   * @param {File} file - The uploaded file.
   * @returns {string} The mime type of the file.
   * @private
   */
  static _getMimeType(file) {
    if (file.type.startsWith('image')) {
      return 'image';
    } else if (file.type === 'application/pdf') {
      return 'book';
    } else if (file.type.startsWith('video')) {
      return 'video';
    } else if (file.type.startsWith('audio')) {
      return 'audio';
    } else if (file.type === 'application/vnd.ms-excel') {
      return 'stylesheet';
    } else {
      return 'other';
    }
  }
}
