import ValidationErrorCase from '../validation-error-case/index.js';

/**
 * The class that stores an array of server-side validation error cases.
 */
export default class ServerValidationError {
  errorCases = [];

  /**
   * Creates an instance of the server-side validation error with set error cases.
   *
   * @param {ValidationErrorCase[]} errorCases - All the validation error cases from the server.
   */
  constructor(errorCases) {
    this.errorCases = errorCases;
  }
}
