import Component from '../component.js';
import FileItemComponent from '../file-item-component';
import FolderItemComponent from '../folder-item-component';
import FileItem from '../../models/list-items/file-item';
import FolderItem from '../../models/list-items/folder-item';

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
        if (this._previousItem && this._previousItem !== item) {
          this._previousItem.isSelected = false;
        }
        item.isSelected = true;
        this._previousItem = item;
      });
    });
  }

  /**
   * Adds a function to be called when any itm changes its name.
   *
   * @param {Function} handler - The function to call when an item changes its name.
   */
  onItemNameChanged(handler) {
    this._fileItems.forEach((item) => {
      item.onNameChanged(handler);
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
    if (this._previousItem) {
      this._previousItem.isSelected = false;
    }

    const createdFolder = this._fileItems.find((item) => {
      if (item.id === folderId) {
        return true;
      }
    });

    createdFolder.isSelected = true;
    createdFolder.isEditing = true;
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
}
