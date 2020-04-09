import Component from '../component.js';

/**
 * The component for displaying breadcrumbs.
 */
export default class RootBreadcrumbs extends Component {
  /**
   * The object for providing the Root Breadcrumbs configuration via the constructor.
   *
   * @typedef {object} Parameters
   * @property {string} folder - The name of the current folder.
   */

  /**
   * Creates an instance of the Root Breadcrumbs component with set container and folder.
   *
   * @param {Element} container - The parent element for the breadcrumbs component.
   * @param {Parameters} parameters - The initial component parameters.
   */
  constructor(container, {folder = 'Root'} = {}) {
    super(container);

    this._folder = folder;
    this.render();
  }

  /** @inheritdoc */
  markup() {
    return `
        <div data-test="breadcrumbs">
            <div class="folder-icon">
                <span class="glyphicon glyphicon-folder-open"></span>
            </div>
            <span class="directory-name">/ ${this._folder}</span>
        </div>
    `;
  }
}
