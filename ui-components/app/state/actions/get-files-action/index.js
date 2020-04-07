import Action from '../action';
import IsFileListLoadingMutator from '../../mutators/is-file-list-loading-mutator';
import FileListMutator from '../../mutators/file-list-mutator';
import FileListLoadingErrorMutator from '../../mutators/file-list-loading-error-mutator';

/**
 * The actions that gets files from the server.
 */
export default class GetFilesAction extends Action {
  /**
   * Creates an instance of the GetFiles Action with set API Service.
   *
   * @param {object} apiService - The API Service for this action.
   */
  constructor(apiService) {
    super();
    this.apiService = apiService;
  }

  /** @inheritdoc */
  async apply(stateManager) {
    stateManager.mutate(new IsFileListLoadingMutator(true));
    try {
      const files = await this.apiService.getFiles();
      stateManager.mutate(new FileListMutator(files));
    } catch (e) {
      stateManager.mutate(new FileListLoadingErrorMutator(e.message));
    }
  }
}
