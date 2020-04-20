import FileItem from '../../../app/components/file-item';

const {module, test} = QUnit;

let fixture;
let row;

module('The FileItem', {
  beforeEach: function() {
    fixture = document.getElementById('qunit-fixture');
    row = document.createElement('tr');
    fixture.appendChild(row);
  },
});

test('should have the provided properties.', (assert) => {
  const name = 'image.png';
  const size = 40960; // equals to 40 KB

  const file = {
    id: '1',
    parentId: 'parent',
    name,
    mimeType: 'image',
    size,
    type: 'folder',
  };
  new FileItem(row, file);

  const fileItem = fixture.firstElementChild;

  const iconCell = fileItem.querySelector('[data-test="icon-cell"]');
  assert.strictEqual(iconCell.innerHTML, '&nbsp;', 'The file item should have &nbsp; in the icon cell.');

  const fileIcon = fileItem.querySelector('[data-test="file-icon"]');
  assert.strictEqual(fileIcon.className, 'glyphicon glyphicon-picture', 'The file icon should have the ' +
    'glyphicon-picture class when the mime type is image.');

  const fileName = fileItem.querySelector('[data-test="filename"]');
  assert.strictEqual(fileName.innerText, name, 'The file item should display the provided name.');

  const fileSize = fileItem.querySelector('[data-test="cell-count"]');
  assert.strictEqual(fileSize.innerText, `40.0 KB`, 'The file item should display the provided size.');

  const actions = fileItem.querySelector('[data-test="cell-actions"]');
  const firstAction = actions.firstElementChild;
  assert.strictEqual(firstAction.className, 'glyphicon glyphicon-download', 'The file item should show the download ' +
    'action.');
});
