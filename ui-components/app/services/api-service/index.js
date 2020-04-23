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
      .then((response) => {
        if (response.ok) {
          response.json()
            .then((body) => {
              localStorage.setItem('token', body.token);
            });
        } else {
          throw this._handleAuthenticationErrors(response);
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
      .then((response) => {
        if (!response.ok) {
          throw this._handleAuthenticationErrors(response);
        }
      });
  }

  /**
   * Check the response status code and creates an instance of the corresponding error.
   *
   * @param {Response} response - The response from the server.
   * @returns {Error} The error to throw.
   * @private
   */
  _handleAuthenticationErrors(response) {
    let error;

    switch (response.status) {
    case 401:
      error = new AuthorizationError('The username or password is incorrect');
      break;
    case 422:
      response.json().then((body) => {
        const errorCases = [];
        body.errors.forEach((error) => {
          errorCases.push(new ValidationErrorCase(error.field, error.message));
        });
        error = new ServerValidationError(errorCases);
      });
      break;
    case 500:
      error = new GeneralServerError('Internal server error');
      break;
    default:
      error = new Error('Unknown error');
    }
    return error;
  }

  /**
   * Checks the response status and creates an instance of the corresponding error for other requests.
   *
   * @param {number} status - The status code of the response.
   * @returns {AuthorizationError|NotFoundError|Error|GeneralServerError} The error to throw.
   * @private
   */
  _handleRequestErrors(status) {
    switch (status) {
    case 401:
      return new AuthorizationError('Not authorized.');
    case 404:
      return new NotFoundError('This item does not exist.');
    case 500:
      return new GeneralServerError('Internal server error.');
    default:
      return new Error('Unknown error');
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
          throw this._handleRequestErrors(response.status);
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
          throw this._handleRequestErrors(response.status);
        }
      });
  }

  /**
   * Sends a request to log the current user out.
   */
  logOut() {
    fetch('/logout', {
      method: 'POST',
    })
      .then((response) => {
        if (response.ok) {
          localStorage.removeItem('token');
        } else {
          if (response.status === 500) {
            throw new GeneralServerError('Internal server error');
          } else {
            throw new Error('Unknown error');
          }
        }
      });
  }
}
