import fetchMock from '../../../node_modules/fetch-mock/esm/client.js';
import FileSystem from './file-system';
import FolderItem from '../../models/file-system-objects/folder-item';

const TOKEN = 'my-token';

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
    FetchMock._uploadFile();
    FetchMock._getUser();
    FetchMock._createFolder();
    FetchMock._postLogOut();
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
    fetchMock.get('express:/folder/:folderId/content', (url, opts) => {
      if (opts.headers.Authentication !== TOKEN) {
        return 401;
      }

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
    fetchMock.get('express:/folder/:folderId', (url, opts) => {
      if (opts.headers.Authentication !== TOKEN) {
        return 401;
      }

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
    fetchMock.put('express:/folder/:folderId', (url, opts) => {
      if (opts.headers.Authentication !== TOKEN) {
        return 401;
      }

      const id = url.slice(8);
      const index = FileSystem.folders.findIndex((folder) => folder.id === id);

      if (index === -1) {
        return 404;
      }

      FileSystem.folders[index] = opts.body.element;
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
    fetchMock.put('express:/file/:fileId', (url, opts) => {
      if (opts.headers.Authentication !== TOKEN) {
        return 401;
      }

      const id = url.slice(6);

      const index = FileSystem.files.findIndex((file) => file.id === id);

      if (index === -1) {
        return 404;
      }

      FileSystem.files[index] = opts.body.element;
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
    fetchMock.delete('express:/folder/:folderId', (url, opts) => {
      if (opts.headers.Authentication !== TOKEN) {
        return 401;
      }

      const id = url.slice(8);

      const folder = FileSystem.folders.find((folder) => folder.id === id);

      if (!folder) {
        return 404;
      }

      FetchMock._deleteFolderRecursively(folder);

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
  static _deleteFile() {
    fetchMock.delete('express:/file/:fileId', (url, opts) => {
      if (opts.headers.Authentication !== TOKEN) {
        return 401;
      }

      const id = url.slice(6);

      const fileIndex = FileSystem.files.findIndex((file) => file.id === id);

      if (fileIndex === -1) {
        return 404;
      }

      FileSystem.files.splice(fileIndex, 1);

      return 200;
    }, {
      delay: 500,
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

  /**
   * Sets a mock for the upload file request.
   *
   * @private
   */
  static _uploadFile() {
    fetchMock.post('express:/folder/:folderId/file', (url, opts) => {
      if (opts.headers.Authentication !== TOKEN) {
        return 401;
      }

      const id = url.slice(8, url.indexOf('/file'));
      const file = opts.body.get('file');
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
    }, {
      delay: 500,
    });
  }

  /**
   * Sets a mock for the create folder request.
   *
   * @private
   */
  static _createFolder() {
    fetchMock.post('express:/folder/:folderId/folder', (url, opts) => {
      if (opts.headers.Authentication !== TOKEN) {
        return 401;
      }

      const id = url.slice(8, url.lastIndexOf('/folder'));

      const parentFolder = FileSystem.folders.find((folder) => folder.id === id);

      if (!parentFolder) {
        return 404;
      }

      const childFolders = FileSystem.folders.filter((folder) => folder.parentId === id);

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
    }, {
      delay: 500,
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

  /**
   * Sets a mock for the get user request.
   *
   * @private
   */
  static _getUser() {
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
    }, {
      delay: 500,
    });
  }

  /**
   * Sets a mock for the logout request.
   *
   * @private
   */
  static _postLogOut() {
    fetchMock.post('/logout', 200, {delay: 2000});
  }
}
