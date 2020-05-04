import IsFolderLoadingMutator from '../../../../app/state/mutators/is-folder-loading-mutator';

const {module, test} = QUnit;

module('The IsFolderLoadingMutator');

test('should set the isLoading flag to the state correctly.', (assert) => {
  const isLoading = true;

  const mutator = new IsFolderLoadingMutator(isLoading);

  const state = {};

  mutator.apply(state);

  assert.strictEqual(state.isFolderLoading, isLoading, 'The IsFolderLoadingMutator should set the isLoading flag to ' +
    'the provided state correctly.');
});
