import UserCredentials from '../../models/user-credentials';
import ValidationErrorCase from '../../models/errors/validation-error-case';
import AuthorizationError from '../../models/errors/authorization-error';
import ServerValidationError from '../../models/errors/server-validation-error';
import GeneralServerError from '../../models/errors/general-server-error';
import NotFoundError from '../../models/errors/not-found-error';
import FetchMock from '../fetch-mock';
import FolderItem from '../../models/file-system-objects/folder-item';
import FileItem from '../../models/file-system-objects/file-item';

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
        if (response.ok) {
          response.json()
            .then((body) => {
              localStorage.setItem('token', body.token);
            });
        } else {
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
      return response.text().then((text) => {
        return new Error(text);
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
   * Sends a request to delete a particular folder.
   *
   * @param {string} id - The identifier of the folder to be deleted.
   * @returns {Promise} The promise that resolves if the folder is deleted successfully.
   */
  deleteFolder(id) {
    return fetch(`/folder/${id}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (!response.ok) {
          throw this._handleRequestErrors(response);
        }
      });
  }

  /**
   * Sends a request to delete a particular file.
   *
   * @param {string} id - The identifier of the file to delete.
   * @returns {Promise} The promise that resolves if the file is deleted successfully.
   */
  deleteFile(id) {
    return fetch(`/file/${id}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (!response.ok) {
          throw this._handleRequestErrors(response);
        }
      });
  }

  /**
   * Updates the provided folder.
   *
   * @param {FolderItem} folder - The new folder properties.
   * @returns {Promise} The promise that resolves if the folder is updated successfully.
   */
  updateFolder(folder) {
    return fetch(`/folder/${folder.id}`, {
      method: 'PUT',
      body: {
        element: folder,
      },
    }).then(async (response) => {
      if (!response.ok) {
        throw await this._handleRequestErrors(response);
      }
    });
  }

  /**
   * Updates the provided file.
   *
   * @param {FileItem} file - The new file properties.
   * @returns {Promise} The promise that resolves if the file is updated successfully.
   */
  updateFile(file) {
    return fetch(`/file/${file.id}`, {
      method: 'PUT',
      body: {
        element: file,
      },
    }).then(async (response) => {
      if (!response.ok) {
        throw await this._handleRequestErrors(response);
      }
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
    return fetch(`/folder/${folderId}/file`, {
      method: 'POST',
      body: formData,
    })
      .then((response) => {
        if (!response.ok) {
          throw this._handleRequestErrors(response);
        }
      });
  }

  /**
   * Creates a folder.
   *
   * @param {string} id - The identifier of the parent folder.
   * @returns {Promise} The promise that resolves if the folder is created successfully.
   */
  createFolder(id) {
    return fetch(`/folder/${id}/folder`, {
      method: 'POST',
      body: {
        folder: {
          name: 'New folder',
          itemsNumber: 0,
          type: 'folder',
        },
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw this._handleRequestErrors(response);
        }
      });
  }

  /**
   * Provides the current user's name.
   *
   * @returns {Promise} A promise that resolves with the current user's data.
   */
  getUser() {
    return fetch('/user', {
      headers: {
        Authentication: localStorage.getItem('token'),
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw this._handleRequestErrors(response);
        }
      });
  }
}
