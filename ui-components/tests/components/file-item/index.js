import FileItem from '../../../app/components/file-item';

const {module, test} = QUnit;

let fixture;
let row;

module('The FileItem test', {
  beforeEach: function() {
    fixture = document.getElementById('qunit-fixture');
    row = document.createElement('tr');
    fixture.appendChild(row);
  },
});

test('should have the default properties.', (assert) => {
  new FileItem(row);
  const fileItem = fixture.firstElementChild;

  const iconCell = fileItem.querySelector('[data-test="icon-cell"]');
  assert.strictEqual(iconCell.innerHTML, '&nbsp;', 'The FileItem should have the icon cell empty by default.');

  const fileIcon = fileItem.querySelector('[data-test="file-icon"]');
  assert.strictEqual(fileIcon.className, 'glyphicon glyphicon-file', 'The file icon should have the glyphicon-file ' +
    'class by default.');

  const fileName = fileItem.querySelector('[data-test="filename"]');
  assert.strictEqual(fileName.innerHTML, 'File', 'The file item should have the default name.');

  const fileSize = fileItem.querySelector('[data-test="cell-count"]');
  assert.strictEqual(fileSize.innerText, '0.1 KB', 'The file item should have the default size.');

  const actions = fileItem.querySelector('[data-test="cell-actions"]');
  const firstAction = actions.firstElementChild;
  assert.strictEqual(firstAction.className, 'glyphicon glyphicon-download', 'The file item should show the download ' +
    'action by default.');
});

test('should have the provided properties.', (assert) => {
  const name = 'Documents';
  const itemsNumber = 20;

  const file = {
    name,
    itemsNumber,
    type: 'folder',
  };
  new FileItem(row, file);

  const fileItem = fixture.firstElementChild;

  const iconCell = fileItem.querySelector('[data-test="icon-cell"]');
  assert.strictEqual(iconCell.innerHTML, '<span class="glyphicon glyphicon-menu-right"></span>', 'The file item ' +
    'should display the arrow in the icon cell when the type is folder');

  const fileIcon = fileItem.querySelector('[data-test="file-icon"]');
  assert.strictEqual(fileIcon.className, 'glyphicon glyphicon-folder-close', 'The file icon should have the ' +
    'glyphicon-folder-close class when the type is folder.');

  const fileName = fileItem.querySelector('[data-test="filename"]');
  assert.strictEqual(fileName.innerText, name, 'The file item should display the provided name.');

  const fileSize = fileItem.querySelector('[data-test="cell-count"]');
  assert.strictEqual(fileSize.innerText, `${itemsNumber} items`, 'The file item should display the provided items ' +
    'number.');

  const actions = fileItem.querySelector('[data-test="cell-actions"]');
  const firstAction = actions.firstElementChild;
  assert.strictEqual(firstAction.className, 'glyphicon glyphicon-upload', 'The file item should show the upload ' +
    'action by default.');
});
