import Mutator from '../mutator';
import AuthorizationError from '../../../models/errors/authorization-error';
import NotFoundError from '../../../models/errors/not-found-error';
import GeneralServerError from '../../../models/errors/general-server-error';

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
