import Toasted from '../../../node_modules/toastedjs/src';

/**
 * The service that shows provided messages using Toasted.js.
 */
export default class MessageService {
  /**
   * Shows te provided message as an error.
   *
   * @param {string} message - The description of the error.
   */
  showError(message) {
    const toasted = new Toasted();
    toasted.error(message);
  }
}
