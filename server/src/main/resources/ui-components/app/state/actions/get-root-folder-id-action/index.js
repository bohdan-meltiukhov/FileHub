import Action from '../action/index.js';

/**
 * An action that gets the identifier of the root folder.
 */
export default class GetRootFolderIdAction extends Action {
  /** @inheritdoc */
  async apply(stateManager, apiService) {
    return apiService.getRootFolderId();
  }
}
