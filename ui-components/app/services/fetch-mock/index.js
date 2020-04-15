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
    FetchMock._setFolder();
    FetchMock._setDeleteFolder();
    FetchMock._setDeleteFile();
    FetchMock._setUpdateFolder();
    FetchMock._setUpdateFile();
    FetchMock._setUploadFile();
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
   * Sets a mock for the folder request.
   *
   * @private
   */
  static _setFolder() {
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
    });
  }

  /**
   * Sets a mock for the delete folder request.
   *
   * @private
   */
  static _setDeleteFolder() {
    fetchMock.delete('glob:/folder/*', (url) => {
      const id = url.slice(8);

      const folder = FileSystem.folders.find((folder) => {
        if (folder.id === id) {
          return true;
        }
      });

      if (!folder) {
        return 404;
      }

      FetchMock._deleteFolder(folder);

      return 200;
    }, {
      delay: 500,
    });
  }

  /**
   * Sets a mock for the delete file request.
   *
   * @private
   */
  static _setDeleteFile() {
    fetchMock.delete('glob:/file/*', (url) => {
      const id = url.slice(6);

      const file = FileSystem.files.find((file) => {
        if (file.id === id) {
          return true;
        }
      });

      if (!file) {
        return 404;
      }

      const index = FileSystem.files.indexOf(file);
      FileSystem.files.splice(index, 1);

      return 200;
    });
  }

  /**
   * The object for describing the folder configurations.
   *
   * @typedef {object} FolderItem
   * @property {string} id - The identifier of the folder.
   * @property {string} parentId - The id of the parent folder.
   * @property {string} name - The name of the folder.
   * @property {number} itemsNumber - The number of items inside.
   * @property {'folder'} type - Shows that this item is a folder.
   */

  /**
   * Sets a mock for the put folder request.
   *
   * @private
   */
  static _setUpdateFolder() {
    fetchMock.put('glob:/folder/*', (url, options) => {
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
  static _setUpdateFile() {
    fetchMock.put('glob:/file/*', (url, options) => {
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
   * Recursively deletes a folder and all its content.
   *
   * @param {FolderItem} folder - The folder to delete.
   * @private
   */
  static _deleteFolder(folder) {
    const childFolders = FileSystem.folders.filter((childFolder) => childFolder.parentId === folder.id);
    childFolders.forEach((childFolder) => {
      FetchMock._deleteFolder(childFolder);
    });

    const files = FileSystem.files.filter((file) => file.parentId === folder.id);
    files.forEach((file) => {
      const index = FileSystem.files.indexOf(file);
      FileSystem.files.splice(index, 1);
    });

    const index = FileSystem.folders.indexOf(folder);
    FileSystem.folders.splice(index, 1);
  }

  /**
   * Sets a mock for the upload file request.
   *
   * @private
   */
  static _setUploadFile() {
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
