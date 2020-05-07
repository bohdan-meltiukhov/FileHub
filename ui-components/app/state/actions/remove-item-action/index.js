import Action from '../action';
import GetFilesAction from '../get-files-action';
import FileItem from '../../../models/file-system-objects/file-item';
import FolderItem from '../../../models/file-system-objects/folder-item';
import IsDeleteItemLoadingMutator from '../../mutators/is-delete-item-loading-mutator';
import DeleteItemLoadingErrorMutator from '../../mutators/delete-item-loading-error-mutator';

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
    stateManager.mutate(new IsDeleteItemLoadingMutator(true));

    try {
      if (this._item instanceof FolderItem) {
        await apiService.deleteFolder(this._item.id);
      } else if (this._item instanceof FileItem) {
        await apiService.deleteFile(this._item.id);
      }

      stateManager.dispatch(new GetFilesAction(this._item.parentId));
    } catch (e) {
      stateManager.mutate(new DeleteItemLoadingErrorMutator(e));
    } finally {
      stateManager.mutate(new IsDeleteItemLoadingMutator(false));
    }
    // if (this._fileItem.type === 'folder') {
    //   apiService.deleteFolder(this._fileItem.id)
    //     .then(() => {
    //       stateManager.dispatch(new GetFilesAction(this._fileItem.parentId));
    //     });
    // } else if (this._fileItem.type === 'file') {
    //   apiService.deleteFile(this._fileItem.id)
    //     .then(() => {
    //       stateManager.dispatch(new GetFilesAction(this._fileItem.parentId));
    //     });
    // }
  }
}
