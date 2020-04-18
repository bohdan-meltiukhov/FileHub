import UserCredentials from '../../models/user-credentials';
import ValidationErrorCase from '../../models/errors/validation-error-case';
import AuthorizationError from '../../models/errors/authorization-error';
import ServerValidationError from '../../models/errors/server-validation-error';
import fetchMock from '../../../node_modules/fetch-mock/esm/client.js';
import GeneralServerError from '../../models/errors/general-server-error';

let instance;

/**
 * The class for sending requests and receiving responses from backend.
 */
export default class ApiService {
  /**
   * Creates an instance of the API service with set fetch mock.
   *
   * @param {Function} fetchFunction - The fetch function to use.
   */
  constructor(fetchFunction) {
    this._fetch = fetchFunction.bind(window);

    fetchMock.post('/login', (url, options) => {
      const credentials = options.body;
      if (credentials.username === 'admin' && credentials.password === '1234') {
        return {token: 'my-token'};
      }
      return 401;
    }, {overwriteRoutes: false});

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
    }, {overwriteRoutes: false});
  }

  /**
   * Sends a request to authenticate a user with the provided credentials.
   *
   * @param {UserCredentials} userCredentials - The provided username and password.
   * @returns {Promise} The promise that resolves when a response from the server is received.
   */
  logIn(userCredentials) {
    return this._fetch('/login', {
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
   * Sends a request to check user credentials and register a new user.
   *
   * @param {UserCredentials} userCredentials - The credentials for the new user.
   * @returns {Promise} The promise that resolves when a response from the server is received.
   */
  register(userCredentials) {
    return this._fetch('/register', {
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
    console.log('response.status', response.status);
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
   * The method for getting the same instance of the ApiService class.
   *
   * @returns {ApiService} An instance of the ApiService class.
   */
  static getInstance() {
    if (!instance) {
      instance = new this(fetch);
    }
    return instance;
  }
}
