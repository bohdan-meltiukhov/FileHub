/**
 * The service that shows provided messages using Toasted.js.
 */
export default class MessageService {
  /**
   * Shows te provided message as an error.
   *
   * @param {string} message - The description of the error.
   * @param {Function} onComplete - The function to call when the toast hides.
   */
  showError(message, onComplete = () => {}) {
    const toasted = new Toasted({
      position: 'top-center',
      duration: 2000,
      theme: 'alive',
      onComplete,
    });
    toasted.error(message);
  }
}
