import FolderMutator from '../../../../app/state/mutators/folder-mutator';

const {module, test} = QUnit;

module('The FolderMutator');

test('should apply the folder.', (assert) => {
  const folder = {
    id: 'uExvhDL4YwkxnBVa',
    parentId: '4Goz0J0Tz8xfDfsJ',
    name: 'Documents',
    itemsNumber: 20,
    type: 'folder',
  };

  const mutator = new FolderMutator(folder);
  const state = {};

  mutator.apply(state);

  assert.strictEqual(state.folder, folder, 'The folder mutator should apply the folder to the provided state.');
});
