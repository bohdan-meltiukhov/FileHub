import Mutator from '../mutator/index.js';
import AuthorizationError from '../../../models/errors/authorization-error/index.js';
import NotFoundError from '../../../models/errors/not-found-error/index.js';
import GeneralServerError from '../../../models/errors/general-server-error/index.js';

/**
 * The mutator that sets the user name loading error.
 */
export default class UserNameLoadingErrorMutator extends Mutator {
  /**
   * Creates an instance of the UserNameLoadingErrorMutator with set error.
   *
   * @param {AuthorizationError|NotFoundError|GeneralServerError|Error} error - The error that occurred during the user
   * name loading process.
   */
  constructor(error) {
    super();

    this._error = error;
  }

  /** @inheritdoc */
  apply(state) {
    state.userNameLoadingError = this._error;
  }
}
