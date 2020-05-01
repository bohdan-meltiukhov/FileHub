import GetFilesAction from '../../../../app/state/actions/get-files-action';
import CreateFolderAction from '../../../../app/state/actions/create-folder-action';

const {module, test} = QUnit;

module('The CreateFolderAction');

test('should create folders correctly.', async (assert) => {
  assert.expect(4);
  const folderId = '4Goz0J0Tz8xfDfsJ';

  const createFolder = (id) => {
    return new Promise((resolve) => {
      assert.strictEqual(id, folderId, 'The CreateFolderAction should provide the correct folderId to ' +
        'the apiService.');
      resolve();
    });
  };

  const apiServiceMock = {
    createFolder,
  };

  const stateManagerMock = {
    dispatch: (action) => {
      assert.ok(action instanceof GetFilesAction, 'The CreateFolderAction should provide an instance of the ' +
        'GetFilesAction to the state manager when the folder is created.');
      assert.strictEqual(action._folderId, folderId, 'The CreateFolderAction should provide correct folderId to the ' +
        'state manager.');
    },

    onStateChanged: (field) => {
      assert.strictEqual(field, 'fileList', 'The CreateFolderAction should subscribe to changes in the fileList ' +
        'state field.');
    },
  };

  const action = new CreateFolderAction(folderId);
  action.apply(stateManagerMock, apiServiceMock);
});
