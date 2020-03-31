import UserCredentials from '../../models/user-credentials';
import ValidationError from '../../models/errors/validation-error';
import AuthorizationError from '../../models/errors/authorization-error';

/**
 * The class for sending requests and receiving responses from backend.
 */
export default class APIService {
  /**
   * Sends a request to authenticate a user with the provided credentials.
   *
   * @param {UserCredentials} userCredentials - The provided username and password.
   * @returns {Promise} The promise that resolves when a response from teh server is received..
   */
  login(userCredentials) {
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
        reject(new ValidationError('username', 'The username is already taken.'));
      } else {
        resolve();
      }
    }));
  }
}
