import Component from '../component.js';
import FileItemComponent from '../file-item-component';
import FolderItemComponent from '../folder-item-component';
import FileItem from '../../models/file-system-objects/file-item';
import FolderItem from '../../models/file-system-objects/folder-item';

/**
 * The component for displaying the file list.
 */
export default class FileList extends Component {
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

      if (this._loadingItems) {
        item.isLoadingActions = this._loadingItems.includes(item.id);
      }

      if (this._itemsWithRenameInProgress) {
        item.isLoading = this._itemsWithRenameInProgress.includes(item.id);
      }

      if (item.id === this._renameFolderId) {
        item.isSelected = true;
        item.isEditing = true;
        this._selectedItem = item;
      }

      if (item instanceof FileItemComponent) {
        item.onDownloadButtonPressed(this._onDownLoadButtonPressedHandler);
      }
    });
  }

  /**
   * Sets the loading state for the provided items and removes the loading state for the items that are not present
   * in the provided array.
   *
   * @param {string[]} itemIds - Items that are currently loading.
   */
  set loadingItems(itemIds) {
    this._fileItems.forEach((item) => {
      item.isLoadingActions = itemIds.includes(item.id);
    });

    this._loadingItems = itemIds;
  }

  /**
   * Adds a function that should be called when an item is deleted.
   *
   * @param {Function} handler - The function to call when the use wants to delete an item.
   */
  onRemoveButtonClicked(handler) {
    this._fileItems.forEach((item) => {
      item.onRemoveButtonClicked(handler);
    });

    this._onRemoveItemHandler = handler;
  }

  /**
   * Sets the provided items to renaming in progress state.
   *
   * @param {string[]} itemIds - An array of loading items' IDs.
   */
  set itemsWithRenameInProgress(itemIds) {
    this._fileItems.forEach((item) => {
      item.isLoading = itemIds.includes(item.id);
    });

    this._itemsWithRenameInProgress = itemIds;
  }

  /**
   * Adds a function to be called when any item changes its name.
   *
   * @param {Function} handler - The function to call when an item changes its name.
   */
  onItemNameChanged(handler) {
    this._fileItems.forEach((item) => {
      item.onNameChanged(handler);
    });

    this._onItemNameChangedHandler = handler;
  }

  /**
   * Sets the function to be called when the user wants to download the file.
   *
   * @param {Function} handler - The function to call when the user wants to download the file.
   */
  onDownloadButtonPressed(handler) {
    this._onDownLoadButtonPressedHandler = handler;

    this._fileItems.forEach((item) => {
      if (item instanceof FileItemComponent) {
        item.onDownloadButtonPressed(handler);
      }
    });
  }

  /**
   * Shows the new list of files.
   *
   * @param {Array<FileItem|FolderItem>} fileList - The array of files to be displayed.
   */
  set files(fileList) {
    this._files = fileList;
    this.rootElement.innerHTML = '';
    this.initNestedComponents();
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
    const createdFolder = this._fileItems.find((item) => (item.id === folderId));

    if (createdFolder) {
      createdFolder.isSelected = true;
      createdFolder.isEditing = true;
      this._selectedItem = createdFolder;
    }
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
    this._fileItems.forEach((item) => {
      if (item instanceof FolderItemComponent) {
        item.onFileUploadInitiated(handler);
      }
    });

    this._onFileUploadInitiatedHandler = handler;
  }
}
