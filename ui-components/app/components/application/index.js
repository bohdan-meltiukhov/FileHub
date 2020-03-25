import Component from '../component.js';
import LoginForm from '../login-form';
import RegistrationForm from '../registration-form';
import Router from '../../../router.js';

/**
 * The main component on any page that defines routing between different pages.
 */
export default class Application extends Component {
  /**
   * Creates an instance of the application component with set container.
   *
   * @param {Element} container - A parent element for the application component.
   */
  constructor(container) {
    super(container);
  }

  /**
   * Provides an HTML markup for the application component.
   *
   * @returns {string} A <div> element that represents the application component.
   */
  markup() {
    return `
            <div class="application"></div>
        `;
  }

  /**
   * Initialises a router and defines all the possible routes.
   */
  initNestedComponents() {
    const pageMapping = {
      '/authentication': LoginForm,
      '/registration': RegistrationForm,
    };

    const router = new Router(this.rootElement, pageMapping, '/authentication');

    this.router = router;
  }
}
