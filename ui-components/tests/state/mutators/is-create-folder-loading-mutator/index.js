import IsCreateFolderLoadingMutator from '../../../../app/state/mutators/is-create-folder-loading-mutator';

const {module, test} = QUnit;

module('The IsCreateFolderLoadingMutator');

test('should set the isLoading flag correctly.', (assert) => {
  const isLoading = true;
  const state = {};

  const mutator = new IsCreateFolderLoadingMutator(isLoading);
  mutator.apply(state);

  assert.strictEqual(state.isCreateFolderLoading, isLoading, 'The IsCreateFolderLoadingMutator should set the ' +
    'isLoading flag to the provided state correctly.');
});
