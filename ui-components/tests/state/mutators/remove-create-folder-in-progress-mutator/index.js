import RemoveCreateFolderInProgressMutator
  from '../../../../app/state/mutators/remove-create-folder-in-progress-mutator';

const {module, test} = QUnit;

module('The RemoveCreateFolderInProgressMutator');

test('should remove the provided folder ID correctly.', (assert) => {
  const folderId = 'tRZXiSHNRlgZluGQ';
  const state = {
    foldersWithCreateFolderInProgress: new Set([folderId]),
  };

  const mutator = new RemoveCreateFolderInProgressMutator(folderId);
  mutator.apply(state);

  assert.deepEqual(Array.from(state.foldersWithCreateFolderInProgress), [], 'The RemoveCreateFolderInProgressMutator ' +
    'should remove the folder ID from the provided state correctly.');
});
