import Component from '../component.js';
import {FILE_LIST_ROUTE} from '../../router/routes';

/**
 * The component for displaying breadcrumbs.
 */
export default class Breadcrumbs extends Component {
  /**
   * The object for providing the Inner Breadcrumbs configuration via the constructor.
   *
   * @typedef {object} Parameters
   * @property {string} folder - The name of the current folder.
   */

  /**
   * Creates an instance of the Inner Breadcrumbs component with set container and folder.
   *
   * @param {Element} container - The parent element for the breadcrumbs component.
   * @param {Parameters} parameters - The initial component parameters.
   */
  constructor(container, {folder = 'Folder'} = {}) {
    super(container);

    this._folder = folder;
    this.render();
  }

  /** @inheritdoc */
  markup() {
    return `
        <div data-test="breadcrumbs">
            <div class="folder-icon">
                <a href="#${FILE_LIST_ROUTE}">
                    <span class="glyphicon glyphicon-level-up"></span>
                </a>
            </div>
            <span class="directory-name">/ ${this._folder}</span>
        </div>
    `;
  }
}
