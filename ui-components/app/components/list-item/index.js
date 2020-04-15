import Component from '../component.js';

/**
 * The general class for folder and file items.
 *
 * @abstract
 */
export default class ListItem extends Component {
  _removeItemHandlers = [];

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
    const removeItemButton = this.rootElement
      .querySelector('[data-test="cell-actions"] .glyphicon-remove-circle');
    removeItemButton.addEventListener('click', () => {
      this._removeItemHandlers.forEach((handler) => {
        handler(this._parameters);
      });
    });

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
   * Adds a function that should be called when the remove item button is pressed.
   *
   * @param {Function} handler - The function that will be called when the user wants to delete an item.
   */
  onRemoveItem(handler) {
    this._removeItemHandlers.push(handler);
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
   * Sets the function to be called when the item name changes.
   *
   * @param {Function} handler - The function to call when the item name changes.
   */
  onNameChanged(handler) {
    this._onNameChanged = handler;
  }
}
