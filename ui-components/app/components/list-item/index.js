import Component from '../component.js';

/**
 * The general class for folder and file items.
 *
 * @abstract
 */
export default class ListItem extends Component {
  /**
   * Creates an instance of the ListItem with set container and item id.
   *
   * @param {Element} container - The parent element for the current item.
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
  initNestedComponents() {
    this._filename = this.rootElement.querySelector('[data-test="filename"]');
    this._loader = this.rootElement.querySelector('[data-test="loader-small"]');
    this._actionButtons = this.rootElement.querySelector('[data-test="action-buttons"]');
    this._loader.style.display = 'none';
  }

  /**
   * Provides the identifier of the current list item.
   *
   * @returns {string} - The identifier of the current item.
   */
  get id() {
    return this._itemId;
  }

  /**
   * Sets if the current item is loading or not.
   *
   * @param {boolean} value - The flag that shows whether the current list item is loading or not.
   */
  set isLoading(value) {
    if (value) {
      this._filename.style.display = 'none';
      this._actionButtons.style.visibility = 'hidden';
      this._loader.style.display = 'inline-block';
    } else {
      this._loader.style.display = 'none';
      this._filename.style.display = 'inline';
      this._actionButtons.style.visibility = 'visible';
    }
  }
}
