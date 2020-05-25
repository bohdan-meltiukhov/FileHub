import FileItemComponent from '../../../app/components/file-item-component';

const {module, test} = QUnit;

let fixture;
let row;

module('The FileItemComponent', {
  beforeEach: function() {
    fixture = document.getElementById('qunit-fixture');
    row = document.createElement('tr');
    fixture.appendChild(row);
  },
});

test('should have the provided properties.', (assert) => {
  const name = 'image.png';
  const size = 41460; // equals to 40.5 KB

  const file = {
    id: '1',
    parentId: 'parent',
    name,
    mimeType: 'image',
    size,
    type: 'file',
  };
  new FileItemComponent(row, file);

  const fileItem = fixture.firstElementChild;

  const iconCell = fileItem.querySelector('[data-test="icon-cell"]');
  assert.strictEqual(iconCell.innerHTML, '&nbsp;', 'The file item component should have &nbsp; in the icon cell.');

  const fileIcon = fileItem.querySelector('[data-test="file-icon"]');
  assert.strictEqual(fileIcon.className, 'glyphicon glyphicon-picture', 'The file icon should have the ' +
    'glyphicon-picture class when the mime type is image.');

  const fileName = fileItem.querySelector('[data-test="filename"]');
  assert.strictEqual(fileName.innerText, name, 'The file item component should display the provided name.');

  const fileSize = fileItem.querySelector('[data-test="cell-count"]');
  assert.strictEqual(fileSize.innerText, `40.5 KB`, 'The file item should display the provided size.');

  const actions = fileItem.querySelector('[data-test="action-buttons"]');
  const firstAction = actions.firstElementChild;
  assert.strictEqual(firstAction.className, 'glyphicon glyphicon-download', 'The file item component should show the ' +
    'download action.');
});

test('should calculate the file size correctly.', (assert) => {
  const zeroBytes = 0;
  const twoHundredBytes = 200;
  const megabytes = 5000000;

  const fileTemplate = {
    id: '1',
    parentId: 'parent',
    name: 'Document.pdf',
    mimeType: 'book',
    type: 'file',
  };

  new FileItemComponent(row, Object.assign(fileTemplate, {size: zeroBytes}));
  let fileItem = fixture.firstElementChild;

  let fileSize = fileItem.querySelector('[data-test="cell-count"]');
  assert.strictEqual(fileSize.innerText, '0 B', 'The file item should display 0 bytes correctly.');

  clearFixture();

  new FileItemComponent(row, Object.assign(fileTemplate, {size: twoHundredBytes}));
  fileItem = fixture.firstElementChild;

  fileSize = fileItem.querySelector('[data-test="cell-count"]');
  assert.strictEqual(fileSize.innerText, '200 B', 'The file item should display 200 bytes correctly.');

  clearFixture();

  new FileItemComponent(row, Object.assign(fileTemplate, {size: megabytes}));
  fileItem = fixture.firstElementChild;

  fileSize = fileItem.querySelector('[data-test="cell-count"]');
  assert.strictEqual(fileSize.innerText, '4.8 MB', 'The file item should display 4.8 megabytes correctly.');
});

/**
 * Clears the QUnit fixture.
 */
function clearFixture() {
  fixture.innerHTML = '';
  row = document.createElement('tr');
  fixture.appendChild(row);
}

test('should call the onDownload function.', (assert) => {
  const file = {
    id: '1csJkySJRhAbMLKG',
    parentId: 'uExvhDL4YwkxnBVa',
    name: 'photo.png',
    mimeType: 'image',
    size: 16,
    type: 'file',
  };

  const onDownloadFunction = (id, name) => {
    assert.step('The file is deleted.');
    assert.strictEqual(id, file.id, 'The FileItem component should provide correct fileId to the onDownload handler.');
    assert.strictEqual(name, file.name, 'The FileItem component should provide correct file name to the onDownload ' +
      'handler.');
  };

  const component = new FileItemComponent(row, file);
  const fileItemElement = fixture.firstElementChild;

  component.onDownloadButtonPressed(onDownloadFunction);

  const downloadButton = fileItemElement.querySelector('[data-test="cell-actions"] .glyphicon-download');
  downloadButton.click();

  assert.verifySteps(['The file is deleted.'], 'The FileItemComponent should call the onDownload handler when the ' +
    'download button is presded.');
});
