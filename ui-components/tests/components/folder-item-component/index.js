import FolderItem from '../../../app/components/folder-item-component';

const {module, test} = QUnit;

let fixture;
let row;

module('The FolderItemComponent', {
  beforeEach: function() {
    fixture = document.getElementById('qunit-fixture');
    row = document.createElement('tr');
    fixture.appendChild(row);
  },
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
  assert.strictEqual(firstAction.className, 'glyphicon glyphicon-upload', 'The folder item component should show the ' +
    'upload action.');
});

test('should call the onRemove handler.', async (assert) => {
  assert.expect(3);

  const folder = {
    id: '1',
    parentId: 'parent',
    name,
    itemsNumber: 26,
    type: 'folder',
  };

  const handler = (parameters) => {
    assert.step('Folder item is removed.');
    assert.deepEqual(parameters, folder, 'The folder item should provide the correct folder to the onRemove handler.');
  };

  const folderItem = new FolderItem(row, folder);
  const folderItemElement = fixture.firstElementChild;

  folderItem.onRemoveItem(handler);

  const removeButton = folderItemElement.querySelector('[data-test="cell-actions"] .glyphicon-remove-circle');
  removeButton.click();

  await handler;
  assert.verifySteps(['Folder item is removed.'], 'The folder item should call the onRemove handler when the remove ' +
    'button is pressed.');
});
