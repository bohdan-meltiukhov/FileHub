/**
 * The manager that can change the state.
 */
export default class StateManager extends EventTarget {
  /**
   * Creates an instance of the state manager with set initial state.
   *
   * @param {object} initialState - The initial state for the state manager.
   */
  constructor(initialState) {
    super();
    this.state = initialState;
  }

  /**
   * Adds a function that wil be called when the state changes.
   *
   * @param {Function} handler - The function that should be called when the state changes.
   */
  onStateChanged(handler) {
    this.addEventListener('stateChange', handler);
  }

  /**
   * Dispatches the provided action.
   *
   * @param {object} action - The action to be dispatched.
   */
  dispatch(action) {
    action.apply(this);
  }

  /**
   * Applies the provided mutator.
   *
   * @param {object} mutator - The object to be applied.
   */
  mutate(mutator) {
    mutator.apply(this.state);
  }

  /**
   * Sets the state.
   *
   * @param {object} newState - The new state
   */
  setState(newState) {
    this.state = newState;
  }
}
