import FolderMutator from '../../../../app/state/mutators/folder-mutator';
import GetFolderAction from '../../../../app/state/actions/get-folder-action';
import IsFolderLoadingMutator from '../../../../app/state/mutators/is-folder-loading-mutator';

const {module, test} = QUnit;

module('The GetFolderAction');

test('should call the mutate method of the state manager.', async (assert) => {
  assert.expect(8);

  const folder = {
    id: 'uExvhDL4YwkxnBVa',
    parentId: '4Goz0J0Tz8xfDfsJ',
    name: 'Documents',
    itemsNumber: 20,
    type: 'folder',
  };

  const getFolder = async (folderId) => {
    assert.strictEqual(folderId, folder.id, 'The GetFolderAction should provide correct folderId to the apiService.');
    return {folder};
  };

  const apiServiceMock = {
    getFolder,
  };

  const stateManagerMock = {
    mutate: (mutator) => {
      assert.step(mutator.constructor.name);
      if (mutator instanceof IsFolderLoadingMutator) {
        assert.step('IsFolderLoadingMutator: ' + mutator._isLoading);
      } else if (mutator instanceof FolderMutator) {
        console.log('mutator', mutator);
        assert.deepEqual(mutator._folder, folder, 'The GetFolderAction should provide correct folder to the state ' +
          'manager.');
      }
    },
  };

  const action = new GetFolderAction(folder.id);
  action.apply(stateManagerMock, apiServiceMock);

  await getFolder;
  assert.verifySteps([
    'IsFolderLoadingMutator',
    'IsFolderLoadingMutator: true',
    'FolderMutator',
    'IsFolderLoadingMutator',
    'IsFolderLoadingMutator: false',
  ], 'The GetFolderAction should provide mutators to the state manager in the correct order.');
});
