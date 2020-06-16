/**
 * The class for the 404 Not Found error.
 */
export default class NotFoundError {
  message;

  /**
   * Creates an instance of the Not Found Error with set error message.
   *
   * @param {string} message - The message that describes the error.
   */
  constructor(message) {
    this.message = message;
  }
}
