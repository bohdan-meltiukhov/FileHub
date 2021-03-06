import FolderItem from '../../../app/components/folder-item-component';

const {module, test} = QUnit;

let fixture;
let row;

export default module('The FolderItemComponent', (hooks) => {
  hooks.beforeEach(function() {
    fixture = document.getElementById('qunit-fixture');
    row = document.createElement('tr');
    fixture.appendChild(row);
  });

  test('should have the provided properties.', (assert) => {
    const name = 'Documents';
    const itemsNumber = 15;

    const folder = {
      id: '1',
      parentId: 'parent',
      name,
      itemsNumber,
      type: 'folder',
    };
    new FolderItem(row, folder);

    const folderItem = fixture.firstElementChild;

    const iconCell = folderItem.querySelector('[data-test="icon-cell"]');
    assert.strictEqual(iconCell.innerHTML, '<span class="glyphicon glyphicon-menu-right"></span>', 'The folder item ' +
      'component should have an arrow in the icon cell.');

    const fileIcon = folderItem.querySelector('[data-test="file-icon"]');
    assert.strictEqual(fileIcon.className, 'glyphicon glyphicon-folder-close', 'The folder icon should have the ' +
      'glyphicon-folder-close class.');

    const fileName = folderItem.querySelector('[data-test="filename"]');
    assert.strictEqual(fileName.innerText, name, 'The folder item component should display the provided name.');

    const itemsCount = folderItem.querySelector('[data-test="cell-count"]');
    assert.strictEqual(itemsCount.innerText, `${itemsNumber} items`, 'The folder item component should display ' +
      'the provided number of items.');

    const actions = folderItem.querySelector('[data-test="action-buttons"]');
    const firstAction = actions.firstElementChild;
    assert.strictEqual(firstAction.className, 'glyphicon glyphicon-upload', 'The folder item component should show ' +
      'the upload action.');
  });
});
