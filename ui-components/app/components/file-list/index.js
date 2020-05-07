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
    });
  }

  /**
   * Sets whether the selected item is loading or not.
   *
   * @param {boolean} isLoading - The flag that shows if the selected item is loading or not.
   */
  set isSelectedItemLoading(isLoading) {
    if (isLoading) {
      this._loadingItem = this._selectedItem;
    }
    this._loadingItem.isLoading = isLoading;
  }

  /**
   * Adds a function that should be called when an item is deleted.
   *
   * @param {Function} handler - The function to call when the use wants to delete an item.
   */
  onRemoveItem(handler) {
    this._fileItems.forEach((item) => {
      item.onRemoveItem(handler);
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
