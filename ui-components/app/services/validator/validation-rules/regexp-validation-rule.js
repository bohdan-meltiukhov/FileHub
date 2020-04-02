import ValidationRule from './validation-rule.js';

/**
 * The validation rule that assures that the provided input value matches a particular regular expression.
 */
export default class RegExpValidationRule extends ValidationRule {
  /**
   * Creates an instance of the regexp validation rule with set regexp and message.
   *
   * @param {RegExp} regexp - The regular expression that should match the input value.
   * @param {string} message - The message to be appended to the help text in case the input value doesn't match the
   * provided regular expression.
   */
  constructor(regexp, message) {
    super(message);
    this._regexp = regexp;
  }

  /** @inheritdoc */
  apply(value) {
    if (!this._regexp.test(value)) {
      return this._message;
    }
    return '';
  }
}
