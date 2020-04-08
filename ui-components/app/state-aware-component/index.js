import Component from '../components/component.js';

/**
 * The component that has state.
 *
 * @abstract
 */
export default class StateAwareComponent extends Component {
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
   * @param {Function} handler - The function that should be called when the state changes.
   * @param {string} field - The state field to listen to.
   */
  onStateChanged(handler, field) {
    this.stateManager.onStateChanged(handler, field);
  }
}
