import Component from '../component.js';
import FormHeader from '../form-header';

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
        <div class="application-box form-dialog">
            <img src="app/images/logo.png" class="logo" alt="logo">
            
            <div class="form-header"></div>
            
            <p>Not found</p>
        </div>
    `;
  }

  /** @inheritdoc */
  initNestedComponents() {
    const headerContainer = this.rootElement.querySelector('.form-header');
    this.header = new FormHeader(headerContainer, {
      headerText: 'Error 404',
      withIcon: false,
    });
  }
}
