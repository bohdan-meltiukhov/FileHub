import ValidationRule from './validation-rules/validation-rule.js';

/**
 * Validates that form inputs follow the provided rules.
 */
export default class Validator {
  /**
   * Checks the provided value to follow the required validation rules and returns the error message in case any
   * of the rules is broken.
   *
   * @param {string} inputName - The name of the input.
   * @param {string} value - The value to check.
   * @param {ValidationRule[]} validationRules - The validation rules to check.
   * @returns {string} The message that should be displayed in the help text below the input.
   */
  validate(inputName, value, validationRules) {
    const errorMessages = [];
    validationRules.forEach((rule) => {
      const errorMessage = rule.apply(value);
      if (errorMessage) {
        errorMessages.push(errorMessage);
      }
    });

    if (!errorMessages.length) {
      return '';
    }

    return this._generate(inputName, errorMessages);
  }

  /**
   * Generates the help text message from the provided error messages.
   *
   * @param {string} inputName - The name of the corresponding form input.
   * @param {string[]} errorMessages - An array of error messages from different validation rules.
   * @returns {string} The generated help text.
   * @private
   */
  _generate(inputName, errorMessages) {
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
}
