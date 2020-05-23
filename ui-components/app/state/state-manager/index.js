import ApiService from '../../services/api-service';
import Action from '../actions/action';
import Mutator from '../mutators/mutator';

/**
 * The manager that can change the state.
 */
export default class StateManager extends EventTarget {
  /**
   * Creates an instance of the state manager with set initial state.
   *
   * @param {object} initialState - The initial state for the state manager.
   * @param {ApiService} apiService - The ApiService to use.
   */
  constructor(initialState, apiService) {
    super();
    this.apiService = apiService;

    const setHandler = {
      set: (obj, prop, value) => {
        obj[prop] = value;
        this.dispatchEvent(new CustomEvent(`stateChanged.${prop}`, {
          detail: {
            state: this.state,
          },
        }));
        return true;
      },
    };

    this.state = new Proxy(initialState, setHandler);
  }

  /**
   * Adds a function that wil be called when the state changes.
   *
   * @param {string} field - The state field to listen to.
   * @param {Function} handler - The function that should be called when the state changes.
   */
  onStateChanged(field, handler) {
    this.addEventListener(`stateChanged.${field}`, handler);
  }

  /**
   * Removes a state changed listener.
   *
   * @param {string} field - The field of the state.
   * @param {Function} handler - The handler to remove.
   */
  removeStateChangedListener(field, handler) {
    this.removeEventListener(`stateChanged.${field}`, handler, false);
  }

  /**
   * Dispatches the provided action.
   *
   * @param {Action} action - The action to be dispatched.
   */
  async dispatch(action) {
    await action.apply(this, this.apiService);
  }

  /**
   * Applies the provided mutator.
   *
   * @param {Mutator} mutator - The object to be applied.
   */
  mutate(mutator) {
    mutator.apply(this.state);
  }

  /**
   * Sets the state.
   *
   * @param {object} newState - The new state.
   */
  setState(newState) {
    this.state = newState;
  }
}
