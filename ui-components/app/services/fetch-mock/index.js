import fetchMock from '../../../node_modules/fetch-mock/esm/client.js';
import FileSystem from './file-system';
import FolderItem from '../../models/file-system-objects/folder-item';

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
    FetchMock._deleteFolder();
    FetchMock._deleteFile();
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

      const parentFolder = FileSystem.folders.find((folder) => folder.id === id);

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

      const folder = FileSystem.folders.find((folder) => folder.id === id);

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
      const index = FileSystem.folders.findIndex((folder) => folder.id === id);

      if (index === -1) {
        return 404;
      }

      FileSystem.folders[index] = options.body.element;
      return FileSystem.folders[index];
    }, {
      delay: 500,
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

      const index = FileSystem.files.findIndex((file) => file.id === id);

      if (index === -1) {
        return 404;
      }

      FileSystem.files[index] = options.body.element;
      return FileSystem.files[index];
    }, {
      delay: 500,
    });
  }

  /**
   * Sets a mock for the delete folder request.
   *
   * @private
   */
  static _deleteFolder() {
    fetchMock.delete('express:/folder/:folderId', (url) => {
      const id = url.slice(8);

      const folder = FileSystem.folders.find((folder) => folder.id === id);

      if (!folder) {
        return 404;
      }

      FetchMock._deleteFolderRecursively(folder);

      return 200;
    }, {
      delay: 2000,
    });
  }

  /**
   * Sets a mock for the delete file request.
   *
   * @private
   */
  static _deleteFile() {
    fetchMock.delete('express:/file/:fileId', (url) => {
      const id = url.slice(6);

      const fileIndex = FileSystem.files.findIndex((file) => file.id === id);

      if (fileIndex === -1) {
        return 404;
      }

      FileSystem.files.splice(fileIndex, 1);

      return 200;
    }, {
      delay: 2000,
    });
  }

  /**
   * Recursively deletes a folder and all its content.
   *
   * @param {FolderItem} folder - The folder to delete.
   * @private
   */
  static _deleteFolderRecursively(folder) {
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
