import Component from '../component.js';

/**
 * The component for the 404 page.
 */
export default class NotFoundPage extends Component {
  /**
   * Creates an instance of the 404 page with set container.
   *
   * @param {Element} container - The parent element for the 404 page.
   */
  constructor(container) {
    super(container);

    this.render();
  }

  /** @inheritdoc */
  markup() {
    return `
        <div>
            <h1>Error 404</h1>
            <p>Not found</p>
        </div>
    `;
  }
}
