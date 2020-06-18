/**
 * The class for the provided username and password.
 */
export default class UserCredentials {
  username;
  password;

  /**
   * Creates an instance of the user credentials with set username and password.
   *
   * @param {string} username - The provided username.
   * @param {string} password - The provided password.
   */
  constructor(username, password) {
    this.username = username;
    this.password = password;
  }
}
