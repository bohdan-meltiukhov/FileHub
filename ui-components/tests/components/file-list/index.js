import FileList from '../../../app/components/file-list';
import FolderItem from '../../../app/models/list-items/folder-item';
import FileItem from '../../../app/models/list-items/file-item';

const {module, test} = QUnit;

let fixture;

const files = [
  new FolderItem({
    id: 'uExvhDL4YwkxnBVa',
    parentId: '4Goz0J0Tz8xfDfsJ',
    name: 'Documents',
    itemsNumber: 20,
    type: 'folder',
  }),
  new FileItem({
    id: 'rYol3zzsCYc561cV',
    parentId: '4Goz0J0Tz8xfDfsJ',
    name: 'Document.pdf',
    mimeType: 'book',
    size: 202,
    type: 'file',
  }),
];

module('The FileList', {
  beforeEach: function() {
    fixture = document.getElementById('qunit-fixture');
  },
});

test('should display the provided list of files.', (assert) => {
  new FileList(fixture, files);
  const fileList = fixture.firstElementChild;

  const fileItems = fileList.querySelectorAll('[data-test="file-item"]');
  assert.strictEqual(fileItems.length, 2, 'The file list should display as many files as it received via ' +
    'constructor.');
});

test('should update the list of files.', (assert) => {
  const fileList = new FileList(fixture);
  const fileListElement = fixture.firstElementChild;

  fileList.files = files;

  const fileItems = fileListElement.querySelectorAll('[data-test="file-item"]');
  assert.strictEqual(fileItems.length, 2, 'The file list should display as many files as it received via the setter.');
});
