import FileListPage from '../../../app/components/file-list-page';
import UrlProperties from '../../../app/models/url-properties';

const {module, test} = QUnit;

let fixture;

export default module('The FileListPage', (hooks) => {
  hooks.beforeEach(function() {
    fixture = document.getElementById('qunit-fixture');
  });

  test('should initialize nested components.', (assert) => {
    const stateManagerMock = {
      dispatch: (action) => {
      },
      onStateChanged: () => {
      },
    };
    const urlProperties = new UrlProperties('4Goz0J0Tz8xfDfsJ');

    new FileListPage(fixture, stateManagerMock, urlProperties);
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
});
