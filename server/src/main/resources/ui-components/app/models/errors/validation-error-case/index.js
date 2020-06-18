/**
 * The class for server-side validation error cases.
 */
export default class ValidationErrorCase {
  field;
  message;

  /**
   * Creates an instance of the validation error case with set field and message.
   *
   * @param {string} field - The field that contains the validation error.
   * @param {string} message - The message that describes the error.
   */
  constructor(field, message) {
    this.field = field;
    this.message = message;
  }
}
