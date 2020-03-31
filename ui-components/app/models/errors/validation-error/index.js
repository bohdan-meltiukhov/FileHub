/**
 * The class for server-side validation errors.
 */
export default class ValidationError {
  field;
  message;

  /**
   * Creates an instance of the validation error with set field and message.
   *
   * @param {string} field - The field that contains validation errors.
   * @param {string} message - The message that describes the error.
   */
  constructor(field, message) {
    this.field = field;
    this.message = message;
  }
}
