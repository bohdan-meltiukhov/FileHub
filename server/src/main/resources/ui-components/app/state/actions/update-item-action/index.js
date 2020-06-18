import Action from '../action/index.js';
import GetFilesAction from '../get-files-action/index.js';
import FileItem from '../../../models/file-system-objects/file-item/index.js';
import FolderItem from '../../../models/file-system-objects/folder-item/index.js';
import RenameItemLoadingErrorMutator from '../../mutators/rename-item-loading-error-mutator/index.js';
import AddRenameItemInProgressMutator from '../../mutators/add-rename-item-in-progress-mutator/index.js';
import RemoveRenameItemInProgressMutator from '../../mutators/remove-rename-item-in-progress-mutator/index.js';

/**
 * The action that updates a file or a folder.
 */
export default class UpdateItemAction extends Action {
  /**
   * Creates an instance of the update item action with set item.
   *
   * @param {FileItem|FolderItem} item - The new item.
   */
  constructor(item) {
    super();

    this._item = item;
  }

  /** @inheritdoc */
  async apply(stateManager, apiService) {
    stateManager.mutate(new AddRenameItemInProgressMutator(this._item.id));
    try {
      if (this._item instanceof FolderItem) {
        await apiService.updateFolder(this._item);
      } else if (this._item instanceof FileItem) {
        await apiService.updateFile(this._item);
      }
      if (this._item.parentId === stateManager.state.locationParameters.folderId) {
        await stateManager.dispatch(new GetFilesAction(this._item.parentId));
      }
    } catch (e) {
      stateManager.mutate(new RenameItemLoadingErrorMutator(e));
    } finally {
      stateManager.mutate(new RemoveRenameItemInProgressMutator(this._item.id));
    }
  }
}
