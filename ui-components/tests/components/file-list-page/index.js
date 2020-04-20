import FileListPage from '../../../app/components/file-list-page';

const {module, test} = QUnit;

let fixture;

module('The FileListPage', {
  beforeEach: function() {
    fixture = document.getElementById('qunit-fixture');
  },
});

test('should initialize nested components.', (assert) => {
  new FileListPage(fixture);
  const page = fixture.firstElementChild;

  const userDetails = page.querySelector('[data-test="user-details"]');
  assert.ok(userDetails, 'The file list page should initialize the user details.');

  const breadcrumbs = page.querySelector('[data-test="breadcrumbs"]');
  assert.ok(breadcrumbs, 'The file list page should initialize breadcrumbs.');

  const createFolderButton = page.querySelector('[data-test="create-folder-button"]').firstElementChild;
  assert.ok(createFolderButton, 'The file list page should initialize the create folder button.');

  const uploadFileButton = page.querySelector('[data-test="upload-file-button"]').firstElementChild;
  assert.ok(uploadFileButton, 'The file list page should initialize the upload file button.');
});
