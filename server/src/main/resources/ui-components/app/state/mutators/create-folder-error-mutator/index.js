import Mutator from '../mutator/index.js';
import AuthorizationError from '../../../models/errors/authorization-error/index.js';
import NotFoundError from '../../../models/errors/not-found-error/index.js';
import GeneralServerError from '../../../models/errors/general-server-error/index.js';

/**
 * The mutator that sets the error that occurred during the create folder process.
 */
export default class CreateFolderErrorMutator extends Mutator {
  /**
   * Creates an instance of the CreateFolderErrorMutator with set error.
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
    state.createFolderError = this._error;
  }
}
