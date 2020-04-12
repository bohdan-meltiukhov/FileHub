import Action from '../action';
import LocationMutator from '../../mutators/location-mutator';
import LocationParametersMutator from '../../mutators/location-parameters-mutator';

/**
 * The action that saves the location hash is the state.
 */
export default class HashChangedAction extends Action {
  /**
   * Creates an instance of the HashChangedAction with set static and dynamic URL parts.
   *
   * @param {string} staticPart - The static part of the URL.
   * @param {string} dynamicPart - The dynamic part of the URL.
   */
  constructor(staticPart, dynamicPart) {
    super();

    this._staticPart = staticPart;
    this._dynamicPart = dynamicPart;
  }

  /** @inheritdoc */
  apply(stateManager, apiService) {
    stateManager.mutate(new LocationMutator(this._staticPart));
    stateManager.mutate(new LocationParametersMutator(this._dynamicPart));
  }
}
