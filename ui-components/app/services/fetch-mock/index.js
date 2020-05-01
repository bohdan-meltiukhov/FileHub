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
    }, {
      delay: 500,
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
}
