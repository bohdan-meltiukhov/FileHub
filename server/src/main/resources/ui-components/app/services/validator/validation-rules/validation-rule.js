/**
 * Checks if the input value meets a particular requirement.
 */
export default class ValidationRule {
  /**
   * Creates an instance of a validation rule with set message.
   *
   * @param {string} message - The message the be appended to the help text in case the input value doesn't meet
   * the corresponding requirement.
   */
  constructor(message) {
    this._message = message;
  }

  /**
   * Checks the input value and provides the error message in case the value doesn't meet the requirement.
   *
   * @param {string} value - The input value to check.
   * @returns {string} The message to be appended to the help text.
   * @abstract
   */
  apply(value) {
  }
}
