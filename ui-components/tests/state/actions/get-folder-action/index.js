import FolderMutator from '../../../../app/state/mutators/folder-mutator';
import GetFolderAction from '../../../../app/state/actions/get-folder-action';

const {module, test} = QUnit;

module('The GetFolderAction');

test('should call the mutate method of the state manager.', (assert) => {
  assert.expect(2);

  const folder = {
    id: 'uExvhDL4YwkxnBVa',
    parentId: '4Goz0J0Tz8xfDfsJ',
    name: 'Documents',
    itemsNumber: 20,
    type: 'folder',
  };

  const apiServiceMock = {
    getFolder: async () => {
      return {folder};
    },
  };

  const stateManagerMock = {
    mutate: (mutator) => {
      assert.ok(mutator instanceof FolderMutator, 'The GetFolderAction should send a FolderMutator to the state ' +
        'manager.');

      assert.deepEqual(mutator._folder, folder, 'The GetFolderAction should send the correct folder to the ' +
        'FolderMutator.');
    },
  };

  const action = new GetFolderAction();
  action.apply(stateManagerMock, apiServiceMock);
});
