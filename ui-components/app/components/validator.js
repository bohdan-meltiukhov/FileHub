import FormInput from './form-input';

/**
 * Validates fields in form inputs.
 */
export default class Validator {
  /**
   * @typedef {object} ValidationProperties
   * @property {string} inputName - The name of the input.
   * @property {number} minLength - The minimum length of the input value.
   * @property {RegExp} regExp - The regular expression that should match the input value.
   * @property {string} regExpDescription - The description of the provided regular expression.
   * @property {string} equals - The exact string that the input value should match.
   * @property {string} equalsDescription - The description of the provided equals value.
   */

  /**
   * Checks the input value and sets the corresponding help text.
   *
   * @param {FormInput} formInput - The form input to validate.
   * @param {ValidationProperties} properties - The validation properties.
   */
  validate(formInput, properties) {
    const inputValue = formInput.inputValue;
    const errorMessages = [];
    let anyErrorFound = false;

    if (properties.minLength && inputValue.length < properties.minLength) {
      errorMessages.push(`have ${properties.minLength} or more characters`);
      anyErrorFound = true;
    }

    if (properties.regExp && !properties.regExp.test(inputValue)) {
      errorMessages.push(properties.regExpDescription);
      anyErrorFound = true;
    }

    if (properties.equals !== undefined && inputValue !== properties.equals) {
      errorMessages.push(properties.equalsDescription);
      anyErrorFound = true;
    }

    if (!anyErrorFound) {
      formInput.helpText = '';
      return;
    }

    let helpText = `The ${properties.inputName} should `;

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

    formInput.helpText = helpText;
  }
}
