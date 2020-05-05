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
    const updateItemMethod = (this._item instanceof FolderItem) ? apiService.updateFolder : apiService.updateFile;
    stateManager.mutate(new IsRenameItemLoadingMutator(true));
    try {
      await updateItemMethod(this._item);
      stateManager.dispatch(new GetFilesAction(this._item.parentId));
    } catch (e) {
      stateManager.mutate(new RenameItemLoadingErrorMutator(e));
    } finally {
      stateManager.mutate(new IsRenameItemLoadingMutator(false));
    }
    //   apiService.updateFolder(this._item)
    //     .then(() => {
    //       stateManager.dispatch(new GetFilesAction(this._item.parentId));
    //     });
    // } else if (this._item.type === 'file') {
    //   apiService.updateFile(this._item)
    //     .then(() => {
    //       stateManager.dispatch(new GetFilesAction(this._item.parentId));
    //     });
  }
}
