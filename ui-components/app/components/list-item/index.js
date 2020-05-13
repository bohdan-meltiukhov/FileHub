import Component from '../component.js';
import FileItem from '../../models/file-system-objects/file-item';
import FolderItem from '../../models/file-system-objects/folder-item';

/**
 * The general class for folder and file items.
 */
export default class ListItem extends Component {
  _removeItemHandlers = [];

  /**
   * Creates an instance of the list item component with set container and properties.
   *
   * @param {Element} container - The parent element for the list item component.
   * @param {FolderItem|FileItem} parameters - The initial list item's configurations.
   */
  constructor(container, parameters) {
    super(container);

    this._parameters = parameters;

    this.render();
  }

  /** @inheritdoc */
  markup() {
    return `
        <tr data-test="file-item">
            <td class="icon-cell" data-test="icon-cell"></td>
            <td class="filename">
                <span class="glyphicon" data-test="file-icon"></span>&nbsp;&nbsp;
                <span class="name" data-test="filename">${this._parameters.name}</span>
                <div class="loader-small" data-test="loader-small"></div>
                <input type="text" class="input" value="${this._parameters.name}" data-test="new-name-input">
            </td>
            <td class="count" data-test="cell-count"></td>
            <td class="cell-actions" data-test="cell-actions">
                <div data-test="action-buttons">
                    <span class="glyphicon glyphicon-remove-circle" data-test="remove-item-button"></span>
                </div>
            </td>
        </tr>
    `;
  }

  /** @inheritdoc */
  render() {
    const fakeElement = document.createElement('tbody');
    fakeElement.innerHTML = this.markup();

    this.rootElement = fakeElement.firstElementChild;
    const parentElement = this._container.parentElement;
    parentElement.removeChild(this._container);
    parentElement.appendChild(this.rootElement);

    this.initNestedComponents();
    this.addEventListeners();
  }

  /** @inheritdoc */
  initNestedComponents() {
    this._filename = this.rootElement.querySelector('[data-test="filename"]');
    this._input = this.rootElement.querySelector('[data-test="new-name-input"]');
    this._loader = this.rootElement.querySelector('[data-test="loader-small"]');
    this._loader.style.display = 'none';
    this._actionButtons = this.rootElement.querySelector('[data-test="action-buttons"]');
  }

  /** @inheritdoc */
  addEventListeners() {
    const input = this._input;

    let editModeCanceled = false;

    this.rootElement.addEventListener('click', (event) => {
      if (event.detail !== 1) {
        return;
      }

      if (editModeCanceled) {
        return editModeCanceled = false;
      }

      if (this.isSelected && !this.isEditing) {
        this.isEditing = true;
      }
    });

    this.rootElement.addEventListener('click', () => {
      this._onClickHandler();
    });

    input.addEventListener('change', (event) => {
      this._parameters.name = input.value;
      this._onNameChanged(this._parameters);
    });

    input.addEventListener('blur', () => {
      editModeCanceled = true;
      this.isEditing = false;
    });

    const removeItemButton = this.rootElement.querySelector('[data-test="remove-item-button"]');
    removeItemButton.addEventListener('click', () => {
      this._removeItemHandlers.forEach((handler) => {
        handler(this._parameters);
      });
    });
  }

  /**
   * Sets the function to call when the item is clicked.
   *
   * @param {Function} handler - The function to call when the item is clicked.
   */
  onClick(handler) {
    this._onClickHandler = handler;
  }

  /**
   * Provides the identifier of the current list item.
   *
   * @returns {string} - The identifier of the current item.
   */
  get id() {
    return this._parameters.id;
  }

  /**
   * Sets whether this item is selected or not.
   *
   * @param {boolean} isSelected - The flag that shows whether the item is selected or not.
   */
  set isSelected(isSelected) {
    this._isSelected = isSelected;

    const rootElement = this.rootElement;

    if (isSelected) {
      rootElement.classList.add('selected');
    } else {
      rootElement.classList.remove('selected');
    }
  }

  /**
   * Shows whether the current element is selected or not.
   *
   * @returns {boolean} The value that shows if the current list item is selected.
   */
  get isSelected() {
    return this._isSelected;
  }

  /**
   * Sets whether the current element is in editing mode or not.
   *
   * @param {boolean} isEditing - The flag that shows if the current list item is in editing mode or not.
   */
  set isEditing(isEditing) {
    this._isEditing = isEditing;

    const rootElement = this.rootElement;

    if (isEditing) {
      rootElement.classList.add('editing');
      this._focusOnInput();
    } else {
      rootElement.classList.remove('editing');
    }
  }

  /**
   * Focuses on the rename item input and moves the cursor to the end.
   *
   * @private
   */
  _focusOnInput() {
    const input = this._input;

    input.focus();
    input.selectionStart = input.selectionEnd = input.value.length;
  }

  /**
   * Shows whether the current element is being edited or not.
   *
   * @returns {boolean} The value that shows if the current list item is being edited.
   */
  get isEditing() {
    return this._isEditing;
  }

  /**
   * Sets if the current item is loading or not.
   *
   * @param {boolean} value - The flag that shows whether the current list item is loading or not.
   */
  set isLoading(value) {
    if (value) {
      this._filename.style.display = 'none';
      this._input.style.display = 'none';
      this._actionButtons.style.visibility = 'hidden';
      this._loader.style.display = 'inline-block';
    } else {
      this._loader.style.display = 'none';
      this._filename.style.display = 'inline';
      this._actionButtons.style.visibility = 'visible';
    }
  }

  /**
   * Sets the function to be called when the item name changes.
   *
   * @param {Function} handler - The function to call when the item name changes.
   */
  onNameChanged(handler) {
    this._onNameChanged = handler;
  }

  /**
   * Adds a function that should be called when the remove item button is pressed.
   *
   * @param {Function} handler - The function that will be called when the user wants to delete an item.
   */
  onRemoveItem(handler) {
    this._removeItemHandlers.push(handler);
  }
}
