import Component from '../components/component.js';

/**
 * The component that has state.
 *
 * @abstract
 */
export default class StateAwareComponent extends Component {
  _stateChangedHandlers = [];

  /**
   * Creates an instance of the state-aware component with set container and state manager.
   *
   * @param {Element} container - The parent element for the current component.
   * @param {object} stateManager - The state manager to use.
   */
  constructor(container, stateManager) {
    super(container);
    this.stateManager = stateManager;
    this.initState();
  }

  /**
   * Initializes the state.
   */
  initState() {
  }

  /**
   * Adds a function that will be called when the state changes.
   *
   * @param {string} field - The state field to listen to.
   * @param {Function} handler - The function that should be called when the state changes.
   */
  onStateChanged(field, handler) {
    this.stateManager.onStateChanged(field, handler);
    this._stateChangedHandlers.push({field, handler});
  }

  /**
   * Removes state changed listeners.
   */
  removeStateChangedListeners() {
    this._stateChangedHandlers.forEach(({field, handler}) => {
      this.stateManager.removeStateChangedListener(field, handler);
    });
  }
}
