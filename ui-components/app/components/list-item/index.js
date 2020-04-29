import Component from '../component.js';

/**
 * The general class for folder and file items.
 *
 * @abstract
 */
export default class ListItem extends Component {
  /**
   * Creates an instance of the List Item with set container and item ID.
   *
   * @param {Element} container - The parent element for the current list item.
   * @param {string} itemId - The identifier of the current item.
   */
  constructor(container, itemId) {
    super(container);

    this._itemId = itemId;
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
  addEventListeners() {
    this.rootElement.addEventListener('click', () => {
      const classList = this.rootElement.classList;
      if (classList.contains('selected') && !classList.contains('editing')) {
        setTimeout(() => {
          classList.add('editing');
        }, 600);
      }
    });
    this.rootElement.addEventListener('click', () => this._onClickHandler());

    const input = this.rootElement.querySelector('[data-test="new-name-input"]');
    input.addEventListener('change', (event) => {
      this._parameters.name = event.target.value;
      this._onNameChanged(this._parameters);
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
    if (isSelected) {
      this.rootElement.classList.add('selected');
    } else {
      this.rootElement.classList.remove('selected');
      this.rootElement.classList.remove('editing');
    }
  }

  /**
   * Sets whether this item's name is being editing or not.
   *
   * @param {boolean} isEditing - The flag that shows if the item's name is being edited or not.
   */
  set isEditing(isEditing) {
    if (isEditing) {
      this.rootElement.classList.add('editing');
    } else {
      this.rootElement.classList.remove('editing');
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
   * Provides the identifier of the current item.
   *
   * @returns {string} The ID of the current list item.
   */
  get id() {
    return this._itemId;
  }
}
