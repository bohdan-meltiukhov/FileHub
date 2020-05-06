import Action from '../action';
import GetFilesAction from '../get-files-action';
import FileItem from '../../../models/file-system-objects/file-item';
import FolderItem from '../../../models/file-system-objects/folder-item';
import IsRenameItemLoadingMutator from '../../mutators/is-rename-item-loading-mutator';
import RenameItemLoadingErrorMutator from '../../mutators/rename-item-loading-error-mutator';

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
    stateManager.mutate(new IsRenameItemLoadingMutator(true));
    try {
      if (this._item instanceof FolderItem) {
        await apiService.updateFolder(this._item);
      } else if (this._item instanceof FileItem) {
        await apiService.updateFile(this._item);
      }
      stateManager.dispatch(new GetFilesAction(this._item.parentId));
    } catch (e) {
      stateManager.mutate(new RenameItemLoadingErrorMutator(e));
    } finally {
      stateManager.mutate(new IsRenameItemLoadingMutator(false));
    }
  }
}
