import UserCredentials from '../../models/user-credentials';
import ValidationErrorCase from '../../models/errors/validation-error-case';
import AuthorizationError from '../../models/errors/authorization-error';
import ServerValidationError from '../../models/errors/server-validation-error';

/**
 * The class for sending requests and receiving responses from backend.
 */
export default class ApiService {
  /**
   * Sends a request to authenticate a user with the provided credentials.
   *
   * @param {UserCredentials} userCredentials - The provided username and password.
   * @returns {Promise} The promise that resolves when a response from teh server is received..
   */
  logIn(userCredentials) {
    return new Promise(((resolve, reject) => {
      if (userCredentials.username === 'admin' && userCredentials.password === '1234') {
        resolve();
      } else {
        reject(new AuthorizationError('The username or password is incorrect'));
      }
    }));
  }

  /**
   * Sends a request to check user credentials and register a new user.
   *
   * @param {UserCredentials} userCredentials - The credentials for the new user.
   * @returns {Promise} The promise that resolves when a response from teh server is received..
   */
  register(userCredentials) {
    return new Promise(((resolve, reject) => {
      if (userCredentials.username === 'admin') {
        const errorCase = new ValidationErrorCase('username', 'The username is already taken.');
        reject(new ServerValidationError([errorCase]));
      } else {
        resolve();
      }
    }));
  }

  /**
   * Provides the files.
   *
   * @returns {Promise<object[]>} - The promise that resolves with an array of files.
   */
  getFiles() {
    return new Promise((resolve, reject) => {
      resolve([
        {
          name: 'Documents',
          itemsNumber: 20,
          type: 'folder',
        },
        {
          name: 'photo.png',
          mimeType: 'image',
          size: 1000000000,
          type: 'file',
        },
      ]);
    });
  }
}
