import ValidationRule from './validation-rules/validation-rule.js';
import ValidationErrorCase from '../../models/errors/validation-error-case/index.js';

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
   * The object that contains the input name and the corresponding validation rules.
   *
   * @typedef FieldRecord
   * @property {string} inputName - The name of the input.
   * @property {ValidationRule[]} validationRules - The validation rules for this input.
   */

  /**
   * An array of field records to be verified.
   *
   * @type {FieldRecord[]}
   * @private
   */
  _fields = [];

  /**
   * Saves the provided field with its validation rules.
   *
   * @param {string} inputName - The name of the input.
   * @param {ValidationRule[]} validationRules - The validation rules for this field.
   */
  addField(inputName, validationRules) {
    const fieldRecord = {
      inputName,
      validationRules,
    };
    this._fields.push(fieldRecord);
  }

  /**
   * Validates the entered values according to the registered validation rules.
   *
   * @param {object.<string, string>} inputValues - The entered values.
   * @returns {Promise} - The promise that resolves in case the values are valid and rejects with an array of
   * validation error cases if some validation issues occur.
   */
  validate(inputValues) {
    this._fields.forEach((field) => {
      const inputValue = inputValues[field.inputName];
      this._checkField(field, inputValue);
    });

    return new Promise(((resolve, reject) => {
      if (!this._validationErrorCases.length) {
        resolve();
      } else {
        reject(this._validationErrorCases);
      }
    }));
  }

  /**
   * Checks whether the entered input value meets the requirement set using validation rules.
   *
   * @param {FieldRecord} field - The field with rules.
   * @param {string} inputValue - The value to check.
   * @private
   */
  _checkField(field, inputValue) {
    let errorMessage = '';
    field.validationRules.forEach((rule) => {
      const message = rule.apply(inputValue);
      if (message !== '') {
        errorMessage += message + ' ';
      }
    });
    if (errorMessage !== '') {
      this._validationErrorCases.push(new ValidationErrorCase(field.inputName, errorMessage));
    }
  }
}
