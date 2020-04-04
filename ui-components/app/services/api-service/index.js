import UserCredentials from '../../models/user-credentials';
import ValidationErrorCase from '../../models/errors/validation-error-case';
import AuthorizationError from '../../models/errors/authorization-error';
import ServerValidationError from '../../models/errors/server-validation-error';
import fetchMock from '../../../node_modules/fetch-mock/esm/client.js';
import GeneralServerError from '../../models/errors/general-server-error';

/**
 * The class for sending requests and receiving responses from backend.
 */
export default class ApiService {
  static _instance;

  /**
   * Creates an instance of the API service with set fetch mock.
   *
   * @private
   */
  constructor() {
    fetchMock.post('/login', (url, options) => {
      const credentials = options.body;
      if (credentials.username === 'admin' && credentials.password === '1234') {
        return {token: 'my-token'};
      }
      return 401;
    });

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
    if (!this._instance) {
      this._instance = new this();
    }
    return this._instance;
  }
}
