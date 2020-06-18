import ValidationRule from './validation-rule.js';

/**
 * The validation rule that checks that the input value has the required minimum length.
 */
export default class MinLengthValidationRule extends ValidationRule {
  /**
   * Creates an instance of the minimum length validation rule with set length and message.
   *
   * @param {number} length - The minimum length of the input value.
   * @param {string} message - The message to be appended to the help text in case the input value is too short.
   */
  constructor(length, message) {
    super(message);
    this._length = length;
  }

  /** @inheritdoc */
  apply(value) {
    if (value.length < this._length) {
      return this._message;
    }
    return '';
  }
}
