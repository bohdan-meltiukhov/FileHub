import RenameFolderMutator from '../../../../app/state/mutators/rename-folder-mutator';

const {module, test} = QUnit;

export default module('The RenameFolderMutator', () => {
  test('should set the folderId correctly.', (assert) => {
    const folderId = '4Goz0J0Tz8xfDfsJ';

    const mutator = new RenameFolderMutator(folderId);

    const state = {};

    mutator.apply(state);

    assert.strictEqual(state.renameFolderId, folderId, 'The RenameFolderMutator should set the folderId to the ' +
      'provided state correctly.');
  });
});
