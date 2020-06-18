/**
 * The class that allows changing the state.
 */
export default class Mutator {
  /**
   * Applies the saved record to the provided state.
   *
   * @param {object} state - The current state.
   * @abstract
   */
  apply(state) {
  }
}
