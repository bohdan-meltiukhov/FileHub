import Mutator from '../mutator/index.js';
import UrlProperties from '../../../models/url-properties/index.js';

/**
 * The mutator that saves the location parameters.
 */
export default class LocationParametersMutator extends Mutator {
  /**
   * Creates an instance of the Location Parameters mutator with set parameters.
   *
   * @param {UrlProperties} parameters - The current location parameters.
   */
  constructor(parameters) {
    super();

    this._parameters = parameters;
  }

  /** @inheritdoc */
  apply(state) {
    state.locationParameters = this._parameters;
  }
}
