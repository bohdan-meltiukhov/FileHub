import FileList from '../../../app/components/file-list';

const {module, test} = QUnit;

let fixture;

const files = [
  {
    name: 'Documents',
    itemsNumber: 20,
    type: 'folder',
  },
  {
    name: 'photo.png',
    mimeType: 'image',
    size: 16,
    type: 'file',
  },
];

module('The FileList test', {
  beforeEach: function() {
    fixture = document.getElementById('qunit-fixture');
  },
});

test('should display the provided list of files.', (assert) => {
  new FileList(fixture, files);
  const fileList = fixture.firstElementChild;

  assert.timeout(2000);
  const done = assert.async();

  setTimeout(() => {
    const fileItems = fileList.querySelectorAll('[data-test="file-item"]');
    assert.strictEqual(fileItems.length, 2, 'The file list should display as many files as it received via ' +
      'constructor.');
    done();
  }, 1000);
});

test('should update the list of files.', (assert) => {
  const fileList = new FileList(fixture);
  const fileListElement = fixture.firstElementChild;

  fileList.files = files;

  const fileItems = fileListElement.querySelectorAll('[data-test="file-item"]');
  assert.strictEqual(fileItems.length, 2, 'The file list should display as many files as it received via the setter.');
});
