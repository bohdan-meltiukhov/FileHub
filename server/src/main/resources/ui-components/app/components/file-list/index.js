import Component from '../component.js';
import FileItemComponent from '../file-item-component/index.js';
import FolderItemComponent from '../folder-item-component/index.js';
import FileItem from '../../models/file-system-objects/file-item/index.js';
import FolderItem from '../../models/file-system-objects/folder-item/index.js';

/**
 * The component for displaying the file list.
 */
export default class FileList extends Component {
  _itemsWithDeletionInProgress = new Set();
  _foldersWithFileUploadInProgress = new Set();
  _filesWithDownloadInProgress = new Set();

  /**
   * Creates an instance of the file list with set container and file items.
   *
   * @param {Element} container - The parent element for the file item component.
   * @param {Array<FileItem|FolderItem>} files - The array of files to be displayed.
   */
  constructor(container, files = []) {
    super(container);

    this._files = files;

    this.render();
  }

  /** @inheritdoc */
  markup() {
    return `
        <table class="files" data-test="file-list-table"></table>
    `;
  }

  /** @inheritdoc */
  initNestedComponents() {
    this._fileItems = [];

    this._files.forEach((item) => {
      const row = document.createElement('tr');
      this.rootElement.appendChild(row);
      if (item instanceof FolderItem) {
        this._fileItems.push(new FolderItemComponent(row, item));
      } else if (item instanceof FileItem) {
        this._fileItems.push(new FileItemComponent(row, item));
      }
    });

    const loadingItems = new Set([
      ...this._itemsWithDeletionInProgress,
      ...this._foldersWithFileUploadInProgress,
      ...this._filesWithDownloadInProgress,
    ]);

    this._fileItems.forEach((item) => {
      item.onClick(() => {
        if (this._selectedItem && this._selectedItem !== item) {
          this._selectedItem.isSelected = false;
        }
        item.isSelected = true;
        this._selectedItem = item;
      });

      item.onNameChanged(this._onItemNameChangedHandler);

      item.onNameChanged(() => {
        this._renameFolderId = '';
      });

      item.onRemoveButtonClicked(this._onRemoveItemHandler);

      if (item instanceof FolderItemComponent) {
        item.onFileUploadInitiated(this._onFileUploadInitiatedHandler);
      }

      item.isLoadingActions = loadingItems.has(item.id);

      if (this._itemsWithRenameInProgress) {
        item.isLoading = this._itemsWithRenameInProgress.includes(item.id);
      }

      if (item.id === this._renameFolderId) {
        item.isSelected = true;
        item.isEditing = true;
        this._selectedItem = item;
        this._renameFolderId = '';
      }

      if (item instanceof FileItemComponent) {
        item.onDownloadButtonPressed(this._onDownLoadButtonPressedHandler);
      }
    });
  }

  /**
   * Sets the items that are currently being deleted.
   *
   * @param {Set} itemIds - A set of item IDs that currently have deletion in progress.
   */
  set itemsWithDeletionInProgress(itemIds) {
    this._itemsWithDeletionInProgress = itemIds;

    this.rerender();
  }

  /**
   * Sets the folders that currently have file upload in progress.
   *
   * @param {Set} folderIds - A set of folder IDs that currently have file upload in progress.
   */
  set foldersWithFileUploadInProgress(folderIds) {
    this._foldersWithFileUploadInProgress = folderIds;

    this.rerender();
  }

  /**
   * Sets the files that are currently being downloaded.
   *
   * @param {Set} fileIds - A set of file IDs that currently have downloading in progress.
   */
  set filesWithDownloadInProgress(fileIds) {
    this._filesWithDownloadInProgress = fileIds;

    this.rerender();
  }

  /**
   * Adds a function that should be called when an item is deleted.
   *
   * @param {Function} handler - The function to call when the use wants to delete an item.
   */
  onRemoveButtonClicked(handler) {
    this._onRemoveItemHandler = handler;

    this.rerender();
  }

  /**
   * Sets the provided items to renaming in progress state.
   *
   * @param {string[]} itemIds - An array of loading items' IDs.
   */
  set itemsWithRenameInProgress(itemIds) {
    this._itemsWithRenameInProgress = itemIds;

    this.rerender();
  }

  /**
   * Adds a function to be called when any item changes its name.
   *
   * @param {Function} handler - The function to call when an item changes its name.
   */
  onItemNameChanged(handler) {
    this._onItemNameChangedHandler = handler;

    this.rerender();
  }

  /**
   * Sets the function to be called when the user wants to download the file.
   *
   * @param {Function} handler - The function to call when the user wants to download the file.
   */
  onDownloadButtonPressed(handler) {
    this._onDownLoadButtonPressedHandler = handler;

    this.rerender();
  }

  /**
   * Shows the new list of files.
   *
   * @param {Array<FileItem|FolderItem>} fileList - The array of files to be displayed.
   */
  set files(fileList) {
    this._files = fileList;

    this.rerender();
  }

  /**
   * Sets the provided folder's status to editing name.
   *
   * @param {string} folderId - The identifier of the required folder.
   */
  renameFolder(folderId) {
    if (this._selectedItem) {
      this._selectedItem.isSelected = false;
      this._selectedItem.isEditing = false;
    }

    this._renameFolderId = folderId;

    this.rerender();
  }

  /**
   * Sets whether this component should be displayed or not.
   *
   * @param {boolean} display - Shows if this component should be displayed or not.
   */
  set display(display) {
    if (display) {
      this.rootElement.style.display = 'table';
    } else {
      this.rootElement.style.display = 'none';
    }
  }

  /**
   * Sets the function to be called when the user wants to upload a file to a folder.
   *
   * @param {Function} handler - The function to call when the user has picked a file from their computer and wants to
   * upload it.
   */
  onFileUploadInitiated(handler) {
    this._onFileUploadInitiatedHandler = handler;

    this.rerender();
  }
}
