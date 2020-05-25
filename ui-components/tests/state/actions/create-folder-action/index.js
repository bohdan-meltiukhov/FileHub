import CreateFolderAction from '../../../../app/state/actions/create-folder-action';
import IsCreateFolderInProgressMutator from '../../../../app/state/mutators/is-create-folder-in-progress-mutator';
import GetFilesAction from '../../../../app/state/actions/get-files-action';

const {module, test} = QUnit;

module('The CreateFolderAction');

test('should create folders correctly.', async (assert) => {
  assert.expect(9);
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
      if (mutator instanceof IsCreateFolderInProgressMutator) {
        assert.step(`Is in progress: ${mutator._isInProgress}.`);
      }
    },

    dispatch: (action) => {
      assert.ok(action instanceof GetFilesAction, 'The CreateFolderAction should provide an instance of the ' +
        'GetFilesAction to the state manager.');
      assert.strictEqual(action._folderId, folderId, 'The CreateFolderAction should provide correct folder ID ' +
        'to the GetFilesAction');
    },
  };

  const action = new CreateFolderAction(folderId);
  await action.apply(stateManagerMock, apiServiceMock);

  assert.verifySteps([
    'IsCreateFolderInProgressMutator',
    'Is in progress: true.',
    'RenameFolderMutator',
    'IsCreateFolderInProgressMutator',
    'Is in progress: false.',
  ], 'The CreateFolderAction should provide mutators to the state manager in the correct order.');
});
