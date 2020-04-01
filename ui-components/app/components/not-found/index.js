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
        <div class="application-box form-dialog">
            <img src="app/images/logo.png" class="logo" alt="logo">
            
            <header class="header">
                <h1>Error 404 - Not Found</h1>
            </header>
            
            <a href="#/authentication" title="Go to the authentication page">Go to the authentication page</a>
        </div>
    `;
  }
}

