import UserCredentials from '../../models/user-credentials';
import ValidationErrorCase from '../../models/errors/validation-error-case';
import AuthorizationError from '../../models/errors/authorization-error';
import ServerValidationError from '../../models/errors/server-validation-error';
import GeneralServerError from '../../models/errors/general-server-error';
import FetchMock from '../fetch-mock';

let instance;

/**
 * The class for sending requests and receiving responses from backend.
 */
export default class ApiService {
  _token = '';

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
            response.json()
              .then((body) => {
                // this._token = body.token;
                localStorage.setItem('token', body.token);
              });
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
   * @returns {Promise<object[]>} - The promise that resolves with an array of files.
   */
  getFiles() {
    return new Promise((resolve, reject) => {
      fetch('/files')
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
              reject(new GeneralServerError('Internal server error'));
              break;
            default:
              reject(new Error('Unknown error'));
            }
          }
        });
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
          switch (response.status) {
          case 401:
            throw new AuthorizationError('Access denied.');
          case 500:
            throw new GeneralServerError('Internal server error');
          default:
            throw new Error('Unknown error');
          }
        }
      });
  }
}
