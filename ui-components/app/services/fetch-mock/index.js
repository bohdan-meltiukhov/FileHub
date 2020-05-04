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
    FetchMock._putFolder();
    FetchMock._putFile();
    FetchMock._createFolder();
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
    fetchMock.get('express:/folder/:folderId/content', (url) => {
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
    fetchMock.get('express:/folder/:folderId', (url) => {
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
   * Sets a mock for the put folder request.
   *
   * @private
   */
  static _putFolder() {
    fetchMock.put('express:/folder/:folderId', (url, options) => {
      const id = url.slice(8);
      const index = FileSystem.folders.findIndex((folder) => {
        if (folder.id === id) {
          return true;
        }
      });

      if (index === -1) {
        return 404;
      }

      FileSystem.folders[index] = options.body.element;
      return FileSystem.folders[index];
    });
  }

  /**
   * Sets a mock for the put file request.
   *
   * @private
   */
  static _putFile() {
    fetchMock.put('express:/file/:fileId', (url, options) => {
      const id = url.slice(6);

      const index = FileSystem.files.findIndex((file) => {
        if (file.id === id) {
          return true;
        }
      });

      if (index === -1) {
        return 404;
      }

      FileSystem.files[index] = options.body.element;
      return FileSystem.files[index];
    });
  }

  /**
   * Sets a mock for the create folder request.
   *
   * @private
   */
  static _createFolder() {
    fetchMock.post('express:/folder/:folderId/folder', (url) => {
      const id = url.slice(8, url.lastIndexOf('/folder'));

      const parentFolder = FileSystem.folders.find((folder) => {
        if (folder.id === id) {
          return true;
        }
      });

      if (!parentFolder) {
        return 404;
      }

      const childFolders = FileSystem.folders.filter((folder) => {
        if (folder.parentId === id) {
          return true;
        }
      });

      const childFolderNames = childFolders.map((folder) => folder.name);
      let name = '';
      if (childFolderNames.includes('New folder')) {
        for (let i = 2; ; i++) {
          if (!childFolderNames.includes(`New folder (${i})`)) {
            name = `New folder (${i})`;
            break;
          }
        }
      } else {
        name = 'New folder';
      }
      const folder = {
        id: FetchMock._generateRandomId(16),
        parentId: id,
        name,
        itemsNumber: 0,
        type: 'folder',
      };
      FileSystem.folders.push(folder);
      return folder;
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
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  }
}
