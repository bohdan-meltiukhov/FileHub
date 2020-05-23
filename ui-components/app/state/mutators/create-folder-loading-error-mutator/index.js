import Mutator from '../mutator';
import AuthorizationError from '../../../models/errors/authorization-error';
import NotFoundError from '../../../models/errors/not-found-error';
import GeneralServerError from '../../../models/errors/general-server-error';

/**
 * The mutator that sets the error that occurred during the create folder process.
 */
export default class CreateFolderLoadingErrorMutator extends Mutator {
  /**
   * Creates an instance of the CreateFolderLoadingErrorMutator with set error.
   *
   * @param {AuthorizationError|NotFoundError|GeneralServerError|Error} error - The error that occurred during the
   * create folder process.
   */
  constructor(error) {
    super();

    this._error = error;
  }

  /** @inheritdoc */
  apply(state) {
    state.createFolderLoadingError = this._error;
  }
}
