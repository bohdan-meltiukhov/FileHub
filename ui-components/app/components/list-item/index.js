import Component from '../component.js';

/**
 * The general class for folder and file items.
 *
 * @abstract
 */
export default class ListItem extends Component {
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

    this.rootElement.addEventListener('click', () => this._onClickHandler());

    input.addEventListener('change', (event) => {
      this._parameters.name = input.value;
      this._onNameChanged(this._parameters);
    });

    input.addEventListener('blur', () => {
      editModeCanceled = true;
      this.isEditing = false;
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
   * Sets whether this item is selected or not.
   *
   * @param {boolean} isSelected - The flag that shows whether the item is selected or not.
   */
  set isSelected(isSelected) {
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
    return this.rootElement.classList.contains('selected');
  }

  /**
   * Sets whether the current element is in editing mode or not.
   *
   * @param {boolean} isEditing - The flag that shows if the current list item is in editing mode or not.
   */
  set isEditing(isEditing) {
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
    return this.rootElement.classList.contains('editing');
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
      this._loader.style.display = 'inline-block';
    } else {
      this._loader.style.display = 'none';
      this._filename.style.display = 'inline';
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
}
