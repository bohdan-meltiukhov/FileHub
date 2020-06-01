import CreateFolderAction from '../../../../app/state/actions/create-folder-action';
import GetFilesAction from '../../../../app/state/actions/get-files-action';
import RenameFolderMutator from '../../../../app/state/mutators/rename-folder-mutator';

const {module, test} = QUnit;

module('The CreateFolderAction');

test('should create folders correctly.', async (assert) => {
  assert.expect(8);
  const folderId = '4Goz0J0Tz8xfDfsJ';
  const folder = {
    id: 'uExvhDL4YwkxnBVa',
    parentId: '4Goz0J0Tz8xfDfsJ',
    name: 'Documents',
    itemsNumber: 20,
    type: 'folder',
  };

  const createFolder = (id) => {
    return new Promise((resolve) => {
      assert.strictEqual(id, folderId, 'The CreateFolderAction should provide the correct folderId to ' +
        'the apiService.');
      resolve(folder);
    });
  };

  const apiServiceMock = {
    createFolder,
  };

  const stateManagerMock = {
    mutate: (mutator) => {
      assert.step(mutator.constructor.name);
      if (mutator instanceof RenameFolderMutator) {
        assert.strictEqual(mutator._folderId, folder.id, 'The CreateFolderAction should provide correct folder ID to ' +
          'the RenameFolderMutator.');
      }
    },

    dispatch: (action) => {
      assert.ok(action instanceof GetFilesAction, 'The CreateFolderAction should provide an instance of the ' +
        'GetFilesAction to the state manager.');
      assert.strictEqual(action._folderId, folderId, 'The CreateFolderAction should provide correct folder ID ' +
        'to the GetFilesAction');
    },

    state: {
      locationParameters: {
        folderId,
      },
    },
  };

  const action = new CreateFolderAction(folderId);
  await action.apply(stateManagerMock, apiServiceMock);

  assert.verifySteps([
    'AddCreateFolderInProgressMutator',
    'RenameFolderMutator',
    'RemoveCreateFolderInProgressMutator',
  ], 'The CreateFolderAction should provide mutators to the state manager in the correct order.');
});
