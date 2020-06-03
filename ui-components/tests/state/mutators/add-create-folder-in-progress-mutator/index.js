import AddCreateFolderInProgressMutator from '../../../../app/state/mutators/add-create-folder-in-progress-mutator';

const {module, test} = QUnit;

export default module('The AddCreateFolderInProgressMutator', () => {
  test('should set the provided folder ID correctly.', (assert) => {
    const folderId = 'tRZXiSHNRlgZluGQ';
    const state = {};

    const mutator = new AddCreateFolderInProgressMutator(folderId);
    mutator.apply(state);

    assert.deepEqual(Array.from(state.foldersWithCreateFolderInProgress), [folderId], 'The ' +
      'AddCreateFolderInProgressMutator should add the folder ID to the provided state correctly.');
  });
});
