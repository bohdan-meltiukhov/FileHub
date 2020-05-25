import Mutator from '../mutator';

/**
 * The mutator that saves the user name.
 */
export default class UserNameMutator extends Mutator {
  /**
   * Creates an instance of the User Name mutator with set name.
   *
   * @param {string} name - The name of the current user.
   */
  constructor(name) {
    super();

    this._name = name;
  }

  /** @inheritdoc */
  apply(state) {
    state.username = this._name;
  }
};
