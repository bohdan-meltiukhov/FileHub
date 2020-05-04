/**
 * An abstract class for different markup components.
 *
 * <p>Defines methods for rendering markup, adding different event listeners and nested components initialization.
 */
export default class Component {
  /**
   * Creates an instance of a component with initialized fields.
   *
   * @param {Element} container - A parent element for the current component.
   */
  constructor(container) {
    this.init(container);
  }

  /**
   * Assigns the provided container to the corresponding class field.
   *
   * @param {Element} container - A container for the current component.
   */
  init(container) {
    this._container = container;
  }

  /**
   * Takes the markup for the current component and applies it to the parent element.
   */
  render() {
    const fakeElement = document.createElement('div');
    fakeElement.innerHTML = this.markup();

    this.rootElement = fakeElement.firstElementChild;
    this._container.appendChild(this.rootElement);

    this.initNestedComponents();
    this.addEventListeners();
  }

  /**
   * Provides an HTML representation of the current component.
   *
   * @returns {string} An HTML code that represents the current component.
   * @abstract
   */
  markup() {
  }

  /**
   * Initialises all the children components for the current component.
   */
  initNestedComponents() {
  }

  /**
   * Adds event listeners for different parts of the current component.
   */
  addEventListeners() {
  }

  /**
   * A hook that is called when the component is going to be destroyed.
   */
  willDestroy() {
  }
}
