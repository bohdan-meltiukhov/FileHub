import UserCredentials from '../../models/user-credentials';
import ValidationErrorCase from '../../models/errors/validation-error-case';
import AuthorizationError from '../../models/errors/authorization-error';
import ServerValidationError from '../../models/errors/server-validation-error';
import GeneralServerError from '../../models/errors/general-server-error';
import FetchMock from '../fetch-mock';
import NotFoundError from '../../models/errors/NotFoundError';

let instance;

/**
 * The class for sending requests and receiving responses from backend.
 */
export default class ApiService {
  /**
   * Creates an instance of the API service with set fetch mock.
   *
   * @private
   */
  constructor() {
    FetchMock.setMock();
  }

  /**
   * Sends a request to authenticate a user with the provided credentials.
   *
   * @param {UserCredentials} userCredentials - The provided username and password.
   * @returns {Promise} The promise that resolves when a response from teh server is received..
   */
  logIn(userCredentials) {
    return new Promise((resolve, reject) => {
      fetch('/login', {
        method: 'POST',
        body: userCredentials,
      })
        .then((response) => {
          if (response.ok) {
            resolve();
          }

          switch (response.status) {
          case 401:
            reject(new AuthorizationError('The username or password is incorrect'));
            break;
          case 500:
            reject(new GeneralServerError('Internal server error'));
            break;
          default:
            reject(new Error('Unknown error'));
          }
        });
    });
  }

  /**
   * Sends a request to check user credentials and register a new user.
   *
   * @param {UserCredentials} userCredentials - The credentials for the new user.
   * @returns {Promise} The promise that resolves when a response from teh server is received..
   */
  register(userCredentials) {
    return new Promise((resolve, reject) => {
      fetch('/register', {
        method: 'POST',
        body: userCredentials,
      })
        .then((response) => {
          if (response.ok) {
            resolve();
          }

          switch (response.status) {
          case 422:
            response.json().then((body) => {
              const errorCases = [];
              body.errors.forEach((error) => {
                errorCases.push(new ValidationErrorCase(error.field, error.message));
              });
              reject(new ServerValidationError(errorCases));
            });
            break;
          case 500:
            reject(new GeneralServerError('Internal server error'));
            break;
          default:
            reject(new Error('Unknown error'));
          }
        });
    });
  }

  /**
   * The method for getting the same instance of the ApiService class.
   *
   * @returns {ApiService} An instance of the ApiService class.
   */
  static getInstance() {
    if (!instance) {
      instance = new this();
    }
    return instance;
  }

  /**
   * Provides the files.
   *
   * @param {string} folderId - The identifier of the required folder.
   * @returns {Promise<object[]>} - The promise that resolves with an array of files.
   */
  getFiles(folderId) {
    return new Promise((resolve, reject) => {
      fetch(`/folder/${folderId}/content`)
        .then((response) => {
          if (response.ok) {
            response.json()
              .then((responseBody) => {
                resolve(responseBody.files);
              });
          } else {
            switch (response.status) {
            case 401:
              reject(new AuthorizationError('Not authorized.'));
              break;
            case 500:
              reject(new GeneralServerError('Internal server error.'));
              break;
            default:
              reject(new Error('Unknown error'));
            }
          }
        });
    });
  }

  /**
   * The object for describing the folder configurations.
   *
   * @typedef {object} FolderItemProperties
   * @property {string} id - The identifier of the folder.
   * @property {string} parentId - The id of the parent folder.
   * @property {string} name - The name of the folder.
   * @property {number} itemsNumber - The number of items inside.
   * @property {'folder'} type - Shows that this item is a folder.
   */

  /**
   * Updates the provided folder.
   *
   * @param {FolderItemProperties} folder - The new folder properties.
   * @returns {Promise} The promise that resolves if the folder is updated successfully.
   */
  updateFolder(folder) {
    return new Promise((resolve, reject) => {
      fetch(`/folder/${folder.id}`, {
        method: 'PUT',
        body: {
          element: folder,
        },
      }).then((response) => {
        if (response.ok) {
          resolve();
        } else {
          switch (response.status) {
          case 401:
            reject(new AuthorizationError('Not authorized.'));
            break;
          case 404:
            reject(new NotFoundError('This folder does not exist.'));
            break;
          case 500:
            reject(new GeneralServerError('Internal server error.'));
            break;
          default:
            reject(new Error('Unknown error'));
          }
        }
      });
    });
  }

  /**
   * The object for describing the file configurations.
   *
   * @typedef {object} FileItemProperties
   * @property {string} id - The identifier of the file.
   * @property {string} parentId - The id of the parent folder.
   * @property {string} name - The name of the file.
   * @property {('image'|'book'|'video'|'audio'|'stylesheet'|'other')} mimeType - The type of the file.
   * @property {number} size - The size of the file in bytes.
   * @property {'file'} type - Shows that this item is a file.
   */

  /**
   * Updates the provided file.
   *
   * @param {FileItemProperties} file - The new file properties.
   * @returns {Promise} The promise that resolves if the file is updated successfully.
   */
  updateFile(file) {
    return new Promise((resolve, reject) => {
      fetch(`/file/${file.id}`, {
        method: 'PUT',
        body: {
          element: file,
        },
      }).then((response) => {
        if (response.ok) {
          resolve();
        } else {
          switch (response.status) {
          case 401:
            reject(new AuthorizationError('Not authorized.'));
            break;
          case 404:
            reject(new NotFoundError('This file does not exist.'));
            break;
          case 500:
            reject(new GeneralServerError('Internal server error.'));
            break;
          default:
            reject(new Error('Unknown error'));
          }
        }
      });
    });
  }

  /**
   * Provides the information about the folder.
   *
   * @param {string} id - The identifier of the required folder.
   * @returns {Promise<FolderItem>} The promise that resolves with information about the required folder.
   */
  getFolder(id) {
    return new Promise((resolve, reject) => {
      fetch(`/folder/${id}`)
        .then((response) => {
          if (response.ok) {
            response.json()
              .then((responseBody) => {
                resolve(responseBody.folder);
              });
          } else {
            switch (response.status) {
            case 401:
              reject(new AuthorizationError('Not authorized.'));
              break;
            case 404:
              reject(new NotFoundError('This folder does not exist.'));
              break;
            case 500:
              reject(new GeneralServerError('Internal server error.'));
              break;
            default:
              reject(new Error('Unknown error'));
            }
          }
        });
    });
  }

  /**
   * Sends a request to delete a particular folder.
   *
   * @param {string} id - The identifier of the folder to be deleted.
   * @returns {Promise} The promise that resolves if the folder is deleted successfully.
   */
  deleteFolder(id) {
    return new Promise((resolve, reject) => {
      fetch(`/folder/${id}`, {
        method: 'DELETE',
      })
        .then((response) => {
          if (response.ok) {
            resolve();
          } else {
            switch (response.status) {
            case 401:
              reject(new AuthorizationError('Not authorized.'));
              break;
            case 404:
              reject(new NotFoundError('This folder does not exist.'));
              break;
            case 500:
              reject(new GeneralServerError('Internal server error.'));
              break;
            default:
              reject(new Error('Unknown error'));
            }
          }
        });
    });
  }

  /**
   * Sends a request to delete a particular file.
   *
   * @param {string} id - The identifier of the file to delete.
   * @returns {Promise} The promise that resolves if the file is deleted successfully.
   */
  deleteFile(id) {
    return new Promise((resolve, reject) => {
      fetch(`/file/${id}`, {
        method: 'DELETE',
      })
        .then((response) => {
          if (response.ok) {
            resolve();
          } else {
            switch (response.status) {
            case 401:
              reject(new AuthorizationError('Not authorized.'));
              break;
            case 404:
              reject(new NotFoundError('This file does not exist.'));
              break;
            case 500:
              reject(new GeneralServerError('Internal server error.'));
              break;
            default:
              reject(new Error('Unknown error'));
            }
          }
        });
    });
  }

  /**
   * Uploads the provided file.
   *
   * @param {string} folderId - The identifier of the folder to upload the file to.
   * @param {FormData} formData - The form data with the file to upload.
   * @returns {Promise} The promise that resolves if the file is uploaded successfully.
   */
  uploadFile(folderId, formData) {
    return new Promise((resolve, reject) => {
      fetch(`/folder/${folderId}/file`, {
        method: 'POST',
        body: formData,
      })
        .then((response) => {
          if (response.ok) {
            resolve();
          } else {
            switch (response.status) {
            case 401:
              reject(new AuthorizationError('Not authorized.'));
              break;
            case 404:
              reject(new NotFoundError('This folder does not exist.'));
              break;
            case 500:
              reject(new GeneralServerError('Internal server error.'));
              break;
            default:
              reject(new Error('Unknown error'));
            }
          }
        });
    });
  }
}
