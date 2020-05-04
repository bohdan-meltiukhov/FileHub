import Mutator from '../mutator';

/**
 * The mutator that saves the URL location.
 */
export default class LocationMutator extends Mutator {
  /**
   * Creates an instance of the LocationMutator with set location.
   *
   * @param {string} location - The current URL location.
   */
  constructor(location) {
    super();

    this._location = location;
  }

  /** @inheritdoc */
  apply(state) {
    state.location = this._location;
  }
}
