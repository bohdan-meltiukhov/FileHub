import StateManager from '../../state-manager';
import ApiService from '../../../services/api-service';

/**
 * The class for different actions.
 */
export default class Action {
  /**
   * Applies the provided stateManager.
   *
   * @param {StateManager} stateManager - The state manager to apply.
   * @param {ApiService} apiService - The ApiService to use.
   * @abstract
   */
  async apply(stateManager, apiService) {
  }
}
