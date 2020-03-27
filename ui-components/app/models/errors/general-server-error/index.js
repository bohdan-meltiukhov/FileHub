/**
 * The class for general server-side errors.
 */
export default class GeneralServerError {
  message;

  /**
   * Creates an instance of the general server error with set error message.
   *
   * @param {string} message - The message that describes the error.
   */
  constructor(message) {
    this.message = message;
  }
}
