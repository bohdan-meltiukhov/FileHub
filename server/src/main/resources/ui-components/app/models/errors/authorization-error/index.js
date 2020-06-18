/**
 * The class for authorization errors.
 */
export default class AuthorizationError {
  message;

  /**
   * Creates an instance of the authorization error with set message.
   *
   * @param {string} message - The message that describes the error.
   */
  constructor(message) {
    this.message = message;
  }
}
