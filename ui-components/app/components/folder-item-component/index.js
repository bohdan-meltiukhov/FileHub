import ListItem from '../list-item';
import FolderItem from '../../models/list-items/folder-item';

/**
 * The component for displaying the folder item.
 */
export default class FolderItemComponent extends ListItem {
  /**
   * Creates an instance of the folder item component with set container and properties.
   *
   * @param {Element} container - The parent element for the folder item component.
   * @param {FolderItem} parameters - The initial folder items configurations.
   */
  constructor(container, parameters) {
    super(container);

    this._parameters = parameters;

    this.render();
  }

  /** @inheritdoc */
  markup() {
    return `
        <tr data-test="file-item">
            <td class="icon-cell" data-test="icon-cell"><span class="glyphicon glyphicon-menu-right"></span></td>
            <td class="filename">
                <span class="glyphicon glyphicon-folder-close" data-test="file-icon"></span>&nbsp;&nbsp;
                <span class="name" data-test="filename">
                    <a title="${this._parameters.name}">${this._parameters.name}</a>
                </span>
                <input type="text" class="input" value="${this._parameters.name}" data-test="new-name-input">
            </td>
            <td class="count" data-test="cell-count">${this._parameters.itemsNumber} items</td>
            <td class="cell-actions" data-test="cell-actions">
                <span class="glyphicon glyphicon-upload"></span>
                <span class="glyphicon glyphicon-remove-circle"></span>
            </td>
        </tr>
    `;
  }

  /** @inheritdoc */
  addEventListeners() {
    super.addEventListeners();

    this.rootElement.addEventListener('dblclick', () => {
      window.location.hash = `/file-list/${this._parameters.id}`;
    });
  }
}
