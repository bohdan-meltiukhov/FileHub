import UserCredentials from '../../models/user-credentials';
import ValidationErrorCase from '../../models/errors/validation-error-case';
import AuthorizationError from '../../models/errors/authorization-error';
import ServerValidationError from '../../models/errors/server-validation-error';
import GeneralServerError from '../../models/errors/general-server-error';
import NotFoundError from '../../models/errors/not-found-error';
import FetchMock from '../fetch-mock';

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
    if (window.devMode) {
      FetchMock.setMock();
    }
  }

  /**
   * Sends a request to authenticate a user with the provided credentials.
   *
   * @param {UserCredentials} userCredentials - The provided username and password.
   * @returns {Promise} The promise that resolves when a response from the server is received.
   */
  logIn(userCredentials) {
    return fetch('/login', {
      method: 'POST',
      body: userCredentials,
    })
      .then(async (response) => {
        if (!response.ok) {
          throw await this._handleAuthenticationErrors(response);
        }
      });
  }

  /**
   * Sends a request to check user credentials and register a new user.
   *
   * @param {UserCredentials} userCredentials - The credentials for the new user.
   * @returns {Promise} The promise that resolves when a response from the server is received.
   */
  register(userCredentials) {
    return fetch('/register', {
      method: 'POST',
      body: userCredentials,
    })
      .then(async (response) => {
        if (!response.ok) {
          throw await this._handleAuthenticationErrors(response);
        }
      });
  }

  /**
   * Check the response status code and creates an instance of the corresponding error.
   *
   * @param {Response} response - The response from the server.
   * @returns {AuthorizationError|ServerValidationError|Error|GeneralServerError} The error to throw.
   * @private
   */
  _handleAuthenticationErrors(response) {
    switch (response.status) {
    case 401:
      return new AuthorizationError('The username or password is incorrect');
    case 422:
      return response.json().then((body) => {
        const errorCases = [];
        body.errors.forEach((error) => {
          errorCases.push(new ValidationErrorCase(error.field, error.message));
        });
        return new ServerValidationError(errorCases);
      });
    case 500:
      return new GeneralServerError('Internal server error');
    default:
      return new Error('Unknown error');
    }
  }

  /**
   * Checks the response status and creates an instance of the corresponding error for other requests.
   *
   * @param {Response} response - The response from the server.
   * @returns {AuthorizationError|NotFoundError|Error|GeneralServerError} The error to throw.
   * @private
   */
  _handleRequestErrors(response) {
    switch (response.status) {
    case 401:
      return new AuthorizationError('Not authorized.');
    case 404:
      return new NotFoundError('This item does not exist.');
    case 500:
      return new GeneralServerError('Internal server error.');
    default:
      return response.json().then((body) => {
        return new Error(body);
      });
    }
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
   * @returns {Promise} - The promise that resolves with an array of files.
   */
  getFiles(folderId) {
    return fetch(`/folder/${folderId}/content`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw this._handleRequestErrors(response);
        }
      });
  }

  /**
   * Provides the information about the folder.
   *
   * @param {string} id - The identifier of the required folder.
   * @returns {Promise} The promise that resolves with information about the required folder.
   */
  getFolder(id) {
    return fetch(`/folder/${id}`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw this._handleRequestErrors(response);
        }
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
    return fetch(`/folder/${folder.id}`, {
      method: 'PUT',
      body: {
        element: folder,
      },
    }).then((response) => {
      if (!response.ok) {
        throw this._handleRequestErrors(response.status);
      }
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
    return fetch(`/file/${file.id}`, {
      method: 'PUT',
      body: {
        element: file,
      },
    }).then((response) => {
      if (!response.ok) {
        throw this._handleRequestErrors(response.status);
      }
    });
  }
}
