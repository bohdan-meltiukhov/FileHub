import FileListPage from '../../../app/components/file-list-page';
import UrlProperties from '../../../app/models/url-properties';
import MessageService from '../../../app/services/message-service';
import NotFoundError from '../../../app/models/errors/not-found-error';
import AuthorizationError from '../../../app/models/errors/authorization-error';
import GeneralServerError from '../../../app/models/errors/general-server-error';

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
    const messageService = new MessageService();

    new FileListPage(fixture, stateManagerMock, messageService, urlProperties);
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

  test('should use the message service correctly.', async (assert) => {
    assert.expect(3);

    const authorizationErrorMessage = 'Not authorized.';
    const state = {
      locationParameters: {
        folderId: '4Goz0J0Tz8xfDfsJ',
      },
      createFolderError: new AuthorizationError(authorizationErrorMessage),
    };

    /** The class for state manager mocks. */
    class StateManagerMock extends EventTarget {
      state = state;

      /** The mock for the dispatch() method. */
      dispatch() {
      }

      /**
       * The mock for the onStateChanged() method.
       *
       * @param {string} field - The state field to listen to.
       * @param {Function} handler - The function to call when the specified state field changes.
       */
      onStateChanged(field, handler) {
        this.addEventListener(`stateChanged.${field}`, handler);
      }
    }

    const urlProperties = new UrlProperties('4Goz0J0Tz8xfDfsJ');

    const messageServiceMock = {
      showError: (message) => {
        assert.strictEqual(message, `Error: ${authorizationErrorMessage}`, 'The file list page should describe the ' +
          'AuthorizationError correctly.');
      },
    };

    let stateManagerMock = new StateManagerMock();
    new FileListPage(fixture, stateManagerMock, messageServiceMock, urlProperties);
    await stateManagerMock.dispatchEvent(new CustomEvent('stateChanged.createFolderError', {detail: {state}}));


    const notFoundErrorMessage = 'This item does not exist.';
    state.createFolderError = new NotFoundError(notFoundErrorMessage);

    messageServiceMock.showError = (message) => {
      assert.strictEqual(message, `Error: ${notFoundErrorMessage}`, 'The file list page should describe the ' +
        'NotFoundError correctly.');
    };

    stateManagerMock = new StateManagerMock();
    new FileListPage(fixture, stateManagerMock, messageServiceMock, urlProperties);
    await stateManagerMock.dispatchEvent(new CustomEvent('stateChanged.createFolderError', {detail: {state}}));


    const generalServerErrorMessage = 'Internal server error.';
    state.createFolderError = new GeneralServerError(generalServerErrorMessage);

    messageServiceMock.showError = (message) => {
      assert.strictEqual(message, `Error: ${generalServerErrorMessage}`, 'The file list page should describe the ' +
        'GeneralServerError correctly.');
    };

    stateManagerMock = new StateManagerMock();
    new FileListPage(fixture, stateManagerMock, messageServiceMock, urlProperties);
    await stateManagerMock.dispatchEvent(new CustomEvent('stateChanged.createFolderError', {detail: {state}}));
  });
});
