import ValidationRule from './validation-rules/validation-rule.js';
import ValidationErrorCase from '../models/errors/validation-error-case';

/**
 * Validates that form inputs follow the provided rules.
 */
export default class Validator {
  /**
   * An array of validation errors that may occur while checking the input values.
   *
   * @type {ValidationErrorCase[]}
   * @private
   */
  _validationErrorCases = [];

  /**
   * Checks the provided value to follow the required validation rules and generates the error message in case any
   * of the rules is broken.
   *
   * @param {string} inputName - The name of the input.
   * @param {string} value - The value to check.
   * @param {ValidationRule[]} validationRules - The validation rules to check.
   */
  addField(inputName, value, validationRules) {
    const errorMessages = [];
    validationRules.forEach((rule) => {
      const errorMessage = rule.apply(value);
      if (errorMessage) {
        errorMessages.push(errorMessage);
      }
    });

    if (errorMessages.length) {
      const errorCase = new ValidationErrorCase(inputName, this._generateHelpText(inputName, errorMessages));
      this._validationErrorCases.push(errorCase);
    }
  }

  /**
   * Generates the help text message from the provided error messages.
   *
   * @param {string} inputName - The name of the corresponding form input.
   * @param {string[]} errorMessages - An array of error messages from different validation rules.
   * @returns {string} The generated help text.
   * @private
   */
  _generateHelpText(inputName, errorMessages) {
    let helpText = `The ${inputName} should `;
    for (let i = 0; i < errorMessages.length - 1; i++) {
      helpText += errorMessages[i] + ', ';
    }

    const lastMessage = errorMessages[errorMessages.length - 1];

    if (errorMessages.length >= 2) {
      helpText = helpText.slice(0, -2);
      helpText += ` and ${lastMessage}`;
    } else {
      helpText += lastMessage;
    }

    return helpText;
  }

  /**
   * Checks if any of the added fields contain errors.
   *
   * @returns {Promise} - A promise that resolves in case the values are valid and rejects with an array of
   * validation error cases if any validation issues occur.
   */
  validate() {
    return new Promise(((resolve, reject) => {
      if (!this._validationErrorCases.length) {
        resolve();
      } else {
        reject(this._validationErrorCases);
      }
    }));
  }
}
