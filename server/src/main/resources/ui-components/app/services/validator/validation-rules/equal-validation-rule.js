import ValidationRule from './validation-rule.js';

/**
 * The validation rule that checks that the input value is strict equal to another string.
 */
export default class EqualValidationRule extends ValidationRule {
  /**
   * Creates an instance of the equal validation rule with set equal value and message.
   *
   * @param {string} equalValue - The string that should be equal to the input value.
   * @param {string} message - The message that should be appended to the help text in case the equality requirement
   * is not fulfilled.
   */
  constructor(equalValue, message) {
    super(message);
    this._equalValue = equalValue;
  }

  /** @inheritdoc */
  apply(value) {
    if (value !== this._equalValue) {
      return this._message;
    }
    return '';
  }
}
