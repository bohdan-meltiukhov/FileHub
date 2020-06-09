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
    const toasted = new Toasted({
      position: 'top-center',
      duration: 2000,
      theme: 'alive',
    });
    toasted.error(message);
  }
}
