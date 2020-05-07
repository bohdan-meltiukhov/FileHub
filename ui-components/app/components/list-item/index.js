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

  /**
   * Sets the function to call when the item is clicked.
   *
   * @param {Function} handler - The function to call when the item is clicked.
   */
  onClick(handler) {
    this._onClickHandler = handler;
  }
}
