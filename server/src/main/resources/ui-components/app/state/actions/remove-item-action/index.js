import Action from '../action/index.js';
import GetFilesAction from '../get-files-action/index.js';
import FileItem from '../../../models/file-system-objects/file-item/index.js';
import FolderItem from '../../../models/file-system-objects/folder-item/index.js';
import DeleteItemLoadingErrorMutator from '../../mutators/delete-item-loading-error-mutator/index.js';
import AddItemDeletionInProgressMutator from '../../mutators/add-item-deletion-in-progress-mutator/index.js';
import RemoveItemDeletionInProgressMutator from '../../mutators/remove-item-deletion-in-progress-mutator/index.js';

/**
 * The action that removes a file or a folder.
 */
export default class RemoveItemAction extends Action {
  /**
   * Creates an instance of the remove item action with set identifier.
   *
   * @param {FileItem|FolderItem} fileItem - The item to remove.
   */
  constructor(fileItem) {
    super();

    this._item = fileItem;
  }

  /** @inheritdoc */
  async apply(stateManager, apiService) {
    stateManager.mutate(new AddItemDeletionInProgressMutator(this._item.id));

    try {
      if (this._item instanceof FolderItem) {
        await apiService.deleteFolder(this._item.id);
      } else if (this._item instanceof FileItem) {
        await apiService.deleteFile(this._item.id);
      }

      if (this._item.parentId === stateManager.state.locationParameters.folderId) {
        await stateManager.dispatch(new GetFilesAction(this._item.parentId));
      }
    } catch (e) {
      stateManager.mutate(new DeleteItemLoadingErrorMutator(e));
    } finally {
      stateManager.mutate(new RemoveItemDeletionInProgressMutator(this._item.id));
    }
  }
}
