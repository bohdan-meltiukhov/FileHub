import UserCredentials from '../../models/user-credentials';

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
      resolve();
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
      resolve();
    }));
  }
}
