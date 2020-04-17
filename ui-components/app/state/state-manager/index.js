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
        this.dispatchEvent(new Event(`stateChanged.${prop}`));
        return true;
      },
    };

    this.state = new Proxy(initialState, setHandler);
  }

  /**
   * Adds a function that wil be called when the state changes.
   *
   * @param {Function} handler - The function that should be called when the state changes.
   * @param {string} field - The state field to listen to.
   */
  onStateChanged(handler, field) {
    this.addEventListener(`stateChanged.${field}`, () => handler(this.state));
  }

  /**
   * Dispatches the provided action.
   *
   * @param {Action} action - The action to be dispatched.
   */
  dispatch(action) {
    action.apply(this, this.apiService);
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
