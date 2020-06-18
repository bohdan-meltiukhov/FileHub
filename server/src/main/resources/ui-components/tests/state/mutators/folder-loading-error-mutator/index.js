import FolderLoadingErrorMutator from '../../../../app/state/mutators/folder-loading-error-mutator';

const {module, test} = QUnit;

export default module('The FolderLoadingErrorMutator', () => {
  test('should set the error correctly.', (assert) => {
    const errorMessage = 'Something went wrong';

    const mutator = new FolderLoadingErrorMutator(errorMessage);

    const state = {};

    mutator.apply(state);

    assert.strictEqual(state.folderLoadingError, errorMessage, 'The FolderLoadingErrorMutator should set the error ' +
      'message to the provided state correctly.');
  });
});
